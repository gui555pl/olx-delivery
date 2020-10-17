<template lang='pug'>
  v-container
    v-row
      v-col.mt-3
        h2.text-center(style='font-weight: 500;') Escolha uma opção
    v-row#days-section(justify='center')
      v-col.px-2(v-for='(day, i) in days' cols='auto')
        v-card(@click='day.active = !day.active' :class='day.active ? "orange-outlined" : ""' outlined min-width='66px')
          v-row(justify='center')
            v-col.section-subtitle.pb-1(cols='auto' style='font-weight: 400' :style='day.active ? { color: "orange" } : {}') {{ day.name }}
          v-row(justify='center')
            v-col.font-weight-bold.pt-1(cols='auto' style='font-weight: 400')
              h3 {{ day.date }}
    //- v-row#product-section
    //-   v-col.section-title.pb-0(cols='12') Produto
    //-   v-col(cols='3')
    //-     v-img(contain :src='produto.img')
    //-   v-col.pl-0(cols='6')
    //-     v-col.section-subtitle.pa-0(cols='12') {{ produto.descricao }}
    //-     v-col.grey--text.body-2.font-weight-light.pa-0(cols='12' style='font-size: 0.7rem !important;') Vendido por: Maria Luiza da Silva
    //-   v-col.body-2.font-weight-medium(cols='3' align-self='center' style='text-align: right;') R${{ produto.preço }},00
    //- v-row
    //-   v-divider
</template>

<script>
export default {
  data () {
    return {
      days: [
        {
          active: true,
          name: 'Seg',
          date: 19
        },
        {
          active: false,
          name: 'Ter',
          date: 20
        },
        {
          active: true,
          name: 'Seg',
          date: 19
        },
        {
          active: false,
          name: 'Ter',
          date: 20
        },
        {
          active: true,
          name: 'Seg',
          date: 19
        },
        {
          active: false,
          name: 'Ter',
          date: 20
        }
      ]
    }
  },
  mounted () {
  }
}
</script>

<style>
.orange-outlined {
  border: thin solid orange !important;
}
</style>