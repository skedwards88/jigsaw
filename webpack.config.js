const path = require("path");
const WorkboxPlugin = require('workbox-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {

  if (argv.mode === 'development') {
    console.log('RUNNING IN DEV MODE. Service worker will not generate.')
  } else {
    console.log('RUNNING IN NON-DEV MODE. Service worker will generate.')
  }

  const htmlPlugin = new HtmlWebpackPlugin({
    // Need to use template because need 'root' div for react injection. templateContent doesn't play nice with title, so just use a template file instead.
    template: "./src/index.html"
  })


  const serviceWorkerPlugin = new WorkboxPlugin.GenerateSW({
    // these options encourage the ServiceWorkers to get in there fast
    // and not allow any straggling "old" SWs to hang around
    clientsClaim: true,
    skipWaiting: true,
    maximumFileSizeToCacheInBytes: 4200000, // special case to cache word list for offline play
  })

  const plugins = argv.mode === 'development' ? [htmlPlugin] : [htmlPlugin, serviceWorkerPlugin]

  return {
  entry: "./src/index.js",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    publicPath: "",
    filename: "bundle.[fullhash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // removes unused files from output dir
  },
  performance: {
    maxEntrypointSize: 2700000, // special case to cache word list for offline play
    maxAssetSize: 2700000 // special case to cache word list for offline play
  },
  devServer: {
    static: "./dist",
    historyApiFallback: true,
  },
  plugins: plugins,
}
};