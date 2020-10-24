<template lang='pug'>
  span#base-layout
    v-app-bar(app color="#6E0AD6" height='200' style='transition: 0.04s;' prominent flat shrink-on-scroll dark)
      v-btn(icon style='position: absolute; left: 0; top: 0; margin: 4px 0 0 4px;')
        v-icon(@click='goBack()') mdi-arrow-left
      div(:style='textOpacityComputed' style='align-self: center !important; margin: auto; font-size: 80%; font-weight: 600; padding: 8px 0 0 0; text-align: center; maring-bottom: auto;') {{ user.name }}
      .avatar-custom(:style='avatarDimensions')
        img(:style='{ height: `${side/1.75}px`, width: `${this.side/1.75}px`}' src='@/imagens/account-circle.png')
    v-container(style='background: #f0f0f0')
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
      div a
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
      side: 150
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