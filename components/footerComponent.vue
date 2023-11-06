<template>
  <div>
    <div class="bg-hgv-50 py-12 mt-20">
      <div
        class="container mx-auto flex md:flex-row flex-col md:justify-between md:align-end"
      >
        <div class="flex flex-col">
          <nuxt-link class="font-sans my-1" :to="footerLinks_one.contactLink">{{
            footerLinks_one.translations[$i18n.locale].contact
          }}</nuxt-link>
          <nuxt-link
            class="font-sans my-1"
            :to="footerLinks_one.impressumLink"
            >{{
              footerLinks_one.translations[$i18n.locale].impressum
            }}</nuxt-link
          >
          <nuxt-link
            class="font-sans my-1"
            :to="footerLinks_one.datenschutzerklärenLink"
            >{{
              footerLinks_one.translations[$i18n.locale].datenschutzerklären
            }}</nuxt-link
          >
        </div>
        <div class="flex flex-col mt-4 md:mt-0">
          <nuxt-link
            class="font-sans my-1"
            :to="footerLinks_two.tour_guidesLink"
            >{{
              footerLinks_two.translations[$i18n.locale].tour_guides
            }}</nuxt-link
          >
          <nuxt-link class="font-sans my-1" :to="footerLinks_two.toursLink">{{
            footerLinks_two.translations[$i18n.locale].tours
          }}</nuxt-link>
        </div>
        <div class="flex flex-col mt-4 md:mt-0">
          <nuxt-link
            class="font-sans my-1"
            :to="footerLinks_three.about_usLink"
            >{{
              footerLinks_three.translations[$i18n.locale].about_us
            }}</nuxt-link
          >
          <nuxt-link
            class="font-sans my-1"
            :to="footerLinks_three.honoraryLink"
            >{{
              footerLinks_three.translations[$i18n.locale].honorary
            }}</nuxt-link
          >
          <nuxt-link
            class="font-sans my-1"
            :to="footerLinks_three.become_a_memberLink"
            >{{
              footerLinks_three.translations[$i18n.locale].become_a_member
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      footerLinks_one: {
        translations: {
          de: {
            contact: 'Kontakt',
            impressum: 'Impressum',
            datenschutzerklären: 'Datenschutzerklärung',
          },
          en: {
            contact: 'Contact',
            impressum: 'Imprint',
            datenschutzerklären: 'Privacy Policy',
          },
        },
        contactLink: '/contact',
        impressumLink: '/imprint',
        datenschutzerklärenLink: '/privacy-policy',
      },
      footerLinks_two: {
        translations: {
          de: {
            tour_guides: 'Gästeführer',
            tours: 'Touren',
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
            become_a_member: 'Mitglied werden',
          },
          en: {
            about_us: 'About us',
            honorary: 'Honorary',
            become_a_member: 'Become a member',
          },
        },
        about_usLink: '/about',
        honoraryLink: '/fees',
        become_a_memberLink: '/become-member',
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
