<template lang='pug'>
    div
        v-col(style="text-align:center;" )
            v-row(style="margin-top:15%; justify-content:center;")
                img(src="../imagens/group-young-people-posing-photo_52683-18823.jpg" height="240px;" )
                
                h3(style="font-size:25px; color:#565656#; margin-top:20px; width:70%; ") Seu novo saldo é: R${{ user.saldo.toFixed(2).replace('.', ',') }}
        v-col(cols='12')
          v-btn(color='#ffa500' dark large block depressed rounded style='text-transform: none !important' @click="$router.push('/home')") Ok


</template>

<script>

import firebase from 'firebase'
export default {
  fiery: true,
  data() {
      return{
        user: this.$fiery(firebase.firestore().collection("users").doc(this.$store.getters.user.email)),
      }
  },
  methods:{


  },
  created(){

  }
};
</script>

<style>
</style>