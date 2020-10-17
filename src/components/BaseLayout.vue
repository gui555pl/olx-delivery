<template lang='pug'>
  span
    v-app-bar(app color="#6E0AD6" prominent flat shrink-on-scroll dark)
      v-btn(icon style='position: absolute; left: 0; top: 0; margin: 4px 0 0 4px;')
        v-icon mdi-arrow-left
      div(style='align-self: center !important; margin: auto; font-size: 80%; font-weight: 600; padding: 8px 0 0 0; text-align: center;') Por favor, confirme os dados seguintes para finalizar sua compra 
      //- v-row a
      //- div(style='left: 0; bottom: 20px; padding: 0 16px;') Por favor seu lixo Por favor seu lixoa Por favor seu lixo Por favor seu lixoa Por favor seu lixo Por favor seu lixoa 
    v-main
      zoom-center-transition(:duration="200" mode="out-in")
        router-view
</template>

<script>
export default {
  name: 'BaseLayout',
  computed: {
    headerHeight () {
      return this.$el.querySelector('header').style.height
    },
    textOpacity () {
      let op
      const F = this.heightPercentage
      // op = (result - 43.75 / 100 - 43.75) = (F/ 100) 
    }
  },
  data () {
    return {
      heightPercentage: 100
    } 
  },
  methods: {
    updatedToolbarHeight (event) {
      const height = parseInt(this.$el.querySelector('header').style.height)
      this.heightPercentage = (height/128)*100
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
</style>