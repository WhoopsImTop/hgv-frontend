<template>
  <div>
    <div class="header flex justify-between items-center py-4">
      <div class="logo">
        <h1 class="font-sans text-hgv-950 text-4xl font-bold">HGV</h1>
      </div>
      <div class="hidden md:block link-container">
        <nuxt-link
          class="font-sans text-hgv-950 mx-2 hover:no-underline hover:text-hgv-600"
          :to="LocalizePath('/')"
          >Gästeführer</nuxt-link
        >
        <nuxt-link
          class="font-sans text-hgv-950 mx-2 hover:no-underline hover:text-hgv-600"
          :to="LocalizePath('/')"
          >Führungen</nuxt-link
        >
        <nuxt-link
          class="font-sans text-hgv-950 mx-2 hover:no-underline hover:text-hgv-600"
          :to="LocalizePath('/')"
          >Über Uns</nuxt-link
        >
        <nuxt-link
          class="font-sans text-hgv-950 mx-2 hover:no-underline hover:text-hgv-600"
          :to="LocalizePath('/')"
          >Honorare</nuxt-link
        >
        <nuxt-link
          class="font-sans text-hgv-950 mx-2 mr-4 hover:no-underline hover:text-hgv-600"
          :to="LocalizePath('/')"
          >Kontakt</nuxt-link
        >
        <nuxt-link
          class="font-sans text-white px-4 py-2 rounded bg-hgv-950 hover:no-underline hover:bg-hgv-600"
          :to="LocalizePath('/')"
          >Mitglied werden</nuxt-link
        >
      </div>
      <div class="md:hidden flex flex-col" @click="toggleMobileMenu">
        <div class="w-6 h-0.5 bg-hgv-950 my-0.5"></div>
        <div class="w-6 h-0.5 bg-hgv-950 my-0.5"></div>
        <div class="w-6 h-0.5 bg-hgv-950 my-0.5"></div>
      </div>
    </div>
    <div :class="mobileMenuOpen ? 'flex' : 'hidden'" class="flex-col justify-center md:hidden link-container h-[calc(100vh-88px)]">
      <nuxt-link
        class="font-sans text-center text-hgv-950 my-4 hover:no-underline hover:text-hgv-600"
        :to="LocalizePath('/')"
        >Gästeführer</nuxt-link
      >
      <nuxt-link
        class="font-sans text-center text-hgv-950 my-4 hover:no-underline hover:text-hgv-600"
        :to="LocalizePath('/')"
        >Führungen</nuxt-link
      >
      <nuxt-link
        class="font-sans text-center text-hgv-950 my-4 hover:no-underline hover:text-hgv-600"
        :to="LocalizePath('/')"
        >Über Uns</nuxt-link
      >
      <nuxt-link
        class="font-sans text-center text-hgv-950 my-4 hover:no-underline hover:text-hgv-600"
        :to="LocalizePath('/')"
        >Honorare</nuxt-link
      >
      <nuxt-link
        class="font-sans text-center text-hgv-950 my-4 hover:no-underline hover:text-hgv-600"
        :to="LocalizePath('/')"
        >Kontakt</nuxt-link
      >
      <nuxt-link
        class="font-sans text-center text-hgv-950 my-4 hover:no-underline hover:text-hgv-600"
        :to="LocalizePath('/')"
        >Mitglied werden</nuxt-link
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobileMenuOpen: false,
    }
  },

  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    LocalizePath(path) {
      return `/${this.$i18n.locale}${path}`
    },
    goToFAQS(path, anchor) {
      this.$router.push(path)
      setTimeout(() => {
        document.querySelector(anchor).scrollIntoView({
          behavior: 'smooth',
        })
      }, 100)
    },
  },
}
</script>

<style>
</style>