<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-20 my-24 md:my-36">
    <div>
      <h2 class="font-sans text-4xl font-bold text-hgv-950">
        {{ translations[$i18n.locale].title }}
      </h2>
      <p class="mt-4 text-hgv-950">
        {{ translations[$i18n.locale].text }}
      </p>
    </div>
    <div
      class="grid grid-cols-2 md:grid-cols-3 md:grid-rows-2 gap-4 h-full sm:h-96"
    >
      <nuxt-link
        class="md:row-span-2 rounded-xl aspect-square relative overflow-hidden w-full h-full group"
        v-if="tours[0]"
        :to="`/tour?theme_id=22`"
      >
        <div
          v-if="tours.image_copyright"
          class="absolute bottom-0 left-0 px-2 pt-1 pb-2 rounded-tr-md bg-black/70"
        >
          <span class="text-white font-bold text-xs">
            © {{ tours.image_copyright }}
          </span>
        </div>
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
      <div
        v-else
        class="animate-pulse bg-hgv-950/50 rounded-xl w-full h-full md:row-span-2"
      ></div>

      <nuxt-link
        class="rounded-xl relative overflow-hidden h-full group"
        :to="`/tour?theme_id=22`"
        v-if="tours[1]"
      >
        <div
          v-if="tours.image_copyright"
          class="absolute bottom-0 left-0 px-2 pt-1 pb-2 rounded-tr-md bg-black/70"
        >
          <span class="text-white font-bold text-xs">
            © {{ tours.image_copyright }}
          </span>
        </div>
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
      <div
        v-else
        class="animate-pulse bg-hgv-950/50 rounded-xl w-full h-full"
      ></div>

      <nuxt-link
        class="rounded-xl relative overflow-hidden h-full max-sm:w-full max-sm:aspect-square group"
        v-if="tours[2]"
        :to="`/tour?theme_id=22`"
      >
        <div
          v-if="tours.image_copyright"
          class="absolute bottom-0 left-0 px-2 pt-1 pb-2 rounded-tr-md bg-black/70"
        >
          <span class="text-white font-bold text-xs">
            © {{ tours.image_copyright }}
          </span>
        </div>
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
      <div
        v-else
        class="animate-pulse bg-hgv-950/50 rounded-xl w-full h-full"
      ></div>

      <nuxt-link
        class="rounded-xl relative overflow-hidden h-full group"
        :to="`/tour?theme_id=22`"
        v-if="tours[3]"
      >
        <div
          v-if="tours.image_copyright"
          class="absolute bottom-0 left-0 px-2 pt-1 pb-2 rounded-tr-md bg-black/70"
        >
          <span class="text-white font-bold text-xs">
            © {{ tours.image_copyright }}
          </span>
        </div>
        <img
          :src="tours[3].images[0].url"
          :alt="tours[3].name"
          class="object-cover h-full w-full group-hover:scale-110 transition-transform duration-300"
        />
        <div
          class="absolute bottom-0 py-3 px-4 w-full flex items-end h-36 bg-gradient-to-t from-slate-950/50 to-slate-950/0"
        >
          <h3 class="text-white text-base md:text-lg lg:text-xl font-bold">
            {{ tours[3].name }}
          </h3>
        </div>
      </nuxt-link>
      <div
        v-else
        class="animate-pulse bg-hgv-950/50 rounded-xl w-full h-full"
      ></div>

      <nuxt-link
        class="col-span-2 md:col-span-1 rounded-xl relative overflow-hidden h-full group"
        :to="`/tour?theme_id=22`"
        v-if="tours[4]"
      >
        <div
          v-if="tours.image_copyright"
          class="absolute bottom-0 left-0 px-2 pt-1 pb-2 rounded-tr-md bg-black/70"
        >
          <span class="text-white font-bold text-xs">
            © {{ tours.image_copyright }}
          </span>
        </div>
        <img
          :src="tours[4].images[0].url"
          :alt="tours[4].name"
          class="object-cover h-full w-full group-hover:scale-110 transition-transform duration-300"
        />
        <div
          class="absolute bottom-0 py-3 px-4 w-full flex items-end h-36 bg-gradient-to-t from-slate-950/50 to-slate-950/0"
        >
          <h3 class="text-white text-base md:text-lg lg:text-xl font-bold">
            {{ tours[4].name }}
          </h3>
        </div>
      </nuxt-link>
      <div
        v-else
        class="animate-pulse bg-hgv-950/50 rounded-xl w-full h-full"
      ></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      tours: [],
      tourOrder: [11, 43, 13, 12, 24],
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
  async mounted() {
    await this.getTours()
    this.sortTours()
  },
  methods: {
    async getTours() {
      try {
        const responses = await Promise.all(
          this.tourOrder.map((id) =>
            axios.get(
              `https://api.hamburger-gaestefuehrer.de/api/tours/${id}?theme_id=22`
            )
          )
        )
        this.tours = responses.map((response) => response.data.tour)
      } catch (error) {
        console.error('Error fetching tours:', error)
      }
    },
    sortTours() {
      this.tours.sort((a, b) => {
        return this.tourOrder.indexOf(a.id) - this.tourOrder.indexOf(b.id)
      })
    },
  },
}
</script>

<style></style>
