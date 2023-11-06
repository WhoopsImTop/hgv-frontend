<template>
  <div>
    <div class="container mx-auto">
      <headerComponent />
      <nuxt></nuxt>
    </div>
    <footerComponent />
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
a {
  @apply text-hgv-950 hover:text-hgv-950;
}

h1 {
  @apply text-4xl font-sans font-bold text-hgv-950;
}

h2 {
  @apply text-3xl font-sans font-bold text-hgv-950;
}

h3 {
  @apply text-2xl font-sans font-bold text-hgv-950;
}

h4 {
  @apply text-xl font-sans font-bold text-hgv-950;
}

h5 {
  @apply text-lg font-sans font-bold text-hgv-950;
}
</style>
