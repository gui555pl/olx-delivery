<template lang='pug'>
  span
    v-app-bar(app color="#6E0AD6" prominent flat shrink-on-scroll dark)
      v-btn(icon style='position: absolute; left: 0; top: 0; margin: 4px 0 0 4px;')
        v-icon(@click='$router.go(-1)') mdi-arrow-left
      div(:style='{ color: "rgba(255, 255, 255," + textOpacity + ")" }' style='align-self: center !important; margin: auto; font-size: 80%; font-weight: 600; padding: 8px 0 0 0; text-align: center; margin-bottom: 24px;') {{ text }} 
      .avatar-custom
        v-icon {{ icon }}
    v-main
      zoom-center-transition(:duration="200" mode="out-in")
        router-view
</template>

<script>
export default {
  name: 'BaseLayout',
  props: {
    icon: {
      type: String,
      default: "mdi-file-document-outline"
    },
    text: {
      type: String,
      default: "Por favor, confirme os dados seguintes para finalizar sua compra"
    }
  },
  computed: {
    headerHeight () {
      return this.$el.querySelector('header').style.height
    }
  },
  data () {
    return {
      heightPercentage: 100,
      textOpacity: 100,
    }
  },
  methods: {
    updatedToolbarHeight (event) {
      const height = parseInt(this.$el.querySelector('header').style.height)
      this.heightPercentage = (height/128)*100
      let op
      const F = this.heightPercentage
      this.textOpacity = (1.77777778 * F - 77.77777778)/100
      
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
.v-toolbar__content {
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
  background: orange;
}
</style>