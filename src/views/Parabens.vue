<template lang='pug'>
    div
        v-col(style="text-align:center;" )
            v-row(style="margin-top:15%; justify-content:center;")
                img(src="../imagens/group-young-people-posing-photo_52683-18823.jpg" height="240px;" )
                h3(style="font-size:25px; color:#565656#; margin-top:20px; width:70%; ") Seu novo saldo é: {{user[0].saldo}}


</template>

<script>

import firebase from 'firebase'
export default {
  fiery: true,
  data() {
      return{
        user: this.$fiery(firebase.firestore().collection("users").where("email","==",this.$store.getters.user.email)),
        novoSaldo:15.72
      }
  },
  methods:{
    atualizarSaldo(){
      console.log(this.user[0].saldo)
      this.user[0].saldo+= this.novoSaldo
    }

  },
  created(){
    console.log(this.$store.getters.user.email)
    this.atualizarSaldo()
  }
};
</script>

<style>
</style>