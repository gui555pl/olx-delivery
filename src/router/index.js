import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Home from "@/views/Home.vue";
import BaseLayout from "@/components/BaseLayout.vue";
import HomeLayout from "@/components/HomeLayout.vue";
import Buy from "@/views/Buy.vue";
import Fluxo from "@/views/Fluxo.vue";
import EsperaComprador from "@/views/EsperaComprador.vue";
import HorarioVendedor from "@/views/HorarioVendedor.vue";
import PendenciaVendedor from "@/views/PendenciaVendedor.vue";
import Agendamento from '@/views/Agendamento.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Início",
    component: Fluxo
  },
  {
    path: "/horariovendedor/:id",
    name: "HorarioVendedor",
    component: HorarioVendedor
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
      {
        path: "esperacomprador/:id",
        name: "EsperaComprador",
        component: EsperaComprador
      },
      {
        path: "agendamento/:id",
        name: "Agendamento",
        component: Agendamento
      }
    ],
  },
  {
    path: "/pendenciavendedor",
    name: "PendenciaVendedor",
    component: PendenciaVendedor
  },
  {
    path: "/home",
    component: HomeLayout,
    redirect: "/home/items",
    children: [
      {
        path: "items",
        name: "Home",
        components: { default: Home },
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
