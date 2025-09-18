/* eslint-disable no-undef */
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import path from "path";
import { fileURLToPath } from "url";
import { createHtmlPlugin } from "vite-plugin-html";
import env from "vite-plugin-environment";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default ({ mode }) => {
  const envVars = loadEnv(mode, process.cwd());
  return defineConfig({
    resolve: {
      alias: {
        "@config": path.resolve(__dirname, "src/config"),
        "@pages": path.resolve(__dirname, "src/pages"),
        "@layouts": path.resolve(__dirname, "src/layouts"),
        "@components": path.resolve(__dirname, "src/components"),
        "@translations": path.resolve(__dirname, "src/translations"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@styles": path.resolve(__dirname, "src/styles"),
        "@hooks": path.resolve(__dirname, "src/hooks"),
        "@store": path.resolve(__dirname, "src/store"),
        "@helpers": path.resolve(__dirname, "src/helpers"),
      },
    },
    plugins: [
      env("all"),
      sentryVitePlugin({
        org: "bando-ob",
        project: "minipay-app",
        authToken: envVars.SENTRY_AUTH_TOKEN,
        include: "./dist",
        urlPrefix: "~/",
        reactComponentAnnotation: {
          enabled: true,
        },
        automaticVercelMonitors: true,
      }),
      createHtmlPlugin({
        viteNext: true,
        minify: true,
        inject: {
          data: {
            title: envVars.VITE_APP_TITLE,
            description: envVars.VITE_APP_DESCRIPTION,
          },
        },
      }),
      react(),
    ],
    build: {
      sourcemap: true,
    },
    optimizeDeps: {
      // This is a temporary fix for the Grid2 issue
      // https://github.com/mui/material-ui/issues/32727#issuecomment-1697253782
      include: [
        "@mui/material/Unstable_Grid2",
        "@emotion/react",
        "@emotion/styled",
        "@mui/material/Tooltip",
      ],
    },
  });
};
