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
        "@": resolve(__dirname, "src"),
        "@components": resolve(__dirname, "./src/components"),
        "@router": resolve(__dirname, "./src/router"),
        "@views": resolve(__dirname, "./src/views"),
      },
    },
  },
});
