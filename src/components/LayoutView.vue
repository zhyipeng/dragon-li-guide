<script setup lang="ts">
import { Search } from "@vicons/ionicons5";
import {
  MenuOption,
  NButton,
  NCard,
  NFlex,
  NIcon,
  NInput,
  NLayout,
  NLayoutContent,
  NLayoutSider,
  NMenu,
  NModal,
  useDialog,
  useMessage,
} from "naive-ui";
import { Component, computed, h, onMounted, reactive, ref } from "vue";
import context from "../common/context";
import Crypto from "../common/crypto";
import { GuideData } from "../common/typed";
import data from "../data.json";
import LinkItem from "./LinkItem.vue";

const icons: Record<string, Component> = {
  Search,
};

const selected = ref("");

const links: GuideData = data.links;

const items = computed(() => {
  return links.find((item) => item.name === selected.value)?.items || [];
});

function renderIcon(icon: Component) {
  if (!icon) return undefined;
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions = computed(() => {
  const opts: MenuOption[] = [];
  for (const cate of links) {
    let has = false;
    if (isLogin.value) {
      has = cate.items.length > 0;
    } else {
      has = cate.items.find((v) => !v.encrypt) !== undefined;
    }

    if (has) {
      opts.push({
        label: cate.name,
        key: cate.name,
        icon: cate.icon ? renderIcon(icons[cate.icon]) : undefined,
      });
    }
  }
  return opts;
});

const pwdInputCtx = reactive({
  show: false,
  pwd: "",
});

const message = useMessage();
const dialog = useDialog();

const login = () => {
  try {
    const c = new Crypto({
      pwd: pwdInputCtx.pwd,
    });
    pwdInputCtx.show = false;
    context.key = c.key;
    localStorage.setItem("key", c.key);
  } catch (e) {
    message.error(String(e));
  }
};

const isLogin = computed(() => {
  return Boolean(context.key);
});

const callLogin = async () => {
  if (isLogin.value) {
    dialog.info({
      title: "提示",
      content: "是否登出?",
      onPositiveClick: () => {
        context.key = "";
        localStorage.removeItem("key");
      },
      positiveText: "确定",
      negativeText: "取消",
    });
    return;
  }
  pwdInputCtx.pwd = "";
  pwdInputCtx.show = true;
};

onMounted(() => {
  selected.value = links[0].name;
});
</script>

<template>
  <n-layout has-sider class="h-screen">
    <n-layout-sider>
      <img
        src="/logo.png"
        alt=""
        class="w-[80px] bg-[#63e2b7] rounded-full mx-auto my-5"
        :style="{
          opacity: isLogin ? 1 : 0.5,
          cursor: isLogin ? undefined : 'pointer',
        }"
        @click="callLogin"
      />
      <n-menu :options="menuOptions" v-model:value="selected"></n-menu>
    </n-layout-sider>
    <n-layout-content>
      <n-flex class="p-10" wrap>
        <link-item
          v-for="item in items"
          :key="item.url"
          :data="item"
        ></link-item>
      </n-flex>
    </n-layout-content>
  </n-layout>
  <n-modal v-model:show="pwdInputCtx.show">
    <n-card style="width: 30%" title="登录">
      <n-input
        v-model:value="pwdInputCtx.pwd"
        placeholder=""
        type="password"
        @keyup.enter="login"
      ></n-input>
      <template #footer>
        <n-flex justify="end">
          <n-button @click="pwdInputCtx.show = false">取消</n-button>
          <n-button type="primary" @click="login">登录</n-button>
        </n-flex>
      </template>
    </n-card>
  </n-modal>
</template>
