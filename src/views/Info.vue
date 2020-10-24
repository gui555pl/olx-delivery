<template lang="pug">
    v-container(style='min-height: calc(100vh - 128px); position: relative;')
        v-row#delivery-section.mt-4(no-gutters)
            v-col.mb-4(cols='12' align-self='center' style='text-align: center;')
                div.caption(style='display: inline-block;') Essas são as informações detalhadas da sua entrega! Confirme com atenção os&nbsp;
                    span(style='color: #6E0AD6') endereços de coleta e de entrega. &nbsp;
            v-col.section-title.pb-0(cols='12')
                | Ponto de Coleta
            v-row
                v-col(cols='auto')
                    v-avatar(color='#6E0AD630' size='36')
                        v-icon(small color='#6E0AD6') mdi-package-variant-closed
                v-col.pl-0
                    v-col.section-subtitle.pa-0(cols='12') {{ produto.endereco.name.split('-')[0] }}
                    v-col.grey--text.body-2.font-weight-light.pa-0(cols='12' style='font-size: 0.7rem !important; line-height: 1.5;') {{ produto.endereco.name.split('-')[1] + '-' + produto.endereco.name.split('-')[2] }}
        v-row#delivery-section.mt-4(no-gutters)
            v-col.section-title.pb-0(cols='12')
                | Ponto de Entrega
            v-row
                v-col(cols='auto')
                    v-avatar(color='#6E0AD630' size='36')
                        v-icon(small color='#6E0AD6') mdi-package-variant
                v-col.pl-0
                    v-col.section-subtitle.pa-0(cols='12') Rua Tenente Domingos de Brito, 393
                    v-col.grey--text.body-2.font-weight-light.pa-0(cols='12' style='font-size: 0.7rem !important; line-height: 1.5;') Boa Viagem, Recife - PE
        v-row#delivery-section.mt-4.mb-2(no-gutters)
            v-col.section-title.pb-0(cols='12')
                | Tempo Adicional
            v-row
                v-col(cols='auto')
                    v-avatar(color='#ffa50030' size='36')
                        v-icon(small color='#ffa500') mdi-alarm-plus
                v-col.pl-0(align-self='center')
                    div.section-subtitle(cols='12' style='line-height: 20px;') +{{simulatePrazo(produto.frete)}} min ao seu trajeto
        v-divider
        v-row#delivery-section.mt-4(no-gutters)
            v-col.section-title.pb-0(cols='12')
                h2(style='font-weight: 500;') Você recebe
            v-row
                v-col(cols='auto')
                    v-avatar(color='#00800030' size='48')
                        v-icon(color='#008000') mdi-cash-multiple
                v-col.pl-0(align-self='center')
                    v-col.section-subtitle.pa-0(cols='12' align-self="center" style='font-size: 1.5rem !important; color: #008000') R$ {{precoTrajeto.toString().replace('.', ',') }}
        v-row#confirm-section.mt-4(justify="center" align="end" no-gutters)
            v-col(cols='12')
                v-btn(color='#ffa500' dark large block depressed rounded style='text-transform: none !important ' @click="changeStatus()") {{btnText}}
        v-fab-transition
            v-btn(v-show='produto.status !== "aguardando_entregador"' color='blue' dark style='position: fixed; bottom: 20px; right: 12px;' fab)
                v-icon mdi-chat
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
                this.$router.push('/aguardando-entrega/'+this.$route.params.id)
            }
            else{
                var aux = null;
                
                if(this.precoTrajeto){
                    aux = this.precoTrajeto
                }
                else{
                    aux= 12
                }
                    var novoSaldo= this.user.saldo + aux
                    this.$fires.user.update({
                        saldo: novoSaldo
                    })
                    this.$router.push('/parabens/'+this.$route.params.id)
                
            }

        },
        simulatePrazo (frete) {
            const a = 5, b = -45
            return Math.floor(a*frete + b)
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
        precoTrajeto(){
            return parseFloat((this.produto.frete*0.8).toFixed(2))
        }
    },
    created(){
    }
}
</script>