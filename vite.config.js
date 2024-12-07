import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import postcss from "./postcss.config"; // Import Tailwind config

// console.log("PostCSS Config:", postcss);

// export default defineConfig({
//   plugins: [react()],
//   css: {
//     postcss,
//   },
//   build: {
//     lib: {
//       entry: "./src/widget.jsx",
//       name: "MyWidget",
//       fileName: (format) => `my-widget.${format}.js`,
//     },
//     rollupOptions: {
//       external: ["react", "react-dom"], // Keep React as external
//       output: {
//         globals: {
//           react: "React",
//           "react-dom": "ReactDOM",
//         },
//       },
//       onwarn(warning, warn) {
//         if (warning.plugin === "vite:css") {
//           console.warn("PostCSS Warning:", warning.message);
//         }
//         warn(warning);
//       },
//     },
//   },
// });

export default defineConfig({
  plugins: [react()],
});
