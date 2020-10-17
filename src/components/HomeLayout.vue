<template lang='pug'>
  v-app-bar(app color="#6E0AD6" dark)
    v-btn(icon)
      v-icon mdi-menu
    v-spacer
    v-btn(icon)
      v-icon mdi-magnify
    v-btn(icon)
      v-icon mdi-heart-outline
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>