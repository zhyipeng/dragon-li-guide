# Dragon-Li 导航

这是一个静态的自托管的导航页项目. 支持通过指定的密码加密和隐藏链接, 并在运行时输入密码来获得伪 "登录态", 从而显示并解密链接.

比普通的静态导航页多了一些隐私和安全性, 比带后台的导航页省了服务器成本.


## 如何使用

1. fork 仓库并克隆到本地
```bash
git clone https://github.com/zhyipeng/dragon-li-guide.git
pnpm i
```

2. 设置你自己的导航数据

```bash
cp example.data.json data.json
```


3. 设置密码
```bash
echo "PASSWORD=yourpassword" > .env
```

4. 本地预览
```bash
# 生成加密数据
pnpm run gen
# 启动本地服务器
pnpm run dev
```

5. 打包并部署
```bash
pnpm run build
```

---

> 只要持有密码, 可随时从加密数据中恢复数据
> ```bash
> pnpm run decrypt && cat data_recover.json
> ```