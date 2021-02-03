import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Admin from "../views/Admin.vue";
import Login from "../views/Login.vue";
import NewSale from "../views/NewSales.vue";
import SalesList from "../views/SalesList.vue";
import ExportsExcel from "../views/ExportsExcel.vue";
import Users from "../views/Users.vue";

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
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
    meta: { requiresAuth: true },
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
      },
      {
        path: "exportsExcel",
        name: "exportsExcel",
        component: ExportsExcel
      },
      {
        path: "users",
        name: "users",
        component: Users
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
