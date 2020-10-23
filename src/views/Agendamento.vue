<template lang='pug'>
  v-container
    v-row
      v-col.mt-3
        h2.text-center(style='font-weight: 500;') Escolha uma opção
      v-col(cols='12' align-self='center' style='text-align: center;')
        div.caption(style='display: inline-block;') Você está agendando um horário possível para 
          span(style='font-weight: bold;') receber o seu produto
          | . O entregador e o vendedor estarão de acordo com algum desses horários selecionados.
    v-row#days-section(justify='center')
      v-col.px-2(v-for='(day, i) in days' :key='i' cols='auto')
        v-card(@click='window = i' :ripple="false" :class='window === i ? "orange-outlined" : ""' outlined min-width='66px')
          v-badge(v-if='daysSelected[i].selected.length' bordered icon='mdi-check' overlap color='green' style='position: absolute; right: 9px; top: 9px;')
          v-row(justify='center')
            v-col.section-subtitle.pb-1(cols='auto' style='font-weight: 400' :style='window === i ? { color: "orange" } : {}') {{ day.name }}
          v-row(justify='center')
            v-col.font-weight-bold.pt-1(cols='auto' style='font-weight: 400')
              h3 {{ day.date }}
    v-row#hours-section(no-gutters)
      v-col.section-title.pb-0(cols='12') Agendamento
      v-col.section-subtitle.py-1(cols='12' style='font-weight: 400; color: red;') Selecione no mínimo 4 horários por dia
      v-row(no-gutters)
        v-col(cols='12')
          v-window.elevation-0(v-model='window')
            v-window-item(v-for='n in days.length' :key='n')
              v-row(v-if='i > 6 && i < 23' v-for='i in 24' :key='i' no-gutters justify='space-between' style='width: 100%;')
                v-col.section-subtitle.pb-1(cols='auto' align-self='center' style='font-weight: 400') {{ i - 1 }}:00 - {{ i }}:00
                v-col.section-subtitle.pb-1(cols='auto' align-self='center' style='font-weight: 400')
                  v-checkbox(v-model='daysSelected[n-1].selected' color='orange' style='margin-top: 0;' hide-details :value='i-1')
    v-row.mt-3
      v-divider
    v-row#confirm-section
      v-col(cols='12')
        v-btn(color='#ffa500' dark large block depressed rounded style='text-transform: none !important' @click="confirm()") Confirmar
      v-col(cols='12' align-self='center' style='text-align: center;')
        div.caption(style='display: inline-block;') Ao confirmar o agendamento, você declara que está concordando com os 
          span(style='color: #6E0AD6') Termos e Condições de Usado &nbsp;
          | da OLX Pay
</template>

<script>
import firebase from 'firebase'
export default {
  fiery: true,
  data () {
    return {
      days: [],
      daysSelected: [
        { date: null, selected: [] },
        { date: null, selected: [] }
      ],
      window: 0,
      produto: this.$fiery(firebase.firestore().collection("produtos").doc(this.$route.params.id))
    }
  },
  methods: {
    confirm () {
      try {
        this.$fires.produto.update({
          horasDisponiveisComprador: this.daysSelected
        })
      } catch (error) {
        console.log(error)

      }
      console.log() 
      this.$router.push('/esperacomprador/'+ this.$route.params.id)
    },
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
  mounted () {
    const currentDate = new Date(Date.now())
    const currentDate2 = new Date()
    let tomorrow = new Date(currentDate2)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const day = currentDate.getDay()
    const date = currentDate.getDate()
    const day2 = tomorrow.getDay()
    const date2 = tomorrow.getDate()
    this.daysSelected[0].date = currentDate2
    this.daysSelected[1].date = tomorrow
    this.days = [
      {
        active: false,
        name: 'Hoje',
        date: date
      },
      {
        active: false,
        name: this.numberToWeek(day2),
        date: date2
      }
    ]
  }
}
</script>

<style>
.orange-outlined {
  border: thin solid orange !important;
}
</style>