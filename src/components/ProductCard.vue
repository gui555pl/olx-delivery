<template lang='pug'>
v-card(style='box-shadow: 1px 1px 1px rgba(0,0,0,0.10); background:#fffffe;' v-ripple, @click="go()")
  v-row
    v-col(cols="3")
      v-img.ml-3.mt-3(contain, aspect-ratio="1", :src="product.img")
    v-col(cols="9")
      v-row(no-gutters)
        v-col(cols="12")
          span.section-subtitle.pb-1(style="font-weight: 400") {{ product.descricao }}
        v-col(cols="12")
          v-row(no-gutters)
            v-col.body-2.font-weight-medium(align-self='center') R${{ product.preço }}
            v-col.pt-0.pr-4.pb-0.pl-0
              img(height='20' style='float: right' src='../imagens/olxpay.jpeg')
              img(height='20' style='float: right' src='../imagens/entrega.jpeg')
        v-col(cols="12")
          span.grey--text.body-2.font-weight-light.pa-0(
            style="font-size: 0.7rem !important;"
          ) {{ product.createdAt.toDate().getDate() + ' de ' + months[product.createdAt.toDate().getMonth()] }}, {{ product.endereco.name.split('-')[1].split(',')[0] }}
          v-chip.mt-1.mr-4(v-if='isOwner' color='green' style='float: right' x-small dark) Seu produto
</template>

<script>
export default {
  props: ["product","isPendencia","Info","isOwner"],
  data() {
    return {
      months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
          'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ]
    };
  },
  methods: {
    go() {
      var id = this.product[".uid"].split("/")[4];
      if(this.Info==true){
        this.$router.push('/info')
      }
      if (this.isPendencia) {
        this.$router.push('/buying/agendamentoVendedor/'+id)
      } else {
        console.log("ID ", id);
        var rota = `/buying/item/${id}`;
        console.log("Rota", rota);
        this.$router.push(rota);
      }
    },
  },
  mounted () {
    console.log(this.product.createdAt.toDate().getDate())
    console.log(this.product.createdAt.toDate().getMonth())
  }
};
</script>

<style>
</style>