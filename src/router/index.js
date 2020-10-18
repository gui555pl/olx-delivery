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
import Trajeto from "@/views/Trajeto.vue";
import Agendamento from '@/views/Agendamento.vue';
import AgendamentoVendedor from '@/views/AgendamentoVendedor.vue';
import Info from '@/views/Info.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "/fluxo",
    name: "Início",
    component: Fluxo
  },

  {
    path: "/horariovendedor/:id",
    name: "HorarioVendedor",
    component: HorarioVendedor
  },
  {
    path: "/",
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
        meta: {
          baseText: "Por favor, confirme os dados seguintes para finalizar sua compra",
          baseIcon: "mdi-file-document-outline"
        }
      },
      {
        path: "/trajeto",
        name: "Trajeto",
        component: Trajeto,
        meta: {
          baseText: "Programe um trajeto diário",
          baseIcon: "mdi-map-search"
        }
      },
      {
        path: "/info",
        name: "Info",
        component: Info,
        meta: {
          baseText: "Informações da entrega",
          baseIcon: "mdi-moped-outline"
        }
      },
      {
        path: "esperacomprador/:id",
        name: "EsperaComprador",
        component: EsperaComprador
      },
      {
        path: "agendamento/:id",
        name: "Agendamento",
        component: Agendamento,
        meta: {
          baseText: "Marque seu agendamento",
          baseIcon: "mdi-clock-outline"
        }
      },
      {
        path: "agendamentoVendedor/:id",
        name: "Agendamento Vendedor",
        component: AgendamentoVendedor,
        meta: {
          baseText: "Marque um ou mais horários para despachar o produto",
          baseIcon: "mdi-clock-outline"
        }
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
