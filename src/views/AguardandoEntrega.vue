<template lang='pug'>
  v-container(style='height: calc(100vh - 129px)')
    #insert-code-section.mt-3
      .grey--text.body-2.font-weight-light.pb-0(style='width: 100%') Insira abaixo o código de confirmação da compra dito pelo comprador:
      div(style='flex-grow: 1;')
        input(maxlength='4' pattern="[0-9]+")
      #confirm-section.pb-3(style='width: 100%;')
          v-btn(color='#ffa500' dark large block depressed rounded style='text-transform: none !important' @click="confirm()") Confirmar
    v-row
      v-divider
</template>

<script>
import firebase from 'firebase'
export default {
  fiery: true,
  data () {
    return {
      window: 0,
      days: [],
      daysMatched: [
        { date: null, selected: [] },
        { date: null, selected: [] }
      ],
      produto: this.$fiery(firebase.firestore().collection("produtos").doc(this.$route.params.id))
    }
  },
  methods: {
    confirm () {
      try {
        this.$fires.produto.update({
          horasCorrespondidas: this.daysMatched
        })
        this.$router.push(`/buying/match/${this.$route.params.id}`)
      } catch (error) {
        console.log(error)
      }
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
  async mounted () {
    this.$fiery(firebase.firestore().collection("produtos").doc(this.$route.params.id), {
      onSuccess: (produto) => {
        this.daysMatched[0].date = produto.horasDisponiveisComprador[0].date
        this.daysMatched[1].date = produto.horasDisponiveisComprador[1].date
        let hoursPossible = produto.horasDisponiveisComprador
        hoursPossible = hoursPossible.map(horas => {
          horas.selected.sort(function(a, b) {
            return a - b
          })
          return horas
        })
        const day = hoursPossible[0].date.toDate().getDay()
        const date = hoursPossible[0].date.toDate().getDate()
        const day2 = hoursPossible[1].date.toDate().getDay()
        const date2 = hoursPossible[1].date.toDate().getDate()
        this.days = [
          {
            active: false,
            name: this.numberToWeek(day),
            date: date,
            selected: produto.horasDisponiveisComprador[0].selected
          },
          {
            active: false,
            name: this.numberToWeek(day2),
            date: date2,
            selected: produto.horasDisponiveisComprador[1].selected
          }
        ]  
      } 
    })
  }
}
</script>

<style lang='scss'>
#insert-code-section {
  display: flex;
  flex-flow: column;
  height: 100%;
  justify-content: center;
}
.orange-outlined {
	border: thin solid orange !important;
}
// input {
// 	&::-webkit-outer-spin-button {
// 		-webkit-appearance: none;
// 		margin: 0;
// 	}
// 	&::-webkit-inner-spin-button {
// 		-webkit-appearance: none;
// 		margin: 0;
// 	}
// }
// input[type=number] {
// 	-moz-appearance: textfield;
// }

$char-w: 1ch;
$gap: 0.5 * $char-w;
$n-char: 4;
$in-w: $n-char * ($char-w + $gap);

#insert-code-section input {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
	display: block;
	margin: auto;
	border: none;
	padding: 0;
	width: $in-w;
	background: repeating-linear-gradient(
			90deg,
			dimgrey 0,
			dimgrey $char-w,
			transparent 0,
			transparent $char-w + $gap
		)
		0 100% / #{$in-w - $gap} 2px no-repeat;
	font: 5ch Roboto;
	letter-spacing: $gap;

	&:focus {
		outline: none;
		color: dodgerblue;
	}
}


</style>