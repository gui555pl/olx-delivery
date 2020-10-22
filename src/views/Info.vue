<template lang="pug">
    v-container
        v-row#delivery-section.mt-4(no-gutters)
            v-col.section-title.pb-0(cols='12')
                | Ponto de coleta
            v-row
                v-col(cols='auto')
                    v-avatar(color='#6E0AD630' size='36')
                        v-icon(small color='#6E0AD6') mdi-package-variant-closed
                v-col.pl-0
                    v-col.section-subtitle.pa-0(cols='12') Rua Dom José Lopes, 955, ap. 204
                    v-col.grey--text.body-2.font-weight-light.pa-0(cols='12' style='font-size: 0.7rem !important; line-height: 1.5;') Boa Viagem, Recife - PE
        v-row#delivery-section.mt-4(no-gutters)
            v-col.section-title.pb-0(cols='12')
                | Ponto de entrega
            v-row
                v-col(cols='auto')
                    v-avatar(color='#6E0AD630' size='36')
                        v-icon(small color='#6E0AD6') mdi-package-variant
                v-col.pl-0
                    v-col.section-subtitle.pa-0(cols='12') Rua Tenente Domingos de Brito, 393
                    v-col.grey--text.body-2.font-weight-light.pa-0(cols='12' style='font-size: 0.7rem !important; line-height: 1.5;') Boa Viagem, Recife - PE
        v-row#delivery-section.mt-4(no-gutters)
            v-col.section-title.pb-0(cols='12')
                | Tempo adicional
            v-row
                v-col(cols='auto')
                    v-avatar(color='#ffa50030' size='36')
                        v-icon(small color='#ffa500') mdi-alarm-plus
                v-col.pl-0(align-self='center')
                    div.section-subtitle(cols='12' style='line-height: 20px;') +12 min ao seu trajeto
        v-row#delivery-section.mt-4(no-gutters)
            v-col.section-title.pb-0(cols='12')
                | Você recebe
            v-row
                v-col(cols='auto')
                    v-avatar(color='#00800030' size='48')
                        v-icon(color='#008000') mdi-cash-multiple
                v-col.pl-0(align-self='center')
                    v-col.section-subtitle.pa-0(cols='12' align-self="center" style='font-size: 1.5rem !important; color: #008000') R$ 15,52
        v-row#confirm-section(justify="center" align="end" style="margin-top:10%;" no-gutters)
            v-col(cols='8' )
                v-btn(color='#ffa500' dark large block depressed rounded style='text-transform: none !important ' @click="changeStatus()") {{btnText}}
        

</template>

<script>
import firebase from 'firebase'
export default {
    fiery: true,
    data () {
        return {
            produto: this.$fiery(firebase.firestore().collection("produtos").doc(this.$route.params.id)),
            btnText:"Carregando status...",
            user: this.$fiery(firebase.firestore().collection("users").doc(this.$store.getters.user.email)),
            precoTrajeto:15.52
        }
    },
    methods: {
        changeStatus(){
             if (this.produto.status == 'aguardando_entregador') {
                this.$fires.produto.update({
                    status: 'aguardando_coleta'
                })
            }
            else if(this.produto.status =='aguardando_coleta'){
                this.$fires.produto.update({
                    status: 'aguardando_entrega'
                })
            }
            else{
              this.precoTrajeto= this.user.saldo + this.precoTrajeto
                this.$fires.user.update({
                    saldo: this.precoTrajeto
                })
                this.$router.push('/parabens/'+this.$route.params.id)
            }

        }
    },
    async mounted(){
      this.$fiery(firebase.firestore().collection("produtos").doc(this.$route.params.id), {
      onSuccess: (produto) => {
          if (this.produto.status == 'aguardando_entregador') {
                this.btnText =  `Aceitar entrega`
            } else if (this.produto.status == 'aguardando_coleta') {
                this.btnText = `Confirmar coleta`
            } else if (this.produto.status == 'aguardando_entrega') {
                this.btnText = `Confirmar entrega`
            }
      }
      })
    },
    computed: {
    },
    created(){
    }
}
</script>