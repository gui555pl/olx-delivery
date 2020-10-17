import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Home from "@/views/Home.vue";
import BaseLayout from "@/components/BaseLayout.vue";
import HomeLayout from "@/components/HomeLayout.vue";
import Buy from "@/views/Buy.vue";
import Fluxo from "@/views/Fluxo.vue";
import EsperaComprador from "@/views/EsperaComprador.vue";
import EsperaVendedor from "@/views/EsperaVendedor.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Início",
    component: Fluxo
  },
  {
    path: "/esperavendedor",
    name: "EsperaVendedor",
    component: EsperaVendedor
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/buying",
    component: BaseLayout,
    children: [
      {
        path: "item/:id",
        name: "Comprar",
        components: { default: Buy },
      },
    ],
  },
  {
    path: "/home",
    component: HomeLayout,
    children: [
      {
        path: "items",
        name: "Home",
        components: { default: Home },
      },
      {
        path: "esperacomprador/:id",
        name: "EsperaComprador",
        component: EsperaComprador
      }
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
