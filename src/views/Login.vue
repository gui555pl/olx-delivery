<template lang="pug">
div(style="justify-content:center; text-align:center;")
  v-app-bar(app, color="#6E0AD6", dark)
  v-container
    v-form()
        v-container(style="margin-top:10%;")
        v-col(cols="12", md="4", style="border:1px solid black;")
            v-text-field(
            v-model="name",
            label="Nome completo",
            required=""
            )
            v-text-field(
            v-model="email",
            label="E-mail",
            required=""
            )
            v-btn(@click="adicionarProduto()") Confirmar
</template>

<script>
import products from './data/products'
import firebase from 'firebase'
export default {
  name: "login",
  fiery: true,
  data() {
    return {
      name: "",
      email: "",
      produtos: this.$fiery(firebase.firestore().collection("produtos")),
      users: this.$fiery(firebase.firestore().collection("users"))
    };
  },
  methods: {
    adicionarProduto() {
        let rand = Math.floor(Math.random() * products.length) + 1
        let produto = products[rand - 1]
        produto.vendedor_email =  this.email
        produto.vendedor_name = this.name,
        this.$store.commit('setUser', {
        email: this.email,
        name: this.name,
        });
        this.$fires.produtos.add(produto)
        produto.vendedor_email =  'usuarioAleatorio'
        produto.vendedor_name = 'Usuário Aleatório'
        this.$fires.produtos.add(produto)
        
        const user = {
          name: this.name,
          email: this.email,
          saldo: 0
        }
        this.$fires.users.doc(this.email).set(user)
        this.email = ''
        this.name = ''
        this.$router.push('/fluxo')
    },
  },
};
</script>
<style >
.content {
  height: 100vh;
  width: 100vw;
}
</style>

