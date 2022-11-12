import {createApp} from 'vue'
import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import {createVuetify} from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import ApiClient from "./modules/api/ApiClient";

const app = createApp(App)

app.use(router)

app.use(
  createVuetify({
    components,
    directives,
  })
);

app.provide('$api', new ApiClient());

app.mount('#app')
