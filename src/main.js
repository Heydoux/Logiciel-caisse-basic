import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import jQuery from "jquery";
import "popper.js";
import "bootstrap";
import "./assets/scss/app.scss";
import excel from "vue-excel-export";

window.$ = window.jQuery = jQuery;

Vue.use(excel);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
