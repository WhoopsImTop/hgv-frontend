<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 my-64">
    <div>
      <h2 class="font-sans text-4xl font-bold text-hgv-950">
        Individuelle Touren
      </h2>
      <p class="mt-4 text-hgv-950">
        Entdecken Sie Hamburg mit unseren vielfältigen Touren! Von klassischen
        Stadtrundgängen und Busrundfahrten bis zu thematischen Erkundungen
        bieten wir 70 verschiedene Führungen in 15 Sprachen an. Erleben Sie
        Hamburgs Highlights, erkunden Sie Stadtviertel und Quartiere, tauchen
        Sie in spannende Themen ein oder erkunden Sie die Metropolregion und
        ihre Umgebung. Für eine besondere Erfahrung bieten wir auch individuelle
        Touren an. Kontaktieren Sie uns für Ihre maßgeschneiderte Tour!
      </p>
    </div>
    <div
      class="flex max-sm:flex-col sm:grid sm:grid-rows-2 sm:grid-cols-2 gap-4 sm:col-span-1 h-full sm:h-96"
    >
      <nuxt-link
        class="md:row-span-2 rounded-xl aspect-square relative overflow-hidden w-full h-full"
        v-if="tours[0]"
        :to="`/tour/${tours[0].id}`"
      >
        <img
          :src="tours[0].images[0].url"
          :alt="tours[0].name"
          class="object-cover h-100 w-full"
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
        class="rounded-xl relative overflow-hidden h-full"
        :to="`/tour/${tours[0].id}`"
        v-if="tours[0]"
      >
        <img
          :src="tours[0].images[0].url"
          :alt="tours[0].name"
          class="object-cover h-full w-full"
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
        class="md:col-start-2 rounded-xl relative overflow-hidden h-full max-sm:w-full max-sm:aspect-square"
        v-if="tours[0]"
        :to="`/tour/${tours[0].id}`"
      >
        <img
          :src="tours[0].images[0].url"
          :alt="tours[0].name"
          class="object-cover h-full w-full"
        />
        <div
          class="absolute bottom-0 py-3 px-4 w-full flex items-end h-36 bg-gradient-to-t from-slate-950/50 to-slate-950/0"
        >
          <h3 class="text-white text-base md:text-lg lg:text-xl font-bold">
            {{ tours[0].name }}
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
    }
  },
  mounted() {
    axios
      .get('https://api.hamburger-gaestefuehrer.de/api/tours')
      .then((response) => {
        this.tours = response.data.tours.filter((tour) => {
          return tour.is_public === 0
        })
        console.log(this.tours)
      })
      .catch((error) => {
        console.log(error)
      })
  },
}
</script>

<style></style>
