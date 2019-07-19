const path = require("path");
// const vuxLoader = require("vux-loader");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: false,
  // BASE_URL: "http://hztxfw.gdyuhui.net/wx-course",
  // baseUrl: "./", // 弃用
  publicPath: "./",
  devServer: {
    port: 80,
    // assetsPublicPath: "/txfwapp/",
    /***
     *   host 改成这样有两种方式查看页面，
     *    本地访问: http://localhost，
     *    局域网访问自己IP地址,列如: http://192.168.11.188
     *  */
    host: "0.0.0.0",
    // host: "hztxfw.gdyuhui.net", // 域名访问需要百度一下，再改系统文件
    proxy: {
      "/transApp": {
        target: "http://192.168.1.75:8099/transApp",
        // target: "http://192.168.1.141:8090/microModule",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/transApp": "/"
        }
      },
      "/wx-course": {
        target: "http://hztmhpro.gdyuhui.net/wx-course", // 生产地址
        // target: "http://192.168.1.141:8090/microModule",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/wx-course": "/"
        }
      }
    },
    disableHostCheck: true
  },

  //允许对内部的 webpack 配置进行更细粒度的修改。
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true);
    //命名
    config.resolve.alias.set("@", resolve("src"));
    //打包文件带hash
    config.output.filename("[name].[hash].js").end();
    //为了补删除换行而加的配置
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        // modify the options...
        options.compilerOptions.preserveWhitespace = true;
        return options;
      });
    // vuxLoader.merge(config, {
    //   // options: {},
    //   plugins: ["vux-ui"]
    // });
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  },
  configureWebpack: config => {
    require("vux-loader").merge(config, {
      options: {},
      plugins: ["vux-ui"]
    });
    return {
      externals: {
        BMap: "BMap"
      }
    };
  },
  css: {
    loaderOptions: {
      css: {},
      // postcss: {
      //   plugins: [
      //     require("postcss-px2rem")({
      //       remUnit: 37.5
      //     })
      //   ]
      //   /***
      //    * 之所以设为37.5，是为了引用像mint-ui这样的第三方UI框架，
      //    * 因为第三方框架没有兼容px2rem ，将remUnit的值设置为设计图宽度（这里为750px）75的一半，即可以1:1还原mint-ui的组件，
      //    * 否则会样式会有变化，例如按钮会变小。
      //    * */
      // },
      postcss: {
        plugins: [
          require("postcss-pxtorem")({
            rootValue: 16, // 换算的基数
            selectorBlackList: ["vux", "vux-ui"], // 忽略转换正则匹配项
            propList: ["*"]
          })
          // require("postcss-px2rem")({
          //   remUnit: 37.5
          // })
        ]
      },
      sass: {
        data: `
          @import "@/assets/scss/variable.scss";
        `
      }
    }
  },
  runtimeCompiler: true // 包含运行时编译器的 Vue 构建版本
};
