<template lang='pug'>
  span#base-layout
    v-app-bar(app color="#6E0AD6" style='transition: 0.04s;' prominent flat shrink-on-scroll dark)
      v-btn(v-if='!$route.meta.notShowBack' icon style='position: absolute; left: 0; top: 0; margin: 4px 0 0 4px;')
        v-icon(@click='goBack()') mdi-arrow-left
      div(:style='textOpacityComputed' style='align-self: center !important; margin: auto; font-size: 80%; font-weight: 600; padding: 8px 0 0 0; text-align: center; maring-bottom: auto;') {{ $route.meta.baseText }} 
      .avatar-custom
        v-icon {{ $route.meta.baseIcon }}
    v-main(:style='isPendencias')
      router-view
</template>
// cordova plugin add cordova-plugin-customurlscheme --variable URL_SCHEME=com.olxdelivery.app --save
<script>
import { mapFields } from 'vuex-map-fields';
export default {
  name: 'BaseLayout',
  watch:{
    $route (to, from){
      this.$vuetify.goTo(0)
    }
  },
  computed: {
    headerHeight () {
      return this.$el.querySelector('header').style.height
    },
    textOpacityComputed () {
      console.log(this.scrollTop < 3)
      if (this.scrollTop < 3) {
        return { color: "rgba(255, 255, 255, 1" }
      } else {
        return { color: "rgba(255, 255, 255," + this.textOpacity + ")" }
      }
    },
    isPendencias () {
      if (this.$route.path === '/pendenciavendedor') {
        return {
          background: '#f0f0f0',
          'min-height': '100vh'
        }
      } else {
        return {}
      }
    }
  },
  data () {
    return {
      textOpacity: 100,
      scrollTop: 0
    }
  },
  methods: {
    updatedToolbarHeight (event) {
      this.scrollTop = document.documentElement.scrollTop
      const height = parseInt(this.$el.querySelector('header').style.height)
      const heightPercentage = (height/128)*100
      let op
      const hp = heightPercentage
      this.textOpacity = (1.77777778 * hp - 77.77777778)/100
      
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
};
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
  height: 48px;
  width: 48px;
  background: #FF8100;
}
</style>