<template lang='pug'>
  v-container.pt-0(:style='{ overflow: loading ? "hidden" : "scroll", height: loading ? "calc(100vh - 56px)" : "" }')
    v-row#filter-section.elevation-2.mb-4(style='background: white;')
      v-col.filter-card.pa-0(cols='4')
        div.pa-3(v-ripple) DDD 81 - PE
      v-col.filter-card.pa-0(cols='4' style='border-right: 1px solid #fafafa; border-left: 1px solid #fafafa;')
        div.pa-3(v-ripple) Categoria
      v-col.filter-card.pa-0(cols='4')
        div.pa-3(v-ripple) Filtros
    v-row#hint(v-if='!loading')
      v-col(cols='12' align-self='center' style='text-align: center;')
        div.caption(style='display: inline-block;') Tente comprar &nbsp;
          span(style='color: #6E0AD6') um produto seu. &nbsp;
          | Assim você faz o papel de comprador e vendedor e consegue acompanhar todo o fluxo em uma só conta.
    v-row#product-list
      v-col.py-1(v-if='!loading' cols='12' v-for='(produto, i) in produtos' :key='i')
        ProductCard(:product='produto' :isOwner='produto.vendedor_email === user.email' style='background: white !important;')
      v-col.py-1(v-if='loading' cols='12' v-for='i in 6' :key='i')  
        v-skeleton-loader(height='93.75px' type="list-item-avatar-three-line")
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
      produtos: null,
      user: this.$fiery(firebase.firestore().collection("users").doc(this.$store.getters.user.email)),
      loading: true
    }
  },
  async mounted () {
    console.log(this.loading)
    setTimeout(() => {
      this.$fiery(firebase.firestore().collection("produtos"), {
        query: m => m.where('active', '==', true),
        onSuccess: (itemsArray) => {
          this.produtos = itemsArray
          console.log(this.loading)
          this.loading = false
          console.log(this.loading)
        }
      })
    }, 500)
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