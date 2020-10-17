<template lang='pug'>
  v-app
    router-view
</template>

<script>
import HomeLayout from '@/components/HomeLayout';

export default {
  name: 'App',

  components: {
    HomeLayout,
  },

  data: () => ({
    //
  }),
};
</script>
