
export default function myExample () {
    // 返回的是插件对象
    return {
      name: 'my-example', // 名称用于警告和错误展示
      // enforce: 'pre'|'post'
      // 初始化hooks，只走一次
      // options 替换或操作传递给rollup.rollup()的选项
      options(opts) {
        console.log('options', opts);
      },
      //buildStart 在每个rollup.rollup()构建时被调用
      buildStart() {
        console.log('buildStart');
      },
      //config 可以在被解析之前修改 Vite 配置
      config(config) {
        console.log('config  --------');
        return {}
      },
      // configResolved 解析 Vite 配置后调用,使用这个钩子读取和存储最终解析的配置
      configResolved(resolvedCofnig) {
        console.log('configResolved');
      },
      //configureServer 用于配置开发服务器
      configureServer(server) {
        console.log('configureServer');
        // server.app.use((req, res, next) => {
        //   // custom handle request...
        // })
      },
      // transformIndexHtml 转换 index.html 的专用钩子
      transformIndexHtml(html) {
        console.log('transformIndexHtml');
        // return html
        return html.replace(
          /<title>(.*?)<\/title>/,
          `<title>Title replaced!</title>`
        )
      },
      // id确认 resolveId 用户自定义解析器
      resolveId ( source ) {
        console.log('resolveId');
        return null; // 返回null表明是其他id要继续处理
      },
      // load 用户自定义加载器 通用钩子 会在每个传入模块请求时被调用
      load ( id ) {
        console.log('load');
        return null; // 其他id继续处理
      },
      // transform 可以用来转换单个模块 通用钩子 会在每个传入模块请求时被调用
      transform(code, id) {
        console.log('transform');
        return code
      },
    };
  }
