<script setup lang="ts">
import { LockClosedOutline } from "@vicons/ionicons5";
import { NAvatar, NBadge, NCard, NIcon, NThing } from "naive-ui";
import { computed } from "vue";
import context from "../common/context";
import Crypto from "../common/crypto";
import { LinkItem } from "../common/typed";

const props = defineProps<{
  data: LinkItem;
}>();

const url = computed(() => {
  let _url = props.data.url;
  if (props.data.encrypt) {
    if (!isLogin.value) {
      return "";
    }
    _url = new Crypto({ key: context.key! }).decrypt(_url);
  }
  return _url;
});

const iconSrc = computed(() => {
  const _url = new URL(url.value);
  return `${_url.protocol}//${_url.hostname}/favicon.ico`;
});

const isLogin = computed(() => {
  return Boolean(context.key);
});

const show = computed(() => {
  return !props.data.encrypt || isLogin.value;
});
</script>

<template>
  <n-badge :show="data.encrypt" v-if="show">
    <template #value>
      <n-icon v-if="data.encrypt" :component="LockClosedOutline" />
    </template>
    <a :href="url" target="_blank">
      <n-card style="width: 300px; height: 100px">
        <n-thing>
          <template #avatar>
            <n-avatar
              round
              lazy
              :src="iconSrc"
              fallback-src="/logo.png"
            ></n-avatar>
          </template>
          <template #header>
            {{ data.title }}
          </template>
          <template #description v-if="data.description">
            {{ data.description }}
          </template>
        </n-thing>
      </n-card>
    </a>
  </n-badge>
</template>
