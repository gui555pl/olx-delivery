<template lang='pug'>
    div
      v-col(style="text-align:center; " )
        v-row#product-list( )
        h3(style="margin-top:20px;") Entregas pendentes 
          v-list.overflow-y-auto(style="max-height: 200px;")
            v-col.py-1(cols='12' v-for='(produto, i) in produtosNovos' :key='i')
                ProductCard(:product='produto' :isPendencia="false" :Info="true")

      v-col(style="text-align:center; " )
        v-row#product-list( )
        h3 Entregas em andamento 
          v-list.overflow-y-auto(style="max-height: 250px;")
            v-col.py-1(cols='12' v-for='(produto, i) in produtosAndamento' :key='i' :Info="true")
                ProductCard(:product='produto' :isPendencia="true")

</template>

<script>
import ProductCard from '../components/ProductCard.vue'
import firebase from 'firebase'
export default {
  fiery: true,
  data() {
      return{
        produtosNovos: this.$fiery(firebase.firestore().collection("produtos").where("status","!=","aguardando_entregador")),//n sei a lógica desses n 
        produtosAndamento: this.$fiery(firebase.firestore().collection("produtos").where("entregador_email","==",this.$store.getters.user.email)),
      }
  },
  components:{
    ProductCard:ProductCard
  },
  methods:{


  },
  created(){

  }
};
</script>

<style>
</style>