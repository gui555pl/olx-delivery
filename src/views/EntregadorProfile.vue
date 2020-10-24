<template lang='pug'>
  span#base-layout
    v-app-bar(app color="#6E0AD6" height='200' style='transition: 0.04s;' prominent flat shrink-on-scroll dark)
      v-btn(icon style='position: absolute; left: 0; top: 0; margin: 4px 0 0 4px;')
        v-icon(@click='goBack()') mdi-arrow-left
      div(:style='textOpacityComputed' style='align-self: center !important; margin: auto; font-size: 80%; font-weight: 600; padding: 8px 0 0 0; text-align: center; maring-bottom: auto;') Perfil do Entregador
      .avatar-custom(:style='avatarDimensions')
        img(:style='{ height: `${side/2}px`, width: `${this.side/2}px`}' src='@/imagens/account-circle.png')
    v-main
      v-container(style='padding-top: 75px;')
        v-row#user-name-section
          v-col
            h2.text-center(style='font-weight: 500; color: #6E0AD6') {{ user.name }}
        v-row#profile-info-section
            v-col.pb-0(cols='4')
                span.section-title Viagens
                div.text-center.font-weight-bold(style='line-height: 2; font-size: 2em') 1574
            v-col.pb-0(cols='4')
                span.section-title Avaliação
                div.text-center.pt-2
                    div.font-weight-bold(style='font-size: 1.5em; line-height: 0.8;') {{ rating }}
                    v-rating(v-model='rating' background-color='white' color='yellow accent-4' small dense readonly half-increments size='18')
            v-col.pb-0(cols='4')
                span.section-title Tempo
                div.text-center.font-weight-bold(style='line-height: 2;')
                    span(style='font-size: 2em') 2
                    span(style='font-size: 1.2em !important; font-weight: 400') &nbsp;meses
        v-divider.mb-2
        v-row#language-section(no-gutters)
          v-row.pt-2.pb-0(justify='space-between')
            v-col.pb-0.section-title(cols='12')
              | Idioma
          v-row(style='width: 100%;')
            v-col.pt-1(cols='auto')
              v-avatar(color='#3F51B530' size='36')
                v-icon(small color='#3F51B5') mdi-web
            v-col.pt-1.pl-0(align-self='center')
              v-col.section-subtitle.pa-0(cols='12' style='font-size: 1rem !important; color: #3F51B5') Português
        v-row
          v-divider
        v-row#place-section(no-gutters)
          v-row.pb-0(justify='space-between')
            v-col.pb-0.section-title(cols='12')
              | Localização
          v-row(style='width: 100%;')
            v-col.pt-1(cols='auto')
              v-avatar(color='#00800030' size='36')
                v-icon(small color='#008000') mdi-map-marker
            v-col.pt-1.pl-0(align-self='center')
              v-col.section-subtitle.pa-0(cols='12' style='font-size: 1rem !important; color: #008000') Recife
        v-row
          v-divider
        v-row#attr-section(no-gutters)
          v-row.pb-0(justify='space-between')
            v-col.pb-0.section-title(cols='12')
              | Qualidade
          v-row(style='width: 100%;')
            v-col.pt-1(cols='auto')
              v-avatar(color='#ffa50030' size='36')
                v-icon(small color='#ffa500') mdi-emoticon-excited-outline
            v-col.pt-1.pl-0(align-self='center')
              v-col.section-subtitle.pa-0(cols='12' style='font-size: 1rem !important; color: #ffa500') Entrega rápido
        v-row
          v-divider
        v-row#attr-section(no-gutters)
          v-row.pb-0(justify='space-between')
            v-col.pb-0.section-title(cols='12')
              | Comentários
          v-row(style='width: 100%;')
            v-col.pt-1(cols='auto')
              v-avatar(color='#6E0AD630' size='36')
                v-icon(small color='#6E0AD6') mdi-message-outline
            v-col.pt-1.pl-0(align-self='center')
              v-col.caption.pa-0(cols='12') "Entrega rápida e no prazo! Produto veio 100%"
          v-row(style='width: 100%;')
            v-col.pt-1(cols='auto')
              v-avatar(color='#6E0AD630' size='36')
                v-icon(small color='#6E0AD6') mdi-message-outline
            v-col.pt-1.pl-0(align-self='center')
              v-col.caption.pa-0(cols='12') "Rápido e barato, 5 estrelas"
          v-row(style='width: 100%;')
            v-col.pt-1(cols='auto')
              v-avatar(color='#6E0AD630' size='36')
                v-icon(small color='#6E0AD6') mdi-message-outline
            v-col.pt-1.pl-0(align-self='center')
              v-col.caption.pa-0(cols='12') "Tive problema na entrega padrão, foi só escolher a entrega OLX Delivery que chegou rapidinho! {{ user.name }} é muito atencioso"
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import firebase from 'firebase'
export default {
  name: 'EntregadorProfile',
  fiery: true,
  watch:{
    $route (to, from){
      this.$vuetify.goTo(0)
    }
  },
  computed: {
    textOpacityComputed () {
      console.log(this.scrollTop < 3)
      if (this.scrollTop < 3) {
        return { color: "rgba(255, 255, 255, 1" }
      } else {
        return { color: "rgba(255, 255, 255," + this.textOpacity + ")" }
      }
    },
    avatarDimensions () {
      console.log('tá aqui?')
      if (this.scrollTop < 3) {
        return {
          height: `150px`,
          width: `150px`,
          bottom: `-75px`
        }
      } else {
        return {
          height: `${this.side}px`,
          width: `${this.side}px`,
          bottom: `-${this.side/2}px`    
        }
      }
    }
  },
  data () {
    return {
      textOpacity: 100,
      scrollTop: 0,
      user: this.$fiery(firebase.firestore().collection("users").doc(this.$store.getters.user.email)),
      side: 150,
      rating: 4.3
    }
  },
  methods: {
    updatedToolbarHeight (event) {
      this.scrollTop = document.documentElement.scrollTop
      const height = parseInt(this.$el.querySelector('header').style.height)
      const heightPercentage = (height/200)*100
      let op
      const hp = heightPercentage
      this.textOpacity = (1.77777778 * hp - 77.77777778)/100
      console.log(height)
      const a = 0.70833
      const b = 8.3333
      this.side = a*height + b
    },
    goBack () {
      if (this.$route.name === 'Parabens') {
        this.$router.push('/home')
      } else {
        this.$router.go(-1)
      }
    }
  },
  created () {
    window.addEventListener('scroll', this.updatedToolbarHeight);
  },
  destroyed () {
    window.removeEventListener('scroll', this.updatedToolbarHeight);
  },
}
</script>

<style>
#base-layout > .v-toolbar__content {
  flex-direction: column !important;
}
.avatar-custom {
  position: absolute;
  bottom: -24px;
  left: 50%;
  transform: translate(-50%, 0);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  vertical-align: middle;
  border-radius: 50%;
  border: 2px solid white;
  background: #FF8100;
  transition: 0.04s;
}
</style>