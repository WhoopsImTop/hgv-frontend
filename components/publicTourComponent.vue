<template>
  <div class="my-24 md:my-36">
    <h2
      class="font-sans text-4xl font-bold text-hgv-950"
      v-html="title ?? translations[$i18n.locale].title"
    ></h2>
    <p
      class="mt-4 text-hgv-950 w-full md:w-1/2"
      v-html="description ?? translations[$i18n.locale].text"
    ></p>

    <div v-if="tours.length > 0 && !error" class="mt-12">
      <nuxt-link
        v-for="date in tours"
        :key="date.id"
        :to="`/tour/${date.tour.id}?date=${date.id}`"
        class="flex flex-col gap-4 md:gap-6 md:flex-row items-start text-decoration-none border-b border-hgv-950/60 py-4"
      >
        <img
          :src="date.tour.images != null ? date.tour.images[0].url : ''"
          :alt="date.tour.name"
          class="object-cover w-full md:w-40 h-40 rounded-lg sm:mb-4 md:aspect-square"
        />
        <div class="flex flex-col">
          <div class="flex items-center gap-4 mb-3">
            <div
              v-if="date.tour.is_public && date.tour.needs_registration"
              class="py-1 px-2 bg-hgv-50 rounded flex items-center w-max md:mt-0"
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
            <div
              v-if="date.date"
              class="py-1 px-2 bg-hgv-50 rounded flex items-center w-max md:mt-0"
            >
              <img
                src="/calendar.svg"
                width="20"
                alt="info"
                title="info"
                class="mr-2"
              />
              <span class="font-bold text-sm">
                {{ new Date(date.date).toLocaleDateString($i18n.locale) }}
              </span>
            </div>
          </div>
          <h4 class="mb-2">{{ date.tour.name }}</h4>
          <div v-html="date.tour.description"></div>
        </div>
      </nuxt-link>
      <div class="flex items-center justify-center w-full mt-4">
        <nuxt-link
          to="/public-tours"
          class="text-center bg-hgv-950 text-white font-bold text-decoration-none py-2 px-3 rounded hover:bg-hgv-900 inline-flex"
        >
          {{
            $i18n.locale === 'de'
              ? 'Alle Öffentlichen Touren'
              : 'All Public Tours'
          }}
        </nuxt-link>
      </div>
    </div>

    <div
      v-else-if="!error"
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
    <div v-else class="mt-10 bg-hgv-100 px-3 py-2 rounded">
      <p class="text-hgv-950 text-center">
        {{ errorMessage[$i18n.locale] }}
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    title: String,
    description: String,
  },
  data() {
    return {
      tours: [],
      error: false,
      errorMessage: {},
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
      .get('https://api.hamburger-gaestefuehrer.de/api/tour_dates')
      .then((response) => {
        this.tours = response.data
          .filter((tour) => {
            return (
              new Date(tour.date).setHours(0, 0, 0, 0) >=
              new Date().setHours(0, 0, 0, 0)
            )
          })
          .slice(0, 5)
        if (this.tours.length === 0) {
          this.error = true
          this.errorMessage = {
            de: 'Es gibt aktuell keine Öffentlichen Touren.',
            en: 'There are currently no public tours.',
          }
        }
      })
      .catch((error) => {
        console.log(error)
      })
  },
}
</script>

<style></style>
