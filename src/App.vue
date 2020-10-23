<template lang='pug'>
  v-app
    transition (name="")
      router-view()

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
  watch: {
  '$route' (to, from) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  }
}
};
</script>
