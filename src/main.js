import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";
import router from "./router/index.js";
createApp(App).use(createPinia()).use(router).use(VueToast).mount("#app");
