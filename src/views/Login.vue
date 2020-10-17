<template lang="pug">
    v-text-field(
        v-model="login.email",
        label="E-mail",
        type="email",
        required,
        dark,
        hide-details,
        style="margin-bottom: 15px"
        )
</template>

<script>
export default {
  name: "login",
  data() {
    return {};
  },
  methods: {},
};
</script>


