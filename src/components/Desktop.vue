<template>
  <div
    id="screen"
    :style="{ backgroundImage: `url(${wallpaper})` }"
  >

    <Window
      v-for="(window, i) in windows"
      :title="window.title"
      :src="window.src"
      :initialX="i * 40"
      :initialY="i * 40"
      :zIndex="window.order"
      @focus="focus(i)"
    ></Window>
  </div>

</template>

<script>
import options from '../services/options.js';
import Window from './Window.vue';

export default {
  name: "Desktop",

  components: {
    Window,
  },

  data() {
    return {
      wallpaper: options.wallpaper,
      windows: [
        { title: "Test Window #1", src: "", order: 1 },
        { title: "Test Window #2", src: "", order: 2 },
      ],
    };
  },

  methods: {
    focus(index) {
      const currOrder = this.windows[index].order;
      const topOrder = this.windows.length;
      this.windows.forEach((window, i) => {
        if (window.order > currOrder) {
          window.order--;
        }
      });
      this.windows[index].order = topOrder;
    },
  },
}
</script>

<style scoped>
</style>
