<template lang="pug">
div(style="justify-content:center; text-align:center; height: 100%;")
  v-app-bar(app, color="#6E0AD6", dark)
    v-toolbar-title Entrar
  v-container(style='height: 100%;')
    v-row.pa-0(no-gutters style='height: 100%;')
      v-col(cols="12", md="4" align-self='center')
        v-row.pa-0
          v-col.pb-0
            h3.text-left(style='font-weight: 500;') Nome
            v-text-field(
            v-model="name",
            required
            outlined
            hide-details
            )
        v-row.pa-0
          v-col.pb-0
            h3.text-left(style='font-weight: 500;') Email
            v-text-field(
            v-model="email",
            required
            outlined
            hide-details
            )
        v-col(cols='12' align-self='center' style='text-align: center;')
          div.caption(style='display: inline-block;') O email é necessário apenas para que tenhamos um usuário único.&nbsp;
            span(style='color: #6E0AD6') Qualquer identificador único &nbsp;
            | que você tenha em mente pode ser utilizado.
        v-row#confirm-section
          v-col.pt-0(cols='12')
            v-btn(color='#ffa500' v-bind='isDisabled' large block depressed rounded style='text-transform: none !important' @click="adicionarProduto()") Entrar
</template>

<script>
import products from './data/products'
import address from './data/address'
import firebase from 'firebase'
export default {
  name: "login",
  fiery: true,
  computed: {
    isDisabled () {
      if (this.name ==="" || this.email==="") {
        return {
          disabled: true
        }
      } else {
        return {
          dark: true
        }
      }
    }
  },
  data() {
    return {
      name: "",
      email: "",
      produtos: this.$fiery(firebase.firestore().collection("produtos")),
      users: this.$fiery(firebase.firestore().collection("users")),
    };
  },
  methods: {
    adicionarProduto() {
        let rand = this.getRandomInt(0, products.length)
        let produto
        if (products[rand - 1]) {
          produto = products[rand - 1]
        } else {
          produto = products[0]
        }
        const enderecoVendedor = address[this.getRandomInt(0, 4)]
        produto.vendedor_email =  this.email
        produto.vendedor_name = this.name,
        produto.endereco = enderecoVendedor
        produto.active = true
        produto.createdAt = firebase.firestore.FieldValue.serverTimestamp()
        this.$store.commit('setUser', {
        email: this.email,
        name: this.name,
        endereco: enderecoVendedor
        });
        this.$fires.produtos.add(produto)

        const user = {
          name: this.name,
          email: this.email,
          saldo: 0,
          endereco: enderecoVendedor
        }
        this.$fires.users.doc(this.email).set(user)
        this.email = ''
        this.name = ''
        this.$router.push('/home')
    },
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  },
};
</script>
<style >
.content {
  height: 100vh;
  width: 100vw;
}
</style>

