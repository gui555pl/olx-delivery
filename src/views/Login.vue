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
import firebase from 'firebase'
export default {
  name: "login",
  fiery: true,
  data() {
    return {
      name: "",
      email: "",
      produtos: this.$fiery(firebase.firestore().collection("produtos")),
    };
  },
  methods: {
    adicionarProduto() {
        var rand = Math.random()*10
        const produto1 = {
            img: 'https://images.tcdn.com.br/img/img_prod/313499/mouse_gamer_t_dagger_lieutenant_rgb_7_botoes_8000dpi_t_tgm301_9403_1_20200709122258.jpg',
            preço: 140,
            descricao:'Mouse gamer rgb',
            status: 'nao-vendido'
        }
        const produto2 = {
            img: 'https://http2.mlstatic.com/D_NQ_NP_897612-MLB31675315010_082019-W.jpg',
            preço: 900,
            descricao:'Caixa de som JBL',
            status: 'nao-vendido'
        }
        const produto3 = {
            img: 'https://images-na.ssl-images-amazon.com/images/I/41-MkaTuBdL._AC_SY400_.jpg',
            preço: 430,
            descricao:'Fone de ouvido',
            status: 'nao-vendido'
        }
        var produto = {}
        if (rand%3 == 0) {
            produto = produto1
        }else if (rand%3 == 1) {
            produto = produto2
        }else {
            produto = produto3
        }
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

