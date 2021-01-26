import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Admin from "../views/Admin.vue";
import Login from "../views/Login.vue";
import NewSale from "../views/NewSale.vue";
import SalesList from "../views/SalesList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: Login
    /*meta: { requiresAuth: true }*/
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
    /*meta: { requiresAuth: true }*/
    children: [
      {
        path: "newsale",
        name: "newsale",
        component: NewSale
      },
      {
        path: "saleslist",
        name: "saleslist",
        component: SalesList
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
