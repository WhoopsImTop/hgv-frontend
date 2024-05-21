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
        <h4>
          {{
            $i18n.locale === 'de'
              ? 'Anmeldung Erforderlich'
              : 'Registration Required'
          }}
        </h4>
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
          <h1 class="font-sans text-xl md:text-4xl text-white font-bold">
            {{ tour.translations[$i18n.locale === 'de' ? 0 : 1].name }}
          </h1>

          <button
            class="hidden xl:block md:justify-self-end"
            @click="SharePage()"
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
      <div
        v-if="tour.image_copyright"
        class="absolute top-0 right-0 px-2 py-2 text-xs text-white bg-black bg-opacity-50 rounded-bl"
      >
        <span> © {{ tour.image_copyright }} </span>
      </div>
    </div>
    <div class="grid grid-cols-1 xl:grid-cols-5 py-3 md:py-8 gap-3">
      <div class="xl:col-span-4">
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
              new Date(tour.date).toLocaleDateString($i18n.locale)
            }}
          </span>
          <span
            class="text-hgv-950 font-sans font-medium justify-self-center flex items-center"
            ><img src="/duration.svg" alt="duration" class="mr-2" />{{
              tour.duration
            }}</span
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
          <hr class="my-4" />
          <div
            v-if="!filterError && !tour.is_public"
            class="grid grid-cols-1 md:grid-cols-12 gap-4 mb-3"
          >
            <select
              id="language"
              v-model="selectedLanguage"
              class="border border-gray-300 rounded-lg p-2 text-hgv-950 font-sans md:col-span-3"
              name="language"
            >
              <option value="0">
                {{ $i18n.locale === 'de' ? 'Sprache' : 'Language' }}
              </option>
              <option
                v-for="language in languages"
                :key="language.id"
                :value="language.id"
              >
                {{ language.translations[$i18n.locale === 'de' ? 0 : 1].name }}
              </option>
            </select>
            <select
              id="mobility"
              v-model="selectedMobility"
              class="border border-gray-300 rounded-lg p-2 text-hgv-950 font-sans md:col-span-3"
              name="mobility"
            >
              <option value="0">
                {{
                  $i18n.locale === 'de'
                    ? 'Fortbewegungsmittel'
                    : 'Means of transportation'
                }}
              </option>
              <option
                v-for="mobil in mobility"
                :key="mobil.id"
                :value="mobil.id"
              >
                {{ mobil.translations[$i18n.locale === 'de' ? 0 : 1].name }}
              </option></select
            ><select
              id="theme"
              v-model="selectedSkill"
              class="border border-gray-300 rounded-lg p-2 text-hgv-950 font-sans md:col-span-3"
              name="theme"
            >
              <option value="0">
                {{ $i18n.locale === 'de' ? 'Themen' : 'Themes' }}
              </option>
              <option v-for="skill in skills" :key="skill.id" :value="skill.id">
                {{ skill.translations[$i18n.locale === 'de' ? 0 : 1].name }}
              </option>
            </select>
            <button
              class="bg-hgv-950 text-white rounded-lg p-2 font-sans disabled:opacity-50 disabled:cursor-not-allowed md:col-span-2"
              :disabled="
                selectedLanguage === '0' &&
                selectedMobility === '0' &&
                selectedSkill === '0'
              "
              @click="filterGuide()"
            >
              {{ $i18n.locale === 'de' ? 'Filtern' : 'filter' }}
            </button>
            <button
              class="bg-hgv_red-50 rounded-lg p-2 font-sans disabled:opacity-50 disabled:cursor-not-allowed md:col-span-1 flex items-center justify-center"
              :disabled="
                selectedLanguage === '0' &&
                selectedMobility === '0' &&
                selectedSkill === '0'
              "
              @click="
                selectedLanguage = '0'
                selectedMobility = '0'
                selectedSkill = '0'
                filterGuide()
              "
            >
              <img src="/delete.svg" alt="delete" class="w-6 h-6" />
            </button>
          </div>
          <div v-if="!guideLoading">
            <div
              v-if="tour.guides.length > 0"
              class="grid grid-cols-1 lg:grid-cols-2 gap-4"
            >
              <guide-component
                v-for="guide in tour.guides"
                :key="guide.id"
                :guide="guide"
              >
              </guide-component>
            </div>
            <div v-else class="text-center">
              <span class="text-hgv-950 font-bold my-2">
                {{
                  $i18n.locale === 'de'
                    ? 'Es wurden keine Guides mit diesen Filtern gefunden'
                    : 'No guides found with these filters'
                }}
              </span>
            </div>
          </div>
          <div
            v-else
            class="h-[calc(100vh-170px)] w-full flex flex-col justify-center items-center"
          >
            <div>
              <svg
                aria-hidden="true"
                class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-hgv-200 fill-hgv-950"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-1">
        <div
          v-if="tour.themes.length > 0"
          class="border border-zink-50 rounded-xl px-3 pt-3 mb-3"
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
        <div
          v-if="tourDates != null && tourDates.length > 0"
          class="border border-zink-50 rounded-xl px-3 pt-3 mb-3"
        >
          <h3 class="font-bold text-2xl font-sans mb-3">
            {{ translations.tour_dates[$i18n.locale] }}
          </h3>
          <div class="relative flex flex-col my-2">
            <span
              v-for="(date, index) in tourDates"
              :key="date.id"
              :class="
                index != tourDates.length - 1 ? 'border-b border-zink-50' : ''
              "
              @click="changeDate(date)"
              class="py-2 mr-2 flex items-center font-bold text-hgv-950"
            >
              <img
                src="../../assets/calendar.svg"
                alt="alternativ termin"
                title="alternativ termin"
                class="mr-2"
              />{{
                new Date(date.date).toLocaleDateString($i18n.locale, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              }}
            </span>
          </div>
        </div>
        <!-- <div
          class="border-zink-50 rounded-xl overflow-hidden mb-2 h-[60vh] sticky top-32"
        >
          <mapComponent class="min-h-[450px]" :tours="[tour]" />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
/* import mapComponent from '~/components/mapComponent.vue' */
export default {
  components: {
    /* mapComponent, */
  },
  layout: 'main',

  async asyncData({ $axios, params, route }) {
    const tour = await $axios.$get(
      `https://api.hamburger-gaestefuehrer.de/api/tours/${params.slug}`
    )
    if (tour.tour.is_public && tour.tour.tour_dates) {
      const date = route.query.date
      if (date) {
        const index = tour.tour.tour_dates.findIndex(
          (tourDate) => tourDate.id === parseInt(date)
        )
        if (index !== -1) {
          tour.tour.date = tour.tour.tour_dates[index].date
          if (tour.tour.tour_dates[index].guide) {
            tour.tour.guides = [tour.tour.tour_dates[index].guide]
          }
        }
      }
    }
    return tour
  },

  data() {
    return {
      translations: {
        guides: {
          de: 'Fragen Sie diese Tour direkt bei einem unserer Guides an',
          en: 'Ask this tour directly from one of our guides',
        },
        categories: {
          de: 'Kategorien',
          en: 'Categories',
        },
        tour_dates: {
          de: 'Alternative Termine',
          en: 'Alternative Dates',
        },
        languages: {
          de: 'Sprachen',
          en: 'Languages',
        },
        mobility: {
          de: 'Mobilität',
          en: 'Mobility',
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
      languages: [
        {
          id: 1,
          translations: [
            { name: 'lade Sprachen...' },
            { name: 'loading Languages...' },
          ],
        },
      ],
      mobility: [
        {
          id: 1,
          translations: [
            { name: 'lade Fortbewegungsmittel...' },
            { name: 'loading Means of transportation...' },
          ],
        },
      ],
      skills: [
        {
          id: 1,
          translations: [
            { name: 'lade Themen...' },
            { name: 'loading Themes...' },
          ],
        },
      ],
      selectedLanguage: '0',
      selectedMobility: '0',
      selectedSkill: '0',
      guideLoading: false,
      filterError: true,
    }
  },
  head() {
    const schema = {
      '@context': 'http://schema.org',
      '@type': 'TouristAttraction', // Adjust type based on your content
      name: this.tour
        ? this.tour.translations[0].name +
          ' | ' +
          'Hamburger Gästeführer Verein e.V.'
        : 'Hamburger Gästeführer Verein e.V.',
      description: this.tour
        ? this.tour.translations[0].description.replace(/(<([^>]+)>)/gi, '')
        : 'Entdecken Sie Hamburg mit den Hamburger Gästeführern! Wir bieten 70 einzigartige Touren in 15 Sprachen an, von klassischen Highlights bis zu individuellen Erkundungen. Buchen Sie jetzt und erleben Sie Hamburg mit Experten an Ihrer Seite',
      image:
        this.tour && this.tour.images.length > 0
          ? this.tour.images[0].url
          : 'Default Image URL',
      // Add more properties as needed
    }

    return {
      title: this.tour
        ? this.tour.translations[0].name +
          ' | ' +
          'Hamburger Gästeführer Verein e.V.'
        : 'Hamburger Gästeführer Verein e.V.',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.tour
            ? this.tour.translations[0].description.replace(/(<([^>]+)>)/gi, '')
            : 'Entdecken Sie Hamburg mit den Hamburger Gästeführern! Wir bieten 70 einzigartige Touren in 15 Sprachen an, von klassischen Highlights bis zu individuellen Erkundungen. Buchen Sie jetzt und erleben Sie Hamburg mit Experten an Ihrer Seite',
        },
        {
          hid: 'image',
          name: 'image',
          content:
            this.tour && this.tour.images.length > 0
              ? this.tour.images[0].url
              : 'Default Image URL',
        },
        // Add more meta tags as needed
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(schema),
        },
      ],
    }
  },

  computed: {
    tourDates() {
      return this.tour.tour_dates
        .filter((date) => {
          return date.date !== this.tour.date
        })
        .sort((a, b) => {
          return new Date(a.date) - new Date(b.date)
        })
    },
  },

  mounted() {
    const urlParams = new URLSearchParams(window.location.search)
    const guideId = urlParams.get('guide')
    if (guideId) {
      this.tour.guides = this.tour.guides.filter(
        (guide) => guide.id === parseInt(guideId)
      )
    }
    if (!this.tour.is_public) {
      this.getAllData()
    }
    if (!this.$route.query.date && this.tour.tour_dates && this.tour.is_public) {
      this.tour.date = this.tour.tour_dates[0].date
      if (this.tour.tour_dates[0].guide) {
        this.tour.guides = [this.tour.tour_dates[0].guide]
      }
    }
  },

  methods: {
    changeDate(date) {
      if (date.guide) {
        this.tour.guides = [date.guide]
      } else {
        this.tour.guides = []
      }
      this.tour.date = date.date
    },
    getAllData() {
      this.$axios
        .get('https://api.hamburger-gaestefuehrer.de/api/data')
        .then((response) => {
          this.languages = response.data.languages.sort((a, b) => {
            if (a.translations[0].name < b.translations[0].name) {
              return -1
            }
            if (a.translations[0].name > b.translations[0].name) {
              return 1
            }
            return 0
          })
          this.mobility = response.data.mobilities.sort((a, b) => {
            if (a.translations[0].name < b.translations[0].name) {
              return -1
            }
            if (a.translations[0].name > b.translations[0].name) {
              return 1
            }
            return 0
          })
          this.skills = response.data.skills.sort((a, b) => {
            if (a.translations[0].name < b.translations[0].name) {
              return -1
            }
            if (a.translations[0].name > b.translations[0].name) {
              return 1
            }
            return 0
          })
          this.places = response.data.places.sort((a, b) => {
            if (a.translations[0].name < b.translations[0].name) {
              return -1
            }
            if (a.translations[0].name > b.translations[0].name) {
              return 1
            }
            return 0
          })
          this.filterError = false
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          }
          this.filterError = true
        })
    },

    filterGuide() {
      this.guideLoading = true
      let queryString = ''
      if (this.selectedLanguage !== '0') {
        queryString += `&language=${this.selectedLanguage}`
      }
      if (this.selectedMobility !== '0') {
        queryString += `&mobility=${this.selectedMobility}`
      }
      if (this.selectedSkill !== '0') {
        queryString += `&skill=${this.selectedSkill}`
      }
      this.loadingNextPage = true
      this.currentPageLoading = true
      this.$axios
        .get(
          `https://api.hamburger-gaestefuehrer.de/api/guides?tour=${this.$route.params.slug}${queryString}`
        )
        .then((response) => {
          this.tour.guides = response.data.guides.data
          this.guideLoading = false
        })
        .catch((error) => {
          console.log(error)
          window.alert(
            'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.'
          )
          this.guideLoading = false
        })
    },

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
          .then(() => {})
          .catch((error) => {
            window.alert('Fehler beim Teilen:', error)
          })
      } else {
        window.alert('Teilen wird nicht unterstützt')
      }
    },
  },
}
</script>

<style>
.description h2 {
  @apply text-4xl font-sans font-bold mb-3;
}
</style>
