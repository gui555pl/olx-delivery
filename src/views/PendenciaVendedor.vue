<template lang='pug'>
    div
        v-col(style="text-align:center;" )
            v-row(style="margin-top:15%; justify-content:center;" v-if="produtos.length == 0")
                img(src="../imagens/sad.jpg" height="200px;" )
                h3(style="font-size:25px; color:#565656#; margin-top:20px; width:70%; ") Você não tem nenhuma venda pendente
            v-row#product-list( v-else)
                v-col.py-1(cols='12' v-for='(produto, i) in produtos' :key='i')
                    ProductCard(:product='produto' :isPendencia="true")

</template>

<script>
import BaseLayoutVue from "../components/BaseLayout.vue";
import ProductCard from '../components/ProductCard.vue'
import firebase from 'firebase'
export default {
  fiery: true,
  components: {
    BaseLayoutVue: BaseLayoutVue,
    ProductCard:ProductCard
  },
  data() {
      return{
        produtos: this.$fiery(firebase.firestore().collection("produtos").where('status','==','aguardando_vendedor'))
      }
  },
};
</script>

<style>
</style>