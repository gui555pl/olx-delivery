<template lang='pug'>
  v-container(:style='{ overflow: loading ? "hidden" : "scroll", height: loading ? "calc(100vh - 128px)" : "" }')
    v-skeleton-loader(v-if='loading' type='article, image, table-heading, list-item-two-line, table-heading, list-item-two-line, text, table-tfoot, button')
    template(v-else)
      v-row
        v-col.mt-3
          h2.text-center(style='font-weight: 500;') Confirme sua compra
      v-row#product-section
        v-col.section-title.pb-0(cols='12') Produto
        v-col(cols='3')
          v-img(contain :src='produto.img')
        v-col.pl-0(cols='6')
          v-col.section-subtitle.pa-0(cols='12') {{ produto.descricao }}
          v-col.grey--text.body-2.font-weight-light.pa-0(cols='12' style='font-size: 0.7rem !important;') Vendido por: {{ produto.vendedor_name }}
        v-col.body-2.font-weight-medium(cols='3' align-self='center' style='text-align: right;') R${{ produto.preço }},00
      v-row
        v-divider
      v-row#delivery-section(no-gutters)
        v-col.section-title.py-3(cols='12')
          | Entrega
          v-icon.ml-1(small color='#6E0AD6') mdi-help-circle-outline
        v-col.section-title.pb-0(cols='12')
          | Endereço de Entrega
        v-row(style='width: 100%;')
          v-col(cols='auto')
            v-avatar(color='#6E0AD630' size='36')
              v-icon(small color='#6E0AD6') mdi-home-outline
          v-col.pl-0
            v-col.section-subtitle.pa-0(cols='12') {{ produto.endereco.name.split('-')[0] }}
            v-col.grey--text.body-2.font-weight-light.pa-0(cols='12' style='font-size: 0.7rem !important; line-height: 1.5;') {{ produto.endereco.name.split('-')[1] + '-' + produto.endereco.name.split('-')[2] }}
        v-row.pt-2.pb-0(justify='space-between')
          v-col.pb-0.section-title
            | Opções de Entrega
          v-col.pb-0.text-right.caption(@click='sheet = true' style='color: #6E0AD6') alterar
        v-row(@click='sheet = true' v-ripple style='width: 100%;')
          v-col(cols='auto')
            v-avatar(:color='delivery.color + "30"' size='36')
              v-icon(v-if='delivery.icon' small :color='delivery.color') {{ delivery.icon }}
              img(v-else :src='delivery.img' style='height: auto; width: 90%;')
          v-col.pl-0
            v-col.section-subtitle.pa-0(cols='12') {{ delivery.type === 'olx-delivery' ? 'OLX Delivery' : 'Expressa' }}
            v-col.grey--text.body-2.font-weight-light.pa-0(cols='12' style='font-size: 0.7rem !important; line-height: 1.5;')  Em até {{ delivery.hours ? delivery.time + " hora" + (delivery.time > 1 ? "s" : "") : delivery.time + " dias úteis" }}
          v-col.body-2.font-weight-medium(cols='3' align-self='center' style='text-align: right;') R${{ delivery.price.toFixed(2).replace('.', ',') }}
      v-row
        v-divider
      v-row#payment-section(no-gutters)
        v-row.pt-2.pb-0(justify='space-between')
          v-col.pb-0.section-title(cols='auto')
            | Forma de pagamento
          v-col.pb-0.text-right.caption(style='color: #ccc') alterar
        v-row(style='width: 100%;')
          v-col(cols='auto')
            v-avatar(color='#ffa50030' size='36')
              v-icon(small color='#ffa500') mdi-credit-card-outline
          v-col.pl-0(align-self='center')
            v-col.section-subtitle.pa-0(cols='12') Saldo OLX Play
      v-row
        v-divider
      v-row#review-section(no-gutters)
        v-row.pt-2.pb-0(justify='space-between')
          v-col.pb-0.section-title(cols='auto')
            | Resumo
        v-row(justify='space-between' style='width: 100%;')
          v-col.section-subtitle.pb-1(cols='auto' style='font-weight: 400') Produto
          v-col.section-subtitle.pb-1(cols='auto' style='font-weight: 400') R${{ produto.preço }},00
        v-row(justify='space-between' style='width: 100%;')
          v-col.section-subtitle.py-1(cols='auto' style='font-weight: 400') {{ delivery.type === 'express' ? 'Entrega expressa' : 'OLX Delivery' }}
          v-col.section-subtitle.py-1(cols='auto' style='font-weight: 400') R$ {{ delivery.price.toFixed(2).replace('.', ',') }}
        v-row(justify='space-between' style='width: 100%;')  
          v-col.section-subtitle.py-1(cols='auto' style='font-weight: 400') Pagamento à vista
          v-col.section-subtitle.py-1(cols='auto' style='font-weight: 400') 1x R${{ (produto.preço + delivery.price).toFixed(2).replace('.', ',') }}
        v-row(justify='space-between' style='width: 100%;')  
          v-col.font-weight-bold.py-1(cols='auto' style='font-weight: 400')
            h3 Total a pagar
          v-col.font-weight-bold.py-1(cols='auto' style='font-weight: 400')
            h3 R$ {{ (produto.preço + delivery.price).toFixed(2).replace('.', ',') }}
      v-row#confirm-section
        v-col(cols='12')
          v-btn(color='#ffa500' dark large block depressed rounded style='text-transform: none !important' @click="comprar()") Confirmar pagamento
        v-col(cols='12' align-self='center' style='color: #46a246; text-align: center;')
            v-icon(color='#46a246') mdi-lock-outline
            div(style='display: inline-block; line-height: 0.8') Compra segura
        v-col(cols='12' align-self='center' style='text-align: center;')
            div.caption(style='display: inline-block;') Ao confirmar o pagamento, você declara que está concordando com os 
              span(style='color: #6E0AD6') Termos e Condições de Usado &nbsp;
              | da OLX Pay e Compra segura
      v-bottom-sheet(v-model='sheet')
        v-sheet
          v-row(v-for='(item, i) in deliveryItems' :key='i' no-gutters)
            div(v-ripple @click='delivery = item; sheet = false' style='width: 100%;')
              v-row.px-3
                v-col(cols='auto')
                  v-avatar(:color='item.color + "30"' size='36')
                    v-icon(v-if='item.icon' small :color='item.color') {{ item.icon }}
                    img(v-else :src='item.img' style='height: auto; width: 90%;')
                v-col.pl-0
                  v-col.section-subtitle.pa-0(cols='12') {{ item.type === 'olx-delivery' ? 'OLX Delivery' : 'Expressa' }}
                  v-col.grey--text.body-2.font-weight-light.pa-0(cols='12' style='font-size: 0.7rem !important; line-height: 1.5;') Em até {{ item.hours ? item.time + " hora" + (item.time > 1 ? "s" : "") : item.time + " dias úteis" }}
                v-col.body-2.font-weight-medium(cols='3' align-self='center' style='text-align: right;') R${{ item.price.toFixed(2).replace('.', ',') }}   
          v-row(no-gutters justify='center')
            v-col.pb-3(cols='auto')
              v-btn(text large color='#6E0AD6' @click='sheet = false' style='text-transform: none !important') Cancelar
</template>

<script>
import firebase from 'firebase'
export default {
  fiery: true,
  data () {
      return {
          produto: this.$fiery(firebase.firestore().collection("produtos").doc(this.$route.params.id)),
          user: this.$fiery(firebase.firestore().collection("users").doc(this.$store.getters.user.email)),
          sheet: false,
          loading: true,
          deliveryItems: [
            {
              type: 'express',
              price: null,
              icon: 'mdi-rocket-launch-outline',
              color: '#008000',
              time: null
            },
            {
              type: 'olx-delivery',
              price: null,
              img: require('../imagens/olx-delivery.png'),
              color: '#ffa500',
              time: null,
              hours: true
            },
          ],
          delivery: null
      }
  },
  methods:{
    comprar(){
      this.$fires.produto.update({
        status:'aguardando_vendedor',
        frete: this.delivery.price,
      })
      this.$router.push('/buying/agendamento/'+ this.$route.params.id);
    },
    setFreteEPrazo () {
      console.log(this.produto)
      console.log(this.user)
      const relation = Math.abs(this.produto.endereco.value - this.user.endereco.value)
      let frete, prazo
      if (relation === 0) {
        frete = 10 + Math.random()
        prazo = 1
      } else {
        frete = 10 + Math.random() + relation
        prazo = relation
      }
      this.deliveryItems[0].price = parseFloat((frete * 1.4).toFixed(2))
      this.deliveryItems[0].time = 2
      this.deliveryItems[1].price = parseFloat(frete.toFixed(2))
      this.deliveryItems[1].time = prazo
    }
  },
  async created () {
    console.log('%c antes de tudo', 'color: red; font-size: 36px; text-stroke: 5px black;')
    this.$fiery(firebase.firestore().collection("produtos").doc(this.$route.params.id), {
      onSuccess: (req) => {
        this.produto = req
        this.$fiery(firebase.firestore().collection("users").doc(this.$store.getters.user.email), {
          onSuccess: (req) => {
            this.user = req
            this.setFreteEPrazo()
            console.log('%c depois de tudo', 'color: red; font-size: 36px; text-stroke: 5px black;')
            this.delivery = this.deliveryItems[1]
            this.loading = false
          }
        })
      }
    })
  }
}
</script>

<style>

</style>