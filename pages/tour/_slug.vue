<template>
  <div v-if="tour">
    <div
      class="relative h-[60vh] rounded-xl mx-auto w-full overflow-hidden flex items-center justify-center"
    >
      <div
        v-if="tour.needs_registration"
        class="absolute top-5 left-5 py-1 px-2 bg-white rounded flex items-center"
      >
        <img src="/info.svg" width="25" alt="info" title="info" class="mr-2" />
        <h4>{{ $i18n.locale === 'de' ? 'Anmeldung Erforderlich' : 'Registration Required' }}</h4>
      </div>
      <img
        v-if="tour.images.length > 0"
        :src="tour.images[0].url"
        :alt="tour.name"
        class="object-cover w-full h-full"
      />
      <div
        class="absolute bottom-0 py-3 px-4 w-full h-36 bg-gradient-to-t from-slate-950/50 to-slate-950/0"
      >
        <div class="flex justify-between h-100 items-end">
          <h1 class="font-sans text-4xl text-white font-bold">
            {{ tour.translations[$i18n.locale === 'de' ? 0 : 1].name }}
          </h1>

          <button
            @click="SharePage()"
            class="hidden xl:block md:justify-self-end"
          >
            <img
              src="../../assets/share.svg"
              width="25"
              alt="share"
              title="teilen"
            />
          </button>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 xl:grid-cols-3 py-8 md:gap-2">
      <div class="col-span-2">
        <div
          v-if="tour.is_public === 1"
          class="flex flex-row justify-between items-center py-2 px-2 rounded-xl border border-hgv-950 mb-2"
        >
          <span
            class="hidden md:flex text-hgv-950 font-sans font-medium justify-self-center items-center"
            ><img src="/web.svg" alt="public" class="mr-2" />{{
              translations.public[$i18n.locale]
            }}</span
          >
          <span
            class="text-hgv-950 font-sans font-medium justify-self-center flex items-center"
            ><img src="/calendar.svg" alt="price" class="mr-2" />{{
              new Date(tour.date).toLocaleDateString('de-DE')
            }}
          </span>
          <span
            class="text-hgv-950 font-sans font-medium justify-self-center flex items-center"
            ><img src="/duration.svg" alt="duration" class="mr-2" />{{
              tour.duration
            }}
            {{ translations.hours[$i18n.locale] }}</span
          >
          <span
            class="text-hgv-950 font-sans font-medium justify-self-center flex items-center"
            ><img src="/payment.svg" alt="price" class="mr-2" />{{
              tour.price
            }}
            €</span
          >
        </div>
        <div
          class="border border-zink-50 rounded-xl p-4 description"
          v-html="
            tour.translations[$i18n.locale === 'de' ? 0 : 1].description ??
            tour.description
          "
        ></div>
        <div class="border border-zink-50 rounded-xl p-3 mt-3">
          <h3 class="font-bold text-2xl font-sans mb-3">
            {{ translations.guides[$i18n.locale] }}
          </h3>
          <div class="grid grid-cols-2 gap-4">
            <guide-component
              v-for="guide in filteredGuides"
              :guide="guide"
              :key="guide.id"
            >
            </guide-component>
          </div>
        </div>
      </div>
      <div class="col-span-1">
        <div
          class="border border-zink-50 rounded-xl px-3 pt-3 mb-2"
          v-if="tour.themes.length > 0"
        >
          <h3 class="font-bold text-2xl font-sans mb-3">
            {{ translations.categories[$i18n.locale] }}
          </h3>
          <div class="relative flex flex-row flex-wrap items-center my-2">
            <nuxt-link
              v-for="theme in tour.themes"
              :key="theme.id"
              :to="'/tour/kategorie/' + theme.id"
              class="px-2 py-1 rounded bg-hgv-900 hover:bg-hgv_red-700 text-white font-bold mb-2 mr-2 text-sm text-decoration-none"
            >
              {{ theme.translations[$i18n.locale === 'de' ? 0 : 1].name }}
            </nuxt-link>
          </div>
        </div>
        <div class="border-zink-50 rounded-xl overflow-hidden mb-2 h-[60vh] sticky top-3">
          <mapComponent class="min-h-[450px]" :tours="[tour]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mapComponent from '~/components/mapComponent.vue'
export default {
  components: {
    mapComponent,
  },
  layout: 'main',
  data() {
    return {
      translations: {
        guides: {
          de: 'Buchen Sie diese Tour mit einem unserer Guides',
          en: 'Book this tour with one of our guides',
        },
        categories: {
          de: 'Kategorien',
          en: 'Categories',
        },
        languages: {
          de: 'Sprachen',
          en: 'Languages',
        },
        mobility: {
          de: 'Mobilität',
          en: 'Mobility',
        },
        hours: {
          de: 'Stunden',
          en: 'hours',
        },
        public: {
          de: 'Öffentlich',
          en: 'Public',
        },
      },
      locations: [
        {
          lat: 53.551086,
          lng: 9.993682,
        },
      ],
      tours: [],
      currentLocation: null,
      pins: {
        selected: {
          url: 'https://cdn.mapmarker.io/api/v1/pin?size=50&background=%23F87171&text=%20',
          height: 50,
          width: 50,
        },
        notSelected: {
          url: 'https://cdn.mapmarker.io/api/v1/pin?size=50&background=%23ffffff&text=%20',
          height: 50,
          width: 50,
        },
      },
    }
  },
  async asyncData({ $axios, params }) {
    const tour = await $axios.$get(
      `https://api.hamburger-gaestefuehrer.de/api/tours/${params.slug}`
    )
    return tour
  },
  computed: {
    filteredGuides() {
      let guides = this.tour.guides
      if (this.$route.query.language) {
        guides = guides.filter((guide) => {
          return guide.languages.some(
            (language) => language.id === parseInt(this.$route.query.language)
          )
        })
      } else if (this.$route.query.guide) {
        guides = guides.filter((guide) => {
          return guide.id === parseInt(this.$route.query.guide)
        })
      } else if (this.$route.query.mobility) {
        guides = guides.filter((guide) => {
          return guide.mobility.some(
            (mobility) => mobility.id === parseInt(this.$route.query.mobility)
          )
        })
      }
      return guides.sort(() => Math.random() - 0.5)
    },
  },
  methods: {
    getUrl(guide) {
      if (!guide.image) {
        const canvas = document.createElement('canvas')
        canvas.width = 128
        canvas.height = 128
        const ctx = canvas.getContext('2d')

        const r = (Math.round(Math.random() * 127) + 127).toString(16)
        const g = (Math.round(Math.random() * 127) + 127).toString(16)
        const b = (Math.round(Math.random() * 127) + 127).toString(16)
        const color = '#' + r + g + b

        ctx.fillStyle = color
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        const contrast = Math.round(
          (parseInt(r, 16) * 299 +
            parseInt(g, 16) * 587 +
            parseInt(b, 16) * 114) /
            1000
        )

        if (contrast < 125) {
          ctx.fillStyle = '#ffffff'
        } else {
          ctx.fillStyle = '#000000'
        }

        ctx.font = 'bold 40px sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(
          guide.name
            .split(' ')
            .map((word) => word[0])
            .join(''),
          canvas.width / 2,
          canvas.height / 2
        )

        return canvas.toDataURL()
      } else {
        return guide.image.url
      }
    },
    SharePage() {
      const data = {
        title: this.tour.translations[0].name,
        text: this.tour.translations[0].description,
        url: window.location.href,
      }

      if (navigator.share) {
        navigator
          .share(data)
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error))
      } else {
        console.log('Web Share API not supported in your browser')
      }
    },
    getAllTours() {
      this.$axios
        .get('https://api.hamburger-gaestefuehrer.de/api/tours')
        .then((response) => {
          this.tours = response.data.tours
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  /* mounted() {
    this.getAllTours()
  }, */
}
</script>

<style>
.description h2 {
  @apply text-4xl font-sans font-bold mb-3;
}
</style>
