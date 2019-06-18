const path = require("path");
// const vuxLoader = require("vux-loader");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: false,
  // baseUrl: "/",
  publicPath: "./",
  devServer: {
    port: 8888,
    proxy: {
      "/microModule": {
        // target: "http://192.168.12.71:50087",
        target: "http://192.168.1.177:28089/gzzqapi/api",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/microModule": "/"
        }
      }
    }
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
  // configureWebpack: {
  //   externals: {
  //     BMap: "BMap"
  //   }
  // },
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
            selectorBlackList: ["vux"], // 忽略转换正则匹配项
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
  }
};
