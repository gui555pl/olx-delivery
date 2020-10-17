<template lang='pug'>
  v-container
    v-row
      v-col.mt-3
        h2.text-center(style='font-weight: 500;') Confirme sua compra
    v-row#product-section
      v-col.section-title.pb-0(cols='12') Produto
      v-col(cols='3')
        v-img(contain :src='produto.img')
      v-col.pl-0(cols='6')
        v-col.section-subtitle.pa-0(cols='12') {{ produto.descricao }}
        v-col.grey--text.body-2.font-weight-light.pa-0(cols='12' style='font-size: 0.7rem !important;') Vendido por: Maria Luiza da Silva
      v-col.body-2.font-weight-medium(cols='3' align-self='center' style='text-align: right;') R${{ produto.preço }},00
    v-row
      v-divider
    v-row#delivery-section(no-gutters)
      v-col.section-title.py-3(cols='12')
        | Entrega
        v-icon.ml-1(small color='#6E0AD6') mdi-help-circle-outline
      v-col.section-title.pb-0(cols='12')
        | Endereço de Entrega
      v-row
        v-col(cols='auto')
          v-avatar(color='#6E0AD630' size='36')
            v-icon(small color='#6E0AD6') mdi-home-outline
        v-col.pl-0
          v-col.section-subtitle.pa-0(cols='12') Rua Dom Pedro de Sá, 123 Casa
          v-col.grey--text.body-2.font-weight-light.pa-0(cols='12' style='font-size: 0.7rem !important; line-height: 1.5;') Várzea, Recife - PE
      v-row.pt-2.pb-0(justify='space-between')
        v-col.pb-0.section-title(cols='auto')
          | Opções de Entrega
        v-col.pb-0.text-right.caption(@click='sheet = true' style='color: #6E0AD6') alterar
      v-row(style='width: 100%;')
        v-col(cols='auto')
          v-avatar(:color='delivery.color + "30"' size='36')
            v-icon(small :color='delivery.color') {{ delivery.icon }}
        v-col.pl-0
          v-col.section-subtitle.pa-0(cols='12') {{ delivery.type === 'olx-delivery' ? 'OLX Delivery' : 'Expressa' }}
          v-col.grey--text.body-2.font-weight-light.pa-0(cols='12' style='font-size: 0.7rem !important; line-height: 1.5;') Em até {{ delivery.time }} dias úteis
        v-col.body-2.font-weight-medium(cols='3' align-self='center' style='text-align: right;') R${{ delivery.price.toFixed(2).replace('.', ',') }}
    v-row
      v-divider
    v-row#payment-section(no-gutters)
      v-row.pt-2.pb-0(justify='space-between')
        v-col.pb-0.section-title(cols='auto')
          | Forma de pagamento
        v-col.pb-0.text-right.caption(style='color: #6E0AD6') alterar
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
        v-col.section-subtitle.py-1(cols='auto' style='font-weight: 400') Entrega expressa
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
            span(style='color: #6E0AD6') Termos e Condições de Usado
            | da OLX Pay e Compra segura
    v-bottom-sheet(v-model='sheet')
      v-sheet
        v-row(v-for='item in deliveryItems' no-gutters)
          div(v-ripple @click='delivery = item; sheet = false' style='width: 100%;')
            v-row.px-3
              v-col(cols='auto')
                v-avatar(:color='item.color + "30"' size='36')
                  v-icon(small :color='item.color') {{ item.icon }}
              v-col.pl-0
                v-col.section-subtitle.pa-0(cols='12') {{ item.type === 'olx-delivery' ? 'OLX Delivery' : 'Expressa' }}
                v-col.grey--text.body-2.font-weight-light.pa-0(cols='12' style='font-size: 0.7rem !important; line-height: 1.5;') Em até {{ item.time }} dias úteis
              v-col.body-2.font-weight-medium(cols='3' align-self='center' style='text-align: right;') R${{ item.price.toFixed(2).replace('.', ',') }}   
</template>

<script>
import firebase from 'firebase'
export default {
  fiery: true,
  data () {
      return {
          produto: this.$fiery(firebase.firestore().collection("produtos").doc(this.$route.params.id)),
          sheet: false,
          deliveryItems: [
            {
              type: 'express',
              price: 15.52,
              icon: 'mdi-rocket-launch-outline',
              color: '#008000',
              time: 4
            },
            {
              type: 'olx-delivery',
              price: 13.00,
              icon: 'mdi-menu',
              color: '#ffa500',
              time: 2
            },
          ],
          delivery: {
            type: 'express',
            price: 15.52,
            icon: 'mdi-rocket-launch-outline',
            color: '#008000',
            time: 4
          }
      }
  },
  methods:{
    comprar(){
      this.$fires.produto.update({
        status:'aguardando_vendedor'
      })
      this.$router.push('/buying/esperacomprador/'+ this.$route.params.id);
    }
  }
}
</script>

<style>

</style>