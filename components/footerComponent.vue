<template>
  <footer>
    <div class="bg-hgv-50 py-4 mt-20">
      <div
        class="container mx-auto flex md:flex-row flex-col md:justify-between md:align-end md:items-end"
      >
        <div>
          <img
            src="../assets/logo.svg"
            alt="HGV Logo"
            width="70"
            class="sm:mb-0"
          />
        </div>
        <div class="flex flex-col md:flex-row mt-4 sm:mt-0">
          <nuxt-link
            class="font-sans my-1 max-md:mx-0 md:mx-2"
            :to="footerLinks_one.faqLink"
            >{{ footerLinks_one.translations[$i18n.locale].faq }}</nuxt-link
          >
          <nuxt-link
            class="font-sans my-1 max-md:mx-0 md:mx-2"
            :to="footerLinks_one.board"
            >{{ footerLinks_one.translations[$i18n.locale].board }}</nuxt-link
          >
          <nuxt-link
            class="font-sans my-1 max-md:mx-0 md:mx-2"
            :to="footerLinks_one.contactLink"
            >{{ footerLinks_one.translations[$i18n.locale].contact }}</nuxt-link
          >

          <nuxt-link
            class="font-sans my-1 max-md:mx-0 md:mx-2"
            :to="footerLinks_one.accessibilityLink"
            >{{
              footerLinks_one.translations[$i18n.locale].accessibility
            }}</nuxt-link
          >
          <nuxt-link
            class="font-sans my-1 max-md:mx-0 md:mx-2"
            :to="footerLinks_one.impressumLink"
            >{{
              footerLinks_one.translations[$i18n.locale].impressum
            }}</nuxt-link
          >
          <nuxt-link
            class="font-sans my-1 max-md:mx-0 md:mx-2"
            :to="footerLinks_one.datenschutzerklärenLink"
            >{{
              footerLinks_one.translations[$i18n.locale].datenschutzerklären
            }}</nuxt-link
          >
        </div>
      </div>
    </div>
    <div class="bg-hgv-950">
      <div
        class="container mx-auto flex flex-col sm:flex-row items-center justify-between"
      >
        <span class="font-sans text-sm text-hgv-50 py-2"
          >Hamburger Gästeführer Verein e.V. 2023</span
        >
        <span class="font-sans text-sm text-hgv-50 py-2"
          >Developed by khri8! more playgrounds.</span
        >
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      footerLinks_one: {
        translations: {
          de: {
            faq: 'FAQ Mitgliedschaft',
            board: 'Vorstand',
            contact: 'Kontakt',
            accessibility: 'Barrierefreiheit',
            impressum: 'Impressum',
            datenschutzerklären: 'Datenschutzerklärung',
          },
          en: {
            faq: 'FAQ Membership',
            board: 'Board',
            contact: 'Contact',
            accessibility: 'Accessibility',
            impressum: 'Imprint',
            datenschutzerklären: 'Privacy Policy',
          },
        },
        faqLink: '/faq',
        board: '/guide/board',
        contactLink: '/contact',
        accessibilityLink: '/accessibility',
        impressumLink: '/imprint',
        datenschutzerklärenLink: '/privacy-policy',
      },
      footerLinks_two: {
        translations: {
          de: {
            tour_guides: 'Gästeführer',
            tours: 'Führungen',
          },
          en: {
            tour_guides: 'Tour Guides',
            tours: 'Tours',
          },
        },
        tour_guidesLink: '/guides',
        toursLink: '/tour',
      },
      footerLinks_three: {
        translations: {
          de: {
            about_us: 'Über uns',
            honorary: 'Honorare',
          },
          en: {
            about_us: 'About us',
            honorary: 'Honorary',
          },
        },
        about_usLink: '/about',
        honoraryLink: '/fees',
      },
      locale: this.$i18n.locale,
    }
  },
  methods: {
    LocalizePath(path) {
      return `/${this.$i18n.locale}${path}`
    },
  },
}
</script>

<style></style>
