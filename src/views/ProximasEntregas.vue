<template lang='pug'>
    div
      v-col.pb-0.mt-5(cols='12' align-self='center' style='text-align: center;')
        div.caption(style='display: inline-block;') Essas são as entregas mais próximas de você!&nbsp;
          span(style='color: #FFA500') O tempo em laranja &nbsp;
          | é quanto, em minutos, vai acrescentar na sua rota atual.
      v-col(style="text-align:center; " )
        h3 Entregas pendentes 
        v-list.overflow-y-auto(style="max-height: 230px;")
          v-col.py-1(cols='12' v-for='(produto, i) in produtosNovos' :key='i')
            v-card(@click="toInfo(produto)")
              v-row.pa-0(justify='space-around' style='width: 100%;')
                v-col(cols='auto')
                  v-avatar(color='#00800030' size='48')
                    v-icon(color='#008000') mdi-cash-multiple
                  p(style="display: inline; font-weight: 400px; color:green; margin-top:20px;")  R${{parseFloat((produto.frete*0.8).toFixed(2))}}
                v-col(cols='auto')
                  v-avatar(color='#ffa50030' size='48')
                    v-icon(color='orange') mdi-timer-sand
                  p(style="display: inline; font-weight: 400px; color:orange;margin-top:20px;")  {{simulatePrazo(produto.frete)}} min
                    

              
      v-col(style="text-align:center; " )
        h3 Entregas em andamento 
          v-list.overflow-y-auto(style="max-height: 250px;")
            v-col.py-1(cols='12' v-for='(produto, i) in produtosAndamento' :key='i')
              v-card
                v-row
                  v-col(cols='auto')
                    v-avatar(color='#00800030' size='48')
                      v-icon(color='#008000') mdi-cash-multiple
                  p(style="font-weight: 400px; color:green; margin-top:20px;")  R${{produto.frete*0.8}}
                  v-col(cols='auto')
                    v-avatar(color='#00800030' size='48')
                      v-icon(color='orange') mdi-timer-sand
                  p(style="font-weight: 400px; color:orange;margin-top:20px;")  {{getRandomInt(5,30)}} min

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
    },
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    simulatePrazo (frete) {
      const a = 5, b = -45
      return Math.floor(a*frete + b)
    }
  },
  created(){

  },
};
</script>

<style>
</style>