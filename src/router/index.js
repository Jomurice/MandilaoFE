import { createRouter, createWebHistory } from "vue-router";

import login from "../components/login/login.vue";
import adminLogin from "../components/login/adminLogin.vue";
import register from "../components/account/register.vue";
import HomeUser from "../components/home/HomeUser.vue";
import HomeAdmin from "../components/home/HomeAdmin.vue";
import eventPage from "../components/eventPage/eventPage.vue";
import eventDetail from "../components/eventPage/eventDetail.vue";
import profileUser from "../components/account/profile-user.vue";
import menu from "../components/menu/menu.vue";
import product from "../components/product/product.vue";
const routes = [
  { path: "/", name: "Home", component: HomeUser },
  {
    path: "/admin",
    component: HomeAdmin,
    children: [
      { path: "products", component: product },
      // { path: "users", component: User },
      // {
      //   path: "category",
      //   component: () => import("../views/admin/Category.vue"),
      // },
      // { path: "order", component: () => import("../views/admin/Order.vue") },
      // {
      //   path: "discount",
      //   component: () => import("../views/admin/Discount.vue"),
      // },
      // { path: "cart", component: () => import("../views/admin/Cart.vue") },
      // { path: "table", component: () => import("../views/admin/Table.vue") },
      // {
      //   path: "reports",
      //   component: () => import("../views/admin/Reports.vue"),
      // },
    ],
  },
  { path: "/login", component: login },
  { path: "/adminLogin", component: adminLogin },
  { path: "/register", component: register },
  { path: "/eventPage", component: eventPage },
  { path: "/eventDetail", component: eventDetail },
  { path: "/profileuser", component: profileUser },
  { path: "/menu", component: menu },
  { path: "/admin/products", component: product },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
