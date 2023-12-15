<template>
  <div
    id="window"
    :style="{ width: `${width}px`, height: `${height}px`, borderColor: options.theme.borderColor, top: `${y}px`, left: `${x}px`, zIndex: zIndex }"
  >
    <div
      class="toolbar"
      :style="{ backgroundColor: options.theme.borderColor, width: `${width}px`, cursor: (action.dragging) ? 'move' : 'grab' }"
      @mousedown.prevent="startDrag"
    >
      <p id="title">{{ title }}</p>
    </div>
    <div
      class="background"
      :style="{ backgroundColor: options.theme.backgroundColor, height: `${height - 28}px` }"
    >
      <div
        class="resize bottom"
        :style="{ backgroundColor: options.theme.borderColor }"
        @mousedown.prevent="ev => startResize(ev, 'bottom')"
      ></div>
      <div
        class="resize left"
        :style="{ backgroundColor: options.theme.borderColor }"
        @mousedown.prevent="ev => startResize(ev, 'left')"
      ></div>
      <div
        class="resize right"
        :style="{ backgroundColor: options.theme.borderColor }"
        @mousedown.prevent="ev => startResize(ev, 'right')"
      ></div>
      <iframe
        class="view"
        :style="{ pointerEvents: (action.resizing) ? 'none' : 'auto'}"
        :src="src"
      ></iframe>
    </div>
  </div>
</template>

<script>
import options from '../services/options.js';

export default {
  name: "Window",

  props: {
    title: {
      type: String,
      default: "Window",
    },
    src: {
      type: URL,
      default: null,
    },
    initialWidth: {
      type: Number,
      default: 800,
    },
    initialHeight: {
      type: Number,
      default: 400,
    },
    initialX: {
      type: Number,
      default: 0,
    },
    initialY: {
      type: Number,
      default: 0,
    },
    zIndex: {
      type: Number,
      default: false,
    },
  },

  data()  {
    return {
      options,
      x: this.initialX,
      y: this.initialY,
      width: this.initialWidth,
      height: this.initialHeight,
      action: {
        dragging: false,
        resizing: false,
        direction: null,
        mouseX: null,
        mouseY: null,
      }
    };
  },

  methods: {
    startDrag(ev) {
      this.action.dragging = true;
      this.action.mouseX = ev.clientX;
      this.action.mouseY = ev.clientY;
      window.addEventListener("mousemove", this.drag);
      window.addEventListener("mouseup", this.stopDrag, { once: true });
      // NOTE: parent is responsible for focus / blur.
      this.$emit('focus');
    },

    startResize(ev, edge) {
      this.action.resizing = true;
      this.action.direction = edge;
      this.action.mouseX = ev.clientX;
      this.action.mouseY = ev.clientY;
      window.addEventListener("mousemove", this.resize);
      window.addEventListener("mouseup", this.stopResize, { once: true });
    },

    drag(ev) {
      console.log("dragging")
      this.x += ev.clientX - this.action.mouseX;
      this.y += ev.clientY - this.action.mouseY;
      this.action.mouseX = ev.clientX;
      this.action.mouseY = ev.clientY;
    },

    resize(ev) {
      console.log("resizing", this.action.direction);
      const x = ev.clientX - this.action.mouseX;
      const y = ev.clientY - this.action.mouseY;
      this.action.mouseX = ev.clientX;
      this.action.mouseY = ev.clientY;

      switch (this.action.direction) {
        case "bottom":
          this.height += y;
          break;
        case "left":
          this.x += x;
          this.width -= x;
          break;
        case "right":
          const amount = ev.clientX - this.action.mouseX;
          this.width += x;
          break;
      }
    },

    stopDrag(ev) {
      this.action.dragging = false;
      window.removeEventListener("mousemove", this.drag);
    },

    stopResize(ev) {
      this.action.resizing = false;
      this.action.direction = null;
      window.removeEventListener("mousemove", this.resize);
    },
  },
}
</script>

<style scoped>
#window {
  position: absolute;
}

.resize {
  position: absolute;
}

.bottom {
  height: 4px;
  width: 100%;
  left: 0;
  bottom: 0;
  cursor: ns-resize;
}

.left {
  height: 100%;
  width: 4px;
  left: 0;
  bottom: 0;
  cursor: ew-resize;
}

.right {
  height: 100%;
  width: 4px;
  right: 0;
  bottom: 0;
  cursor: ew-resize;
}

.toolbar {
  height: 24px;
  text-align: left;
}

#title {
  margin: 0px;
  padding-top: 3px;
  padding-left: 4px;
  font-weight: bold;
  width: 100%;
  overflow: hidden;
}

.background {
  position: absolute;
  width: 100%;
}

.view {
  border: 0px;
  width: 100%;
  height: 100%;
}
</style>
