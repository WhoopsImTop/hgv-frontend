<template>
  <div class="flex flex-col items-center my-48">
    <h2 class="font-sans text-4xl font-bold text-hgv-950">
      {{ translations[$i18n.locale].title }}
    </h2>
    <p class="mt-4 text-hgv-950 lg:w-4/6 mx-auto text-center">
      {{ translations[$i18n.locale].text }}
    </p>

    <div v-if="tours.length > 0" class="mt-12">
      <nuxt-link
        v-for="tour in tours"
        :key="tour.id"
        :to="`/tour/${tour.id}`"
        class="flex flex-col md:flex-row items-center text-decoration-none border-b border-hgv-950/60 py-4"
      >
        <img
          :src="tour.images[0].url"
          :alt="tour.name"
          class="object-cover w-full md:w-40 h-40 rounded-lg"
        />
        <div class="flex flex-col px-4 xs:mt-4">
          <div
            v-if="tour.needs_registration"
            class="py-1 px-2 bg-hgv-50 rounded flex items-center w-max my-3 md:mt-0"
          >
            <img
              src="/info.svg"
              width="20"
              alt="info"
              title="info"
              class="mr-2"
            />
            <span class="font-bold text-sm">
              {{
                $i18n.locale === 'de'
                  ? 'Anmeldung Erforderlich'
                  : 'Registration Required'
              }}
            </span>
          </div>
          <h4 class="mb-2">{{ tour.name }}</h4>
          <div v-html="tour.description"></div>
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
      translations: {
        de: {
          title: 'Öffentliche Führungen',
          text: `Hier finden Sie auf einen Blick die Touren, die ein konkretes Datum haben und direkt beim Guide gebucht werden können. Wählen Sie einfach Ihre Tour und melden Sie sich in einem zweiten Schritt direkt beim Guide für das gewünschte Datum und die gewünschte Uhrzeit an.`,
        },
        en: {
          title: 'Public Tours',
          text: `Here you will find the tours that have a specific date and can be booked directly with the guide. Simply select your tour and, in a second step, register directly with the guide for the desired date and time.`,
        },
      },
    }
  },
  mounted() {
    axios
      .get('https://api.hamburger-gaestefuehrer.de/api/tours?is_public=true')
      .then((response) => {
        this.tours = response.data.tours.data.filter((tour) => {
          return new Date(tour.date) > new Date()
        })
      })
      .catch((error) => {
        console.log(error)
      })
  },
}
</script>

<style></style>
