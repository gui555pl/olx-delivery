<template lang='pug'>
  span#home-layout
    v-app-bar(app color="#6E0AD6" dark)
      v-app-bar-nav-icon(@click='drawer = true')
      v-spacer
      v-btn(icon)
        v-icon mdi-magnify
      v-btn(icon)
        v-icon mdi-heart-outline
    v-navigation-drawer(v-model='drawer' absolute temporary)
      v-list.py-0(color='#6E0AD6' dark)
        v-list-item(two-line)
          v-list-item-avatar
            v-avatar(color='transparent')
              v-icon(color='white') mdi-account-outline
          v-list-item-content
            v-list-item-title {{ user.name }}
            v-list-item-subtitle {{ user.email }}
      v-list.pt-4
        template(v-for='(item, i) in menuItens')
          v-list-item(@click='item.to ? $router.push(item.to) : {}' link :disabled='isDisabled(item)')
            v-list-item-icon
              img(v-if='item.img' style='height: 19px; margin: auto;' :src='item.img')
              v-icon(v-else :color='$route.path === item.to ? "orange" : "#343a40"' :disabled='isDisabled(item)') {{ item.icon }}
            v-list-item-content
              v-list-item-title(:style='{ color: $route.path === item.to ? "orange" : "" }')
                | {{ item.name }}
                v-avatar.ml-4(v-if='item.badge' color='red' size='24' style='color: white;')
                  span {{ produtosQtd }}
      v-divider
      v-list.pt-4.pb-0
        v-list-item(v-for='(item, i) in subMenuItems' :key='i' disabled)
          v-list-item-content
            v-list-item-title {{ item }}
    v-main(style='background: #f0f0f0; min-height: 100vh;')
      router-view
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'App',
  fiery: true,
  data () {
    return {
      drawer: false,
      user: this.$fiery(firebase.firestore().collection("users").doc(this.$store.getters.user.email)),
      produtosQtd: 0,
      menuItens: [
        { name: 'Anúncios', img: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/OLX_Brazil_Logo.png', to: '/home/items'},
        { name: 'Pendências', badge: true, icon: 'mdi-calendar-clock', to: '/pendenciavendedor' },
        { name: 'Ver Fluxo do Entregador', icon: 'mdi-moped-outline', to: '/proximasentregas' },
        { name: 'Redefinir trajeto diário', icon: 'mdi-map-marker-path', to: '/trajeto' },
        { name: 'Inserir Anúncio', icon: 'mdi-pencil-outline' },
        { name: 'Notificações', icon: 'mdi-bell-outline' },
        { name: 'Chat', icon: 'mdi-chat-outline' },
        { name: 'Favoritos', icon: 'mdi-heart-outline' },
        { name: 'Minha Conta', icon: 'mdi-account-outline' },
      ],
      subMenuItems: [ 'Central de Ajuda', 'Sobre a OLX', 'Dicas de Segurança', 'Termos de Uso', 'Avalie na Google Play', 'Curta no Facebook' ]
    }
  },
  methods: {
    isDisabled (item) {
      return item.name !== 'Pendências' && item.name !== 'Anúncios' && item.name !== 'Sair' && item.name !== 'Ver Fluxo do Entregador' && item.name !== 'Redefinir trajeto diário'
    }
  },
  mounted () {
    this.$fiery(firebase.firestore().collection("produtos").where('status','==','aguardando_vendedor').where('vendedor_email', '==', this.$store.getters.user.email), {
      onSuccess: (data) => {
        this.produtosQtd = data.length
      }
    })
  }
};
</script>