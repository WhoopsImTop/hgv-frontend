<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-20 my-24 md:my-36">
    <div>
      <h2
        class="font-sans text-4xl font-bold text-hgv-950"
        v-html="title ?? translations[$i18n.locale].title"
      ></h2>
      <div
        class="mt-4 text-hgv-950"
        v-html="description ?? translations[$i18n.locale].text"
      ></div>
    </div>
    <div class="py-4 flex flex-col 2xl:grid 2xl:grid-cols-2 gap-4">
      <div v-for="guide in guides" :key="guide.id">
        <guide-component :guide="guide" class="h-100" />
      </div>
      <div class="mt-4 md:col-span-2 text-center">
        <nuxt-link
          to="/guides"
          class="text-center bg-hgv-950 text-white font-bold text-decoration-none py-2 px-3 rounded hover:bg-hgv-900 inline-flex"
        >
          {{ translations[$i18n.locale].button }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import guideComponent from './guideComponent.vue'
export default {
  components: { guideComponent },
  props: {
    title: String,
    description: String,
  },
  data() {
    return {
      translations: {
        de: {
          title: 'Guides',
          text: `Entdecken Sie unser vielfältiges Team von engagierten Gästeführern, die Sie durch unvergessliche Touren führen. Hier präsentieren wir eine Auswahl unserer talentierten Guides. Durch einen Klick auf "Alle anzeigen" erhalten Sie Zugang zu unserem kompletten Angebot. Nutzen Sie dort die praktische Filterfunktion, um den idealen Guide für Ihre individuelle Tour je nach Sprache, Themengebiet und Fortbewegungsmittel zu finden.`,
          button: 'Alle anzeigen',
        },
        en: {
          title: 'Guides',
          text: `Discover our diverse team of dedicated tour guides who will lead you through unforgettable tours. Here we present a selection of our talented guides. By clicking on “Show all” you will have access to our complete offering. Use the practical filter function there to find the ideal guide for your individual tour depending on language, subject area and means of transport.`,
          button: 'Show all',
        },
      },
      guides: [],
    }
  },
  mounted() {
    this.getGuides()
  },
  methods: {
    getGuides() {
      this.$axios
        .get(
          'https://api.hamburger-gaestefuehrer.de/api/guides?preview=true&random=true'
        )
        .then((response) => {
          this.guides = response.data.guides.data.splice(0, 2)
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>

<style></style>
