<template lang="pug">
div(style='height: 100%; position: relative;')
  v-card.mx-auto(max-width="400" style="position: absolute; top: 50%; transform: translate(0, -50%)" flat)
    v-container
      v-row(dense="" style="text-align:center;")
        v-col(style="text-align:center;")
            h3() Escolha um fluxo para testar a jornada de cada usuário
        v-col(cols="12" style="margin-top:10px;"  )
          v-card(color="#6E0AD6", dark="" style="height:100px; " @click="$router.push('/pendenciavendedor')")
            v-card-title.headline
                v-col(style="text-align:center; ")
                    div(style="font-size:30px;") Vendedor
        v-col(cols="12" style="margin-top:10px;")
          v-card(color="#6E0AD6", dark="" style="height:100px; " @click="$router.push('/home')")
            v-card-title.headline
                v-col(style="text-align:center;")
                    div(style="font-size:30px;") Comprador
        v-col(cols="12" style="margin-top:10px;")
          v-card(color="#6E0AD6", dark="" style="height:100px;" @click="$router.push('/trajeto')")
            v-card-title.headline
                v-col(style="text-align:center;")
                    div(style="font-size:30px;") Planejar trajeto
        v-col(cols="12" style="margin-top:10px;")
          v-card(color="#6E0AD6", dark="" style="height:100px;" @click="$router.push('/proximasentregas')")
            v-card-title.headline
                v-col(style="text-align:center;")
                    div(style="font-size:30px;") Minhas entregas
            //- v-card-subtitle
            //-   | Listen to your favorite artists and albums whenever and wherever, online and offline.
            //- v-card-actions
            //-   v-btn(text="")
            //-     | Listen Now
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        color: "#1F7087",
        src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
        title: "Supermodel",
        artist: "Foster the People",
      },
      {
        color: "#952175",
        src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
        title: "Halcyon Days",
        artist: "Ellie Goulding",
      },
    ],
  }),
};
</script>