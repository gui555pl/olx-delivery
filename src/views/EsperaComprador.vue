<template lang='pug'>
    div(style='display: flex; margin: 0 auto; flex-direction: column; height: calc(100vh - 150px); overflow: hidden;')
        div(style='flex-grow: 1;')
            v-row(style="justify-content:center; height: 100%;" v-if="produto.status == 'aguardando_vendedor'")
                v-col(cols='12' align-self='center')
                    v-row(style="justify-content:center;")
                        img(src="../imagens/relaxing.jpg" height="200px;" )
                        h3(style="font-size:25px; color:#565656#; margin-top:20px; width:70%; text-align: center;") Relaxa! Em breve você receberá seu horário de entrega...
        div#confirm-section
            v-col(cols='12')
                v-btn(color='#ffa500' dark large block depressed rounded style='text-transform: none !important' @click="$router.push('/home')") OK
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
            if (this.produto.status == 'aguardando_vendedor') {
                return 'Esperando retorno do vendedor'
            } else if(this.produto.status == 'aguardando_comprador'){
                return 'Selecione ao menos quatro possibilidades de horários para receber o produto'
            }
        },
        icone () {
            if (this.produto.status == 'aguardando_vendedor') {
                return 'mdi-timer-sand'
            } else if (this.produto.status == 'aguardando_comprador') {
                return 'mdi-clock-time-seven-outline'
            }
        }
    },
    mounted () {
        this.$vuetify
    }
}
</script>

<style>

</style>