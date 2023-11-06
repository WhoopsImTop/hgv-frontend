<template>
  <div class="flex flex-col items-center my-64">
    <h2 class="font-sans text-4xl font-bold text-hgv-950">Touren</h2>
    <p class="mt-4 text-hgv-950">
      Diese Touren haben ein konkretes Datum und können direkt gebucht werden.
    </p>

    <div
      v-if="tours.length > 0"
      class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-6"
    >
      <nuxt-link
        v-for="tour in tours"
        :key="tour.id"
        :to="`/tour/${tour.id}`"
        class="rounded-xl aspect-square relative overflow-hidden"
      >
        <img
          :src="tour.images[0].url"
          :alt="tour.name"
          class="object-cover h-100"
        />
        <div
          class="absolute bottom-0 py-3 px-4 w-full flex items-end h-36 bg-gradient-to-t from-slate-950/50 to-slate-950/0"
        >
          <h3 class="text-white text-base md:text-lg lg:text-xl font-bold">
            {{ tour.name }}
          </h3>
        </div>
      </nuxt-link>
    </div>

    <div
      v-else
      class="grid w-full gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-6"
    >
      <div class="rounded-xl aspect-square relative overflow-hidden">
        <div class="animate-pulse bg-gray-200 h-100"></div>
      </div>
      <div class="rounded-xl aspect-square relative overflow-hidden">
        <div class="animate-pulse bg-gray-200 h-100"></div>
      </div>
      <div class="rounded-xl aspect-square relative overflow-hidden">
        <div class="animate-pulse bg-gray-200 h-100"></div>
      </div>
      <div class="rounded-xl aspect-square relative overflow-hidden">
        <div class="animate-pulse bg-gray-200 h-100"></div>
      </div>
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
          return tour.is_public
        })
      })
      .catch((error) => {
        console.log(error)
      })
  },
}
</script>

<style></style>
