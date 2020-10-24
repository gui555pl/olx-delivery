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
  computed: {
    precoTrajeto(){
      return parseFloat((this.produto.frete*0.8).toFixed(2))
    }
  },
  data () {
    return {
      produto: this.$fiery(firebase.firestore().collection("produtos").doc(this.$route.params.id)),
      user: this.$fiery(firebase.firestore().collection("users").doc(this.$store.getters.user.email)),
    }
  },
  methods: {
    confirm () {
      try {
        this.$fires.produto.update({
          status: 'entregue'
        })
        const novoSaldo= this.user.saldo + this.precoTrajeto
        this.$fires.user.update({
          saldo: novoSaldo
        })
        this.$router.push(`/parabens/${this.$route.params.id}`)
      } catch (error) {
        console.log(error)
      }
    }
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