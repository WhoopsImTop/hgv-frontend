<template>
  <div class="sticky top-0 z-10">
    <div class="header bg-white z-10 flex justify-between items-center py-4">
      <div class="logo h-14">
        <nuxt-link to="/" class="text-decoration-none">
          <img
            src="../assets/logo.svg"
            alt="Hamburger Gästeführer e.V."
            style="height: 100%"
          />
        </nuxt-link>
      </div>
      <div class="hidden md:flex link-container items-center">
        <nuxt-link
          class="font-sans text-hgv-950 mx-2.5 hover:no-underline hover:text-hgv_red-700"
          :to="LocalizePath('/guides')"
          >{{ $i18n.locale === 'de' ? 'Gästeführer' : 'Guides' }}</nuxt-link
        >
        <nuxt-link
          class="font-sans text-hgv-950 mx-2.5 hover:no-underline hover:text-hgv_red-700"
          :to="LocalizePath('/tour')"
          >{{ $i18n.locale === 'de' ? 'Führungen' : 'Tours' }}</nuxt-link
        >
        <nuxt-link
          class="font-sans text-hgv-950 mx-2.5 hover:no-underline hover:text-hgv_red-700"
          :to="LocalizePath('/about')"
          >{{ $i18n.locale === 'de' ? 'Über Uns' : 'About us' }}</nuxt-link
        >
        <nuxt-link
          class="font-sans text-hgv-950 mx-2.5 hover:no-underline hover:text-hgv_red-700"
          :to="LocalizePath('/fees')"
          >{{ $i18n.locale === 'de' ? 'Honorare' : 'Fees' }}</nuxt-link
        >
        <nuxt-link
          class="font-sans text-hgv-950 mx-2.5 mr-3 hover:no-underline hover:text-hgv_red-700"
          :to="LocalizePath('/contact')"
          >{{ $i18n.locale === 'de' ? 'Kontakt' : 'Contact' }}</nuxt-link
        >
        <language-switch-component />
      </div>
      <div class="md:hidden flex flex-col" @click="toggleMobileMenu">
        <div class="w-6 h-0.5 bg-hgv-950 my-0.5"></div>
        <div class="w-6 h-0.5 bg-hgv-950 my-0.5"></div>
        <div class="w-6 h-0.5 bg-hgv-950 my-0.5"></div>
      </div>
    </div>
    <div
      :class="mobileMenuOpen ? 'flex' : 'hidden'"
      class="flex-col pt-12 md:hidden link-container h-[calc(100vh-88px)]"
    >
      <nuxt-link
        class="font-sans text-hgv-950 my-4 mx-auto hover:no-underline hover:text-hgv_red-700"
        :to="LocalizePath('/guides')"
        >{{ $i18n.locale === 'de' ? 'Gästeführer' : 'Guides' }}</nuxt-link
      >
      <nuxt-link
        class="font-sans text-hgv-950 my-4 mx-auto hover:no-underline hover:text-hgv_red-700"
        :to="LocalizePath('/tour')"
        >{{ $i18n.locale === 'de' ? 'Führungen' : 'Tours' }}</nuxt-link
      >
      <nuxt-link
        class="font-sans text-hgv-950 my-4 mx-auto hover:no-underline hover:text-hgv_red-700"
        :to="LocalizePath('/about')"
        >{{ $i18n.locale === 'de' ? 'Über Uns' : 'About us' }}</nuxt-link
      >
      <nuxt-link
        class="font-sans text-hgv-950 my-4 mx-auto hover:no-underline hover:text-hgv_red-700"
        :to="LocalizePath('/fees')"
        >{{ $i18n.locale === 'de' ? 'Honorare' : 'Fees' }}</nuxt-link
      >
      <nuxt-link
        class="font-sans text-hgv-950 my-4 mx-auto mr-3 hover:no-underline hover:text-hgv_red-700"
        :to="LocalizePath('/contact')"
        >{{ $i18n.locale === 'de' ? 'Kontakt' : 'Contact' }}</nuxt-link
      >
      <language-switch-component class="mx-auto mt-4" />
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

  watch: {
    $route() {
      this.mobileMenuOpen = false
    },
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

<style></style>
