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
import MatchHoursDone from '@/views/MatchHoursDone'
import Info from '@/views/Info.vue';
import Parabens from '@/views/Parabens.vue';
import ProximasEntregas from '@/views/ProximasEntregas.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "/fluxo",
    name: "Início",
    component: Fluxo
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
        path: "/parabens",
        name: "Parabens",
        component: Parabens,
        meta: {
          baseText: "Parabéns!",
          baseIcon: "mdi-party"
        }
      },
      {
        path: "/horariovendedor/:id",
        name: "HorarioVendedor",
        component: HorarioVendedor,
        meta: {
          baseText: "Por favor, confirme os dados seguintes para finalizar sua compra",
          baseIcon: "mdi-currency-usd"
        }
      },
      {
        path: "/pendenciavendedor",
        name: "PendenciaVendedor",
        component: PendenciaVendedor,
        meta: {
          baseText: "Suas vendas pendentes",
          baseIcon: "mdi-cash-multiple"
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
        path: "/info/:id",
        name: "Info",
        component: Info,
        meta: {
          baseText: "Informações da entrega",
          baseIcon: "mdi-moped-outline"
        }
      },
      {
        path: "/esperacomprador/:id",
        name: "EsperaComprador",
        component: EsperaComprador,
        meta: {
          baseText: "Esperando retorno do vendedor",
          baseIcon: "mdi-timer-sand"
        }
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
        path: "/proximasentregas",
        name: "ProximasEntregas",
        component: ProximasEntregas,
        meta: {
          baseText: "Minhas próximas entregas",
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
      },
      {
        path: "match/:id",
        name: "Combinado",
        component: MatchHoursDone,
        meta: {
          baseText: "Boa! Vocês marcaram horários correspondentes",
          baseIcon: "mdi-calendar-check-outline"
        }
      }
    ],
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
