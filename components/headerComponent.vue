<template>
  <nav class="sticky top-0 z-10">
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
        <nuxt-link to="/search"
          ><img :src="searchImage" class="w-7 h-7 mr-2" alt="suche"
        /></nuxt-link>
        <ul class="flex items-center">
          <li>
            <nuxt-link
              class="font-sans text-hgv-950 mx-2.5 hover:no-underline hover:text-hgv_red-700"
              :to="LocalizePath('/guides')"
              >{{ $i18n.locale === 'de' ? 'Guides' : 'Guides' }}</nuxt-link
            >
          </li>
          <li>
            <nuxt-link
              class="font-sans text-hgv-950 mx-2.5 hover:no-underline hover:text-hgv_red-700"
              :to="LocalizePath('/tour')"
              >{{ $i18n.locale === 'de' ? 'Führungen' : 'Tours' }}</nuxt-link
            >
          </li>
          <li>
            <nuxt-link
              class="font-sans text-hgv-950 mx-2.5 hover:no-underline hover:text-hgv_red-700"
              :to="LocalizePath('/about')"
              >{{ $i18n.locale === 'de' ? 'Über Uns' : 'About us' }}</nuxt-link
            >
          </li>
          <li>
            <nuxt-link
              class="font-sans text-hgv-950 mx-2.5 hover:no-underline hover:text-hgv_red-700"
              :to="LocalizePath('/fees')"
              >{{ $i18n.locale === 'de' ? 'Honorare' : 'Fees' }}</nuxt-link
            >
          </li>
          <li>
            <nuxt-link
              class="font-sans text-hgv-950 mx-2.5 mr-3 hover:no-underline hover:text-hgv_red-700"
              :to="LocalizePath('/contact')"
              >{{ $i18n.locale === 'de' ? 'Kontakt' : 'Contact' }}</nuxt-link
            >
          </li>
          <li>
            <nuxt-link
              class="font-sans text-hgv-950 mx-2.5 mr-3 hover:no-underline hover:text-hgv_red-700"
              :to="LocalizePath('/blog')"
              >{{ $i18n.locale === 'de' ? 'News' : 'News' }}</nuxt-link
            >
          </li>
        </ul>
        <a
          href="https://www.instagram.com/guidesforyouinhamburg/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            fill="currentColor"
            width="800px"
            height="800px"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            class="w-7 h-7 text-hgv-950 mx-2.5 hover:no-underline hover:text-hgv_red-700"
          >
            <path
              d="M20.445 5h-8.891A6.559 6.559 0 0 0 5 11.554v8.891A6.559 6.559 0 0 0 11.554 27h8.891a6.56 6.56 0 0 0 6.554-6.555v-8.891A6.557 6.557 0 0 0 20.445 5zm4.342 15.445a4.343 4.343 0 0 1-4.342 4.342h-8.891a4.341 4.341 0 0 1-4.341-4.342v-8.891a4.34 4.34 0 0 1 4.341-4.341h8.891a4.342 4.342 0 0 1 4.341 4.341l.001 8.891z"
            />
            <path
              d="M16 10.312c-3.138 0-5.688 2.551-5.688 5.688s2.551 5.688 5.688 5.688 5.688-2.551 5.688-5.688-2.55-5.688-5.688-5.688zm0 9.163a3.475 3.475 0 1 1-.001-6.95 3.475 3.475 0 0 1 .001 6.95zM21.7 8.991a1.363 1.363 0 1 1-1.364 1.364c0-.752.51-1.364 1.364-1.364z"
            />
          </svg>
        </a>
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
      class="flex-col pt-2 md:hidden link-container h-[calc(100vh-88px)] fixed top-[88px] left-0 right-0 bottom-0 bg-white items-center"
    >
      <nuxt-link to="/search" class="flex items-center font-sans mb-2"
        ><img :src="searchImage" class="w-7 h-7 my-4 mr-2" alt="suche" />{{
          $i18n.locale === 'de' ? 'Suche' : 'Search'
        }}</nuxt-link
      >
      <ul class="flex flex-col items-center gap-8">
        <li>
          <nuxt-link
            class="font-sans text-hgv-950 my-4 mx-auto hover:no-underline hover:text-hgv_red-700"
            :to="LocalizePath('/guides')"
            >{{ $i18n.locale === 'de' ? 'Gästeführer' : 'Guides' }}</nuxt-link
          >
        </li>
        <li>
          <nuxt-link
            class="font-sans text-hgv-950 my-4 mx-auto hover:no-underline hover:text-hgv_red-700"
            :to="LocalizePath('/tour')"
            >{{ $i18n.locale === 'de' ? 'Führungen' : 'Tours' }}</nuxt-link
          >
        </li>
        <li>
          <nuxt-link
            class="font-sans text-hgv-950 my-4 mx-auto hover:no-underline hover:text-hgv_red-700"
            :to="LocalizePath('/about')"
            >{{ $i18n.locale === 'de' ? 'Über Uns' : 'About us' }}</nuxt-link
          >
        </li>
        <li>
          <nuxt-link
            class="font-sans text-hgv-950 my-4 mx-auto hover:no-underline hover:text-hgv_red-700"
            :to="LocalizePath('/fees')"
            >{{ $i18n.locale === 'de' ? 'Honorare' : 'Fees' }}</nuxt-link
          >
        </li>
        <li>
          <nuxt-link
            class="font-sans text-hgv-950 my-4 mx-auto mr-3 hover:no-underline hover:text-hgv_red-700"
            :to="LocalizePath('/contact')"
            >{{ $i18n.locale === 'de' ? 'Kontakt' : 'Contact' }}</nuxt-link
          >
        </li>
        <li>
          <nuxt-link
            class="font-sans text-hgv-950 my-4 mx-auto mr-3 hover:no-underline hover:text-hgv_red-700"
            :to="LocalizePath('/blog')"
            >{{ $i18n.locale === 'de' ? 'News' : 'News' }}</nuxt-link
          >
        </li>
      </ul>
      <a
        href="https://www.instagram.com/guidesforyouinhamburg/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          fill="currentColor"
          width="800px"
          height="800px"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          class="w-7 h-7 text-hgv-950 mt-4 hover:no-underline hover:text-hgv_red-700"
        >
          <path
            d="M20.445 5h-8.891A6.559 6.559 0 0 0 5 11.554v8.891A6.559 6.559 0 0 0 11.554 27h8.891a6.56 6.56 0 0 0 6.554-6.555v-8.891A6.557 6.557 0 0 0 20.445 5zm4.342 15.445a4.343 4.343 0 0 1-4.342 4.342h-8.891a4.341 4.341 0 0 1-4.341-4.342v-8.891a4.34 4.34 0 0 1 4.341-4.341h8.891a4.342 4.342 0 0 1 4.341 4.341l.001 8.891z"
          />
          <path
            d="M16 10.312c-3.138 0-5.688 2.551-5.688 5.688s2.551 5.688 5.688 5.688 5.688-2.551 5.688-5.688-2.55-5.688-5.688-5.688zm0 9.163a3.475 3.475 0 1 1-.001-6.95 3.475 3.475 0 0 1 .001 6.95zM21.7 8.991a1.363 1.363 0 1 1-1.364 1.364c0-.752.51-1.364 1.364-1.364z"
          />
        </svg>
      </a>
      <language-switch-component class="mx-auto mt-4" />
    </div>
  </nav>
</template>

<script>
import instagramImage from './../static/instagram.svg'
import searchImage from './../static/search.svg'
import closeImage from './../static/close.svg'
export default {
  data() {
    return {
      mobileMenuOpen: false,
      showSearch: false,
      searchImage,
      instagramImage,
      closeImage,
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
