<template lang='pug'>
  v-container(style='height: 1500px;')
    v-row
      v-col.mt-3
        h3.text-center(style='font-weight: 500;') Confirme sua compra
    v-row#product-section
      v-col.section-title.pb-0(cols='12') Produto
      v-col(cols='3')
        v-img(contain src='https://super.abril.com.br/wp-content/uploads/2018/05/filhotes-de-cachorro-alcanc3a7am-o-c3a1pice-de-fofura-com-8-semanas1.png')
      v-col(cols='6')
        v-col.subtitle-2.pa-0(cols='12' style='font-size: 0.7rem !important') Cachorro Usado
        v-col.grey--text.body-2.font-weight-light.pa-0(cols='12' style='font-size: 0.6rem !important;') Vendido por: Maria Luiza da Silva
      v-col.caption(cols='3' align-self='center' style='text-align: center;') R$84,00
    v-row
      v-divider
    v-row#delivery-section
      v-col.section-title.pb-0(cols='12')
        | Entrega
        v-icon.ml-1(small color='#6E0AD6') mdi-help-circle-outline
      v-col.section-title.pb-0(cols='12')
        | Endereço de Entrega
      v-row.px-3
        v-col(cols='2')
          v-avatar(color='#6E0AD630' size='24')
            v-icon(small color='#6E0AD6') mdi-home-outline
        v-col(cols='10')
          v-col.subtitle-2.pa-0(cols='12' style='font-size: 0.7rem !important') Rua Dom Pedro de Sá, 123 Casa
          v-col.grey--text.body-2.font-weight-light.pa-0(cols='12' style='font-size: 0.6rem !important;') Várzea, Recife - PE
</template>

<script>
export default {

}
</script>

<style>

</style>