import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import ToastPlugin from "vue-toast-notification";
import { customToastPlugin } from "./plugins/useToast";

const app = createApp(App);

app.use(createPinia());
app.use(customToastPlugin);

app.mount("#app");
