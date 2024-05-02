<template>
  <div v-if="languages">
    <random-image-generator class="max-h-[256px]" />
    <h1 class="font-sans font-bold text-hgv-900 mt-4 mb-2">
      {{ translations.siteTitle[$i18n.locale] }}
      {{
        languages.translations[$i18n.locale === 'de' ? 0 : 1 || languages].name
      }}
    </h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
      <div v-for="tour in languages.tours" :key="tour.id" class="flex flex-col">
        <nuxt-link
          :to="`/tour/${tour.id}`"
          class="flex flex-row items-start border border-zinc-50 rounded-xl p-3 text-decoration-none"
        >
          <div class="mr-4">
            <img
              v-if="tour.images"
              :src="tour.images[0].url"
              :alt="tour.name"
              class="w-24 h-24 rounded-lg object-cover"
            />
            <div v-else class="bg-zinc-50 rounded w-24 h-24"></div>
          </div>
          <div>
            <h3 class="text-2xl font-sans font-bold mb-2">
              {{
                tour.translations[$i18n.locale === 'de' ? 0 : 1].name ||
                tour.name
              }}
            </h3>
            <p
              v-html="
                tour.translations[
                  $i18n.locale === 'de' ? 0 : 1
                ].description.slice(0, 100) + '...' ||
                tour.description.slice(0, 200) + '...'
              "
            ></p>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'main',
  async asyncData({ $axios, params }) {
    const language = await $axios.$get(
      `https://api.hamburger-gaestefuehrer.de/api/languages/${params.slug}`
    )

    const tours = []
    language.language.guides.forEach((guide) => {
      guide.tours.forEach((tour) => {
        const index = tours.findIndex((item) => item.id === tour.id)
        if (index === -1) {
          tours.push(tour)
        }
      })
    })

    language.language.tours = tours

    return { languages: language.language }
  },

  data() {
    return {
      translations: {
        siteTitle: {
          de: 'Touren in der Sprache:',
          en: 'Tours in the language:',
        },
        categories: {
          de: 'Sprachen',
          en: 'Languages',
        },
        further_Categories: {
          de: 'Weitere Sprachen',
          en: 'Further Sprachen',
        },
      },
    }
  },

  methods: {
    generateDescription(tour) {
      if (tour.translations[this.$i18n.locale === 'de' ? 0 : 1].description) {
        return (
          tour.translations[
            this.$i18n.locale === 'de' ? 0 : 1
          ].description.slice(0, 100) + '...'
        )
      } else {
        return tour.description.slice(0, 100) + '...'
      }
    },
  },

  mounted() {
    console.log(this.languages)
  },
}
</script>

<style>
.description h2 {
  @apply text-4xl font-sans font-bold mb-3;
}
</style>
