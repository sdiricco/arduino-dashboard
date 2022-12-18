import { createApp } from "vue";
import App from "./App.vue";
import "./samples/node-api";

// Plugins
import { registerPlugins } from "./plugins";

const app = createApp(App);

registerPlugins(app);

app.mount("#app").$nextTick(() => {
  postMessage({ payload: "removeLoading" }, "*");
});
