<template lang='pug'>
  v-card(flat v-ripple @click='$router.push(`/buying/item/${product[".uid"]}`)')
    v-row
      v-col(cols='3')
        v-img(contain aspect-ratio='1' :src='product.img')
      v-col(cols='9')
        v-row(no-gutters)
          v-col(cols='12')
            span.section-subtitle.pb-1(style='font-weight: 400') {{ product.descricao }}
          v-col(cols='12')
            span.body-2.font-weight-medium R${{ product.preço }}
          v-col(cols='12')
            .grey--text.body-2.font-weight-light.pa-0(style='font-size: 0.7rem !important;') 15 de outubro 18:38, Prazeres
</template>

<script>
export default {
  props: [ 'product' ]
}
</script>

<style>

</style>