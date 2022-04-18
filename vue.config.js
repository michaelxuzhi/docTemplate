const { defineConfig } = require("@vue/cli-service");
let path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
        "@static": resolve("public/static"),
        "@components": resolve("src/components"),
        "@router": resolve("src/router"),
        "@views": resolve("src/views"),
        "@utils": resolve("src/utils"),
      },
    },
  },
  /* 开启代理服务器 */
  // devServer: {
  //   proxy: {
  //     "/socket": {
  //       target: "http://localhost:3000",
  //       pathRewrite: {
  //         "^/socket": "",
  //       },
  //       ws: true,
  //       changeOrigin: true,
  //     },
  //   },
  // },
});
