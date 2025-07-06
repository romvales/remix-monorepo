
    export { default } from "../../build/romvales/server/server.js";

    export const config = {
      name: "Remix server handler",
      generator: "@netlify/remix-edge-adapter@3.4.3",
      cache: "manual",
      path: "/*",
      excludedPath: ["/.netlify/*","/.vite/*","/Rom Vales Villanueva - Resume.pdf","/assets/*","/robots.txt"],
    };