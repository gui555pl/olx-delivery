<template lang='pug'>
    div
      v-col(style="text-align:center; " )
        v-row#product-list( )
        h3(style="margin-top:20px;") Entregas pendentes 
          v-list.overflow-y-auto(style="max-height: 230px;")
            v-col.py-1(cols='12' v-for='(produto, i) in produtosNovos' :key='i')
              v-card(@click="toInfo(produto)")
                v-row
                  v-col(cols='auto')
                    v-avatar(color='#00800030' size='48')
                      v-icon(color='#008000') mdi-cash-multiple
                  p(style="font-weight: 400px; color:green; margin-top:20px;")  R$15.52
                  v-col(cols='auto')
                    v-avatar(color='#00800030' size='48')
                      v-icon(color='orange') mdi-timer-sand
                  p(style="font-weight: 400px; color:orange;margin-top:20px;")  15 min
                    

              
      v-col(style="text-align:center; " )
        v-row#product-list( )
        h3 Entregas em andamento 
          v-list.overflow-y-auto(style="max-height: 250px;")
            v-col.py-1(cols='12' v-for='(produto, i) in produtosAndamento' :key='i')
              v-card
                v-row
                  v-col(cols='auto')
                    v-avatar(color='#00800030' size='48')
                      v-icon(color='#008000') mdi-cash-multiple
                  p(style="font-weight: 400px; color:green; margin-top:20px;")  R$15.52
                  v-col(cols='auto')
                    v-avatar(color='#00800030' size='48')
                      v-icon(color='orange') mdi-timer-sand
                  p(style="font-weight: 400px; color:orange;margin-top:20px;")  15 min

</template>

<script>
import ProductCard from '../components/ProductCard.vue'
import firebase from 'firebase'
export default {
  fiery: true,
  data() {
      return{
        produtosNovos: this.$fiery(firebase.firestore().collection("produtos").where("status","==","aguardando_entregador")),//n sei a lógica desses n 
        produtosAndamento: this.$fiery(firebase.firestore().collection("produtos").where("entregador_email","==",this.$store.getters.user.email)),
      }
  },
  components:{
    ProductCard:ProductCard
  },
  methods:{
    toInfo(produto){
      let id = produto[".uid"].split("/")[4];
      console.log(id)
      this.$router.push('/info/'+ id )
    }

  },
  created(){

  }
};
</script>

<style>
</style>