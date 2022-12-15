import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import Oruga from '@oruga-ui/oruga-next'
import '@oruga-ui/oruga-next/dist/oruga.css'
import 'bulma/css/bulma.css'

const app = createApp(App);


app.use(Oruga);
app.use(router);
app.use(createPinia());
app.mount("#app");
