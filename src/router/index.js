import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Home from "@/views/Home.vue";
import BaseLayout from "@/components/BaseLayout.vue";
import Buy from "@/views/Buy.vue";
import Fluxo from "@/views/Fluxo.vue";
import EsperaComprador from "@/views/EsperaComprador.vue";
import EsperaVendedor from "@/views/EsperaVendedor.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      hasToolbar: false,
    },
  },
  {
    path: "/esperacomprador/:id",
    name: "EsperaComprador",
    component: EsperaComprador,
    meta: {
      hasToolbar: false,
    },
  },
  {
    path: "/esperavendedor/:id",
    name: "EsperaVendedor",
    component: EsperaVendedor,
    meta: {
      hasToolbar: false,
    },
  },
  {
    path: "/fluxo",
    name: "Fluxo",
    component: Fluxo,
    meta: {
      hasToolbar: false,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    component: BaseLayout,
    children: [
      {
        path: "buy",
        name: "Comprar",
        components: { default: Buy },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
