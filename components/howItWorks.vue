<template>
  <div class="my-48">
    <h2 class="text-center font-sans text-4xl font-bold text-hgv-950">
      {{ translations[$i18n.locale].title }}
    </h2>
    <p class="text-center mt-4 text-hgv-950">
      {{ translations[$i18n.locale].text }}
    </p>
    <div class="py-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <div v-for="guide in guides" :key="guide.id">
        <guide-component :guide="guide" class="h-100" />
      </div>
    </div>
    <div class="flex items-center justify-center">
      <nuxt-link
        to="/guides"
        class="text-center bg-hgv-950 text-white font-bold text-decoration-none py-2 px-3 rounded hover:bg-hgv-900 inline-flex"
      >
        {{ translations[$i18n.locale].button }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import guideComponent from './guideComponent.vue'
export default {
  components: { guideComponent },
  data() {
    return {
      translations: {
        de: {
          title: 'Guides',
          text: `Hier finden Sie alle unsere Gästeführer.`,
          button: 'Alle anzeigen',
        },
        en: {
          title: 'Guides',
          text: `Here you can find all our guides.`,
          button: 'Show all',
        },
      },
      guides: [],
    }
  },
  methods: {
    getGuides() {
      this.$axios
        .get('https://api.hamburger-gaestefuehrer.de/api/guides?preview=true&random=true')
        .then((response) => {
          this.guides = response.data.guides.data.splice(0, 4)
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  mounted() {
    this.getGuides()
  },
}
</script>

<style></style>
