import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import postcss from "./postcss.config.js"; // Import Tailwind config

// console.log("PostCSS Config:", postcss);

export default defineConfig({
  plugins: [react()],
  // css: {
  //   postcss,
  // },
  build: {
    lib: {
      entry: "./src/utility.jsx",
      name: "UtilityWidget",
      fileName: (format) => `utility-widget.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"], // Keep React as external
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
      onwarn(warning, warn) {
        if (warning.plugin === "vite:css") {
          console.warn("PostCSS Warning:", warning.message);
        }
        warn(warning);
      },
    },
  },
});

// export default defineConfig({
//   plugins: [react()],
// });
