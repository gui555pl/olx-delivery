<template lang='pug'>
  span#home-layout
    v-app-bar(app color="#6E0AD6" dark)
      v-btn(icon)
        v-icon mdi-menu
      v-spacer
      v-btn(icon)
        v-icon mdi-magnify
      v-btn(icon)
        v-icon mdi-heart-outline
    v-main(style='background: #fafafa; min-height: 100vh;')
      zoom-center-transition(:duration="200" mode="out-in")
        router-view
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>