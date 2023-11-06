<template>
  <div :style="randomBG" class="px-2 py-1 rounded mr-2 mb-2">
    <p class="font-sans">{{ language }}</p>
  </div>
</template>

<script>
export default {
  props: {
    language: {
      type: String,
      default: 'de',
    },
  },
  computed: {
    randomBG() {
      const r = (Math.round(Math.random() * 127) + 127).toString(16)
      const g = (Math.round(Math.random() * 127) + 127).toString(16)
      const b = (Math.round(Math.random() * 127) + 127).toString(16)
      const color = '#' + r + g + b
      return {
        backgroundColor: color,
        color: '#000000',
      }
    },
  },
}
</script>

<style></style>
>
