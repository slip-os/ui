<template>
  <Desktop></Desktop>
</template>

<script>
import config from "./config.json";
import Desktop from "./components/Desktop.vue";

export default {
  name: "App",

  components: {
    Desktop,
  },
}
</script>

<style scoped>
#screen {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}
</style>
