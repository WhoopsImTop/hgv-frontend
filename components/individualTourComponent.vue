<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 my-48">
    <div>
      <h2 class="font-sans text-4xl font-bold text-hgv-950">
        {{ translations[$i18n.locale].title }}
      </h2>
      <p class="mt-4 text-hgv-950">
        {{ translations[$i18n.locale].text }}
      </p>
    </div>
    <div
      class="flex max-sm:flex-col sm:grid sm:grid-rows-2 sm:grid-cols-2 gap-4 sm:col-span-1 h-full sm:h-96"
    >
      <nuxt-link
        class="md:row-span-2 rounded-xl aspect-square relative overflow-hidden w-full h-full group"
        v-if="tours[0]"
        :to="`/tour/${tours[0].id}`"
      >
        <img
          :src="tours[0].images[0].url"
          :alt="tours[0].name"
          class="object-cover h-100 w-full group-hover:scale-110 transition-transform duration-300"
        />
        <div
          class="absolute bottom-0 py-3 px-4 w-full flex items-end h-36 bg-gradient-to-t from-slate-950/50 to-slate-950/0"
        >
          <h3 class="text-white text-base md:text-lg lg:text-xl font-bold">
            {{ tours[0].name }}
          </h3>
        </div>
      </nuxt-link>
      <nuxt-link
        class="rounded-xl relative overflow-hidden h-full group"
        :to="`/tour/${tours[1].id}`"
        v-if="tours[1]"
      >
        <img
          :src="tours[1].images[0].url"
          :alt="tours[1].name"
          class="object-cover h-full w-full group-hover:scale-110 transition-transform duration-300"
        />
        <div
          class="absolute bottom-0 py-3 px-4 w-full flex items-end h-36 bg-gradient-to-t from-slate-950/50 to-slate-950/0"
        >
          <h3 class="text-white text-base md:text-lg lg:text-xl font-bold">
            {{ tours[1].name }}
          </h3>
        </div>
      </nuxt-link>
      <nuxt-link
        class="md:col-start-2 rounded-xl relative overflow-hidden h-full max-sm:w-full max-sm:aspect-square group"
        v-if="tours[2]"
        :to="`/tour/${tours[2].id}`"
      >
        <img
          :src="tours[2].images[0].url"
          :alt="tours[2].name"
          class="object-cover h-full w-full group-hover:scale-110 transition-transform duration-300"
        />
        <div
          class="absolute bottom-0 py-3 px-4 w-full flex items-end h-36 bg-gradient-to-t from-slate-950/50 to-slate-950/0"
        >
          <h3 class="text-white text-base md:text-lg lg:text-xl font-bold">
            {{ tours[2].name }}
          </h3>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      tours: [],
      translations: {
        de: {
          title: 'Führungen',
          text: `Entdecken Sie Hamburg mit unseren vielfältigen Touren! Von klassischen Stadtrundgängen und Busrundfahrten bis zu thematischen Erkundungen bieten wir über 70 verschiedene Führungen in 18 Sprachen an. Erleben Sie Hamburgs Highlights, erkunden Sie Stadtviertel und Quartiere, tauchen Sie in spannende Themen ein oder erkunden Sie die Metropolregion und ihre Umgebung. Über unsere Filter finden Sie ganz einfach Ihre maßgeschneiderte Tour und können diese dann direkt bei unseren Guides anfragen.`,
        },
        en: {
          title: 'Tours',
          text: `Discover Hamburg with our diverse tours! From classic city and bus tours to themed explorations, we offer over 70 different guided tours in 18 languages. Experience Hamburg's highlights, explore city districts and neighbourhoods, immerse yourself in exciting topics or explore the metropolitan region and its surroundings. You can easily find your customised tour using our filters and request it directly from our guides.`,
        },
      },
    }
  },
  mounted() {
    this.getTour(24)
    this.getTour(12)
    this.getTour(25)
  },
  methods: {
    getTour(id) {
      axios
        .get(`https://api.hamburger-gaestefuehrer.de/api/tours/${id}`)
        .then((response) => {
          this.tours.push(response.data.tour)
        })
    },
  },
}
</script>

<style></style>
