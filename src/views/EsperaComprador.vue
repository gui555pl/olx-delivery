<template lang='pug'>
    div
        BaseLayoutVue( :text="texto" :icon="icone")
        v-col(style="text-align:center;" )
            v-row(style="margin-top:10%; justify-content:center;" v-if="produto.status == 'aguardando_vendedor'")
                img(src="../imagens/relaxing.jpg" height="200px;" )
                h3(style="font-size:25px; color:#565656#; margin-top:20px; width:70%; ") Relaxa! Em breve você receberá opções de horários para sua entrega
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
            return 'Oba! O vendedor sugeriu Y horários'
        }
    },
    icone () {
        if (this.produto.status == 'aguardando_vendedor') {
            return 'mdi-timer-sand'
        } else if (this.produto.status == 'aguardando_comprador') {
            return 'mdi-clock-time-seven-outline'
        }
    }
}
}
</script>

<style>

</style>