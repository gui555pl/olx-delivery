<template lang='pug'>
  v-container
    v-row
      v-col.mt-3
        h2.text-center(style='font-weight: 500;') Escolha uma opção
    v-row#days-section(justify='center')
      v-col.px-2(v-for='(day, i) in days' cols='auto')
        v-card(@click='window = i' :class='window === i ? "orange-outlined" : ""' outlined min-width='66px')
          v-badge(v-if='daysSelected[i].selected.length' bordered icon='mdi-check' overlap color='green' style='position: absolute; right: 9px; top: 9px;')
          v-row(justify='center')
            v-col.section-subtitle.pb-1(cols='auto' style='font-weight: 400' :style='window === i ? { color: "orange" } : {}') {{ day.name }}
          v-row(justify='center')
            v-col.font-weight-bold.pt-1(cols='auto' style='font-weight: 400')
              h3 {{ day.date }}
    v-row#hours-section(no-gutters)
      v-col.section-title.pb-0(cols='12') Agendamento
      v-col.section-subtitle.py-1(cols='auto' style='font-weight: 400; color: red;') Selecione no mínimo 4 horários por dia
      v-row(no-gutters)
        v-col(cols='12')
          v-window.elevation-0(v-model='window')
            v-window-item(v-for='n in days.length' :key='n')
              v-row(v-for='i in 24' :key='i' no-gutters justify='space-between' style='width: 100%;')
                v-col.section-subtitle.pb-1(cols='auto' align-self='center' style='font-weight: 400') {{ i - 1 }}:00 - {{ i }}:00
                v-col.section-subtitle.pb-1(cols='auto' align-self='center' style='font-weight: 400')
                  v-checkbox(v-model='daysSelected[n-1].selected' color='orange' style='margin-top: 0;' hide-details :value='i-1')
    v-row.mt-3
      v-divider
    v-row#confirm-section
      v-col(cols='12')
        v-btn(color='#ffa500' dark large block depressed rounded style='text-transform: none !important' @click="confirm()") Confirmar
</template>

<script>
import firebase from 'firebase'
export default {
  fiery: true,
  data () {
    return {
      window: 0,
      produto: this.$fiery(firebase.firestore().collection("produtos").doc(this.$route.params.id)),
      hoursPossible: [],
      days: []
    }
  },
  methods: {
    numberToWeek (number) {
      switch (number) {
        case 0:
          return 'Dom'
        case 1:
          return 'Seg'
        case 2:
          return 'Ter'
        case 3:
          return 'Qua'
        case 4:
          return 'Qui'
        case 5:
          return 'Sex'
        case 6:
          return 'Sáb'
      }
    }
  },
  async mounted () {
    // this.produto = await this.$fiery(firebase.firestore().collection("produtos").doc(this.$route.params.id))
    setTimeout(() => {
      console.log(this.produto.horasDisponiveisComprador)
      this.hoursPossible = this.produto.horasDisponiveisComprador
      const day = this.hoursPossible[0].date.toDate().getDay()
      const date = this.hoursPossible[0].date.toDate().getDate()
      const day2 = this.hoursPossible[1].date.toDate().getDay()
      const date2 = this.hoursPossible[1].date.toDate().getDate()
      this.days = [
        {
          active: false,
          name: this.numberToWeek(day),
          date: date
        },
        {
          active: false,
          name: this.numberToWeek(day2),
          date: date2
        }
      ]
    }, 500)
  }
}
</script>

<style>
.orange-outlined {
  border: thin solid orange !important;
}
</style>