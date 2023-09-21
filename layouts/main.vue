<template>
  <div class="container mx-auto">
    <headerComponent />
    <nuxt></nuxt>
    <!-- <footerComponent /> -->
  </div>
</template>

<script>
import Lenis from '@studio-freight/lenis'
export default {
  data() {
    return {
      lenis: null,
    }
  },

  mounted() {
    this.lenis = new Lenis()

    requestAnimationFrame(this.raf)
  },
  methods: {
    raf(time) {
      this.lenis.raf(time)
      requestAnimationFrame(this.raf)
    },
    goToSite() {
      sessionStorage.setItem('session', true)
      this.sessionCookie = sessionStorage.getItem('session')
    },
    goBackInHistory() {
      this.$router.go(-1)
    },
  },
}
</script>

<style>
</style>