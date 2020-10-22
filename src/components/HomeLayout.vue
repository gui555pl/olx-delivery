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
        v-list-item(v-if='user.type === "vendedor"' link)
          v-list-item-icon
            v-icon(style='color: #343a40 !important;') mdi-calendar-clock
          v-list-item-content
            v-list-item-title Pendências
        v-list-item(v-if='user.type === "entregador"') Entregador
        v-list-item(@click='item.to ? $router.push("/home") : {}' v-for='(item, i) in menuItens' :key='i' link)
          v-list-item-icon
            img(v-if='item.img' style='height: 19px; margin: auto;' :src='item.img')
            v-icon(v-else style='color: #343a40 !important;') {{ item.icon }}
          v-list-item-content
            v-list-item-title(:style='{ color: item.color || "" }') {{ item.name }}
      v-divider
      v-list.pt-4.pb-0
        v-list-item(v-for='(item, i) in subMenuItems' :key='i' link)
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
      menuItens: [
        { name: 'Anúncios', img: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/OLX_Brazil_Logo.png', color: 'orange', to: '/home'},
        { name: 'Inserir Anúncio', icon: 'mdi-pencil-outline' },
        { name: 'Notificações', icon: 'mdi-bell-outline' },
        { name: 'Chat', icon: 'mdi-chat-outline' },
        { name: 'Favoritos', icon: 'mdi-heart-outline' },
        { name: 'Minha Conta', icon: 'mdi-account-outline' },
      ],
      subMenuItems: [ 'Central de Ajuda', 'Sobre a OLX', 'Dicas de Segurança', 'Termos de Uso', 'Avalie na Google Play', 'Curta no Facebook' ]
    }
  }
};
</script>