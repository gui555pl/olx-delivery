<template lang='pug'>
    div
        BaseLayoutVue( :text="texto" icon="mdi-currency-usd")
        v-col(style="text-align:center;" )
            v-row(style="margin-top:10%; justify-content:center;")
                h3(style="font-size: 20px; color:#565656#; margin-top:20px; width:80%; ") Escolha pelo menos 4 horários para entregar seu produto ao coletor
</template>
<script>
import BaseLayoutVue from '../components/BaseLayout.vue'
import firebase from 'firebase'
export default {
    fiery: true,
    data () {
        return {
            produto: this.$fiery(firebase.firestore().collection("produtos").doc(this.$route.params.id))
        }
    },
    components:{
        BaseLayoutVue: BaseLayoutVue
    },
    computed: {
        texto () {
            return `Parabéns! Seu produto ${this.produto.descricao} foi vendido =)`
        }
    }
}
</script>