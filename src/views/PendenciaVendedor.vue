<template lang='pug'>
    div
      v-col
        template(v-if='!loading')  
          v-row(style="margin-top:10%; justify-content:center;" v-if="produtos.length == 0")
              img(src="../imagens/sad.jpg" height="200px;" )
              h3(style="font-size:25px; color:#565656#; margin-top:20px; width:70%; ") Você não tem nenhuma venda pendente
          v-row#product-list(v-else)
              v-col.py-1(cols='12' v-for='(produto, i) in produtos' :key='i')
                  ProductCard(:product='produto' :isPendencia="true")
        template(v-else)
          v-col.py-1(cols='12' v-for='i in 6' :key='i')  
            v-skeleton-loader(height='93.75px' type="list-item-avatar-three-line")
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
        produtos: null,
        loading: true
      }
  },
  mounted () {
    this.$fiery(firebase.firestore().collection("produtos").where('status','==','aguardando_vendedor').where('vendedor_email', '==', this.$store.getters.user.email), {
      onSuccess: (data) => {
        this.produtos = data
        this.loading = false
      }
    })
  }
};
</script>

<style>
</style>