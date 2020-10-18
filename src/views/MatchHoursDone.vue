<template lang='pug'>
  v-container
    v-row
      v-col.mt-3.text-center
        h2.text-center(style='font-weight: 500; color: #4CAF50; display: inline;') Horários reservados&nbsp;
        v-icon.mb-2(color='green') mdi-check-decagram
    v-row#match-text-section.mt-3(no-gutters)
      v-col.grey--text.font-weight-light.text-center.body-1.pa-0(cols='12' style='line-height: 1.5;')
        span O produto será entregue em um dos dias abaixo entre as horas:
    v-row#match-section(v-if='hora.selected.length != 0' v-for='(hora, i) in produto.horasCorrespondidas' justify='space-between' style='width: 100%;')
      v-col.section-subtitle.pb-1(cols='3' align-self='start') Dia {{ hora.date.toDate().getDate() }}:
      v-col.section-subtitle.pb-1(cols='9' align-self='end' style='font-weight: 600;')
        span(v-for='(h, i) in hora.selected' :style='{ color: (i%2 === 0 ? "orange" : "#6E0AD6") }')
          | {{ `${h}:00h - ${h + 1}:00h` }}
          span.grey--text(v-if='hora.selected.length - 1 !== i') &nbsp;|&nbsp;
    v-row.mt-3
      v-divider
    v-row#confirm-section
      v-col(cols='12')
        v-btn(color='#ffa500' dark large block depressed rounded style='text-transform: none !important' @click="$router.push('/home')") OK
</template>

<script>
import firebase from 'firebase'
export default {
  fiery: true,
  data () {
    return {
      produto: this.$fiery(firebase.firestore().collection("produtos").doc(this.$route.params.id))
    }
  },
  mounted () {
    this.$fiery(firebase.firestore().collection("produtos").doc(this.$route.params.id), {
      onSuccess: (produto) => {
        produto.horasCorrespondidas = produto.horasCorrespondidas.map(horas => {
          horas.selected.sort(function(a, b) {
            return a - b
          })
          return horas
        })
      } 
    })
  }
}
</script>

<style>

</style>