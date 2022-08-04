import { CleanWebpackPlugin } from "clean-webpack-plugin";
import path from "path";
import type { Configuration } from "webpack";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";

type ConfigEnv = {
  prod?: boolean;
};

const createConfig = (env: ConfigEnv): Configuration => {
  // Dev server config for local development
  const devServer: DevServerConfiguration = {
    static: {
      directory: path.join(__dirname, "assets"),
    },
    port: 3000,
    open: false,
    hot: true,
    watchFiles: ["src/**/*", "dev/**/*"],
  };

  const outputFolder = path.resolve(__dirname, "dist");

  // Use necessary webpack plugins
  const plugins: Configuration["plugins"] = [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      hash: true,
  }),
  ];

  if (env.prod) {
    plugins.push(
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false,
        cleanOnceBeforeBuildPatterns: [
          outputFolder,
          // make sure that TS will be processed in empty directory
          path.resolve(__dirname, "lib"),
        ],
      }),
    );
  }

  return {
    mode: env.prod ? "production" : "development",
    entry: "./src/index.ts",
    output: {
      path: outputFolder,
      filename: "app.bundle.js",
      chunkFilename: 'chunk_[chunkhash].js',
    },
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: "ts-loader",
          exclude: [/node_modules/],
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js"],
      // resolve root path modules
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
    plugins: plugins,
    devServer: devServer,
  };
};

export default createConfig;
