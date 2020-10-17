<template lang='pug'>
  v-container.pt-0
    v-row#filter-section.elevation-2.mb-4(style='background: white;')
      v-col.filter-card.pa-0(cols='4')
        div.pa-3(v-ripple) DDD 81 - PE
      v-col.filter-card.pa-0(cols='4' style='border-right: 1px solid #fafafa; border-left: 1px solid #fafafa;')
        div.pa-3(v-ripple) Categoria
      v-col.filter-card.pa-0(cols='4')
        div.pa-3(v-ripple) Filtros
    v-row#product-list
      v-col.py-1(cols='12' v-for='(produto, i) in produtos' :key='i')
        ProductCard(:product='produto')
      v-col.py-1(cols='12' v-for='(produto, i) in produtos' :key='i')
        ProductCard(:product='produto')
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'
import firebase from 'firebase'
export default {
  fiery: true,
  components: {
    ProductCard
  },
  data () {
    return {
      produtos: this.$fiery(firebase.firestore().collection("produtos")),
    }
  },
  async mounted () {
    const logss = await this.produtos
    console.log(logss)
  }
}
</script>

<style>
.filter-card {
  color: #6E0AD6;
  text-overflow: ellipsis;
  text-align: center;
}
</style>