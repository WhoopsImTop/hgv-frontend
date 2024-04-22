<template>
  <div>
    <div v-if="!pageLoading">
      <random-image-generator :translations="translations" class="max-h-[40vh]" />
      <h3 class="font-sans font-sm font-bold text-hgv-950 mt-5 mb-1">
        {{ $i18n.locale === 'de' ? 'Guide Filter' : 'Guide filter' }}
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-12 gap-4 mb-3">
        <select
          id="language"
          v-model="selectedLanguage"
          class="border border-gray-300 rounded-lg p-2 text-hgv-950 font-sans md:col-span-2"
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
          class="border border-gray-300 rounded-lg p-2 text-hgv-950 font-sans md:col-span-2"
          name="mobility"
        >
          <option value="0">
            {{
              $i18n.locale === 'de'
                ? 'Fortbewegungsmittel'
                : 'Means of transportation'
            }}
          </option>
          <option v-for="mobil in mobility" :key="mobil.id" :value="mobil.id">
            {{ mobil.translations[$i18n.locale === 'de' ? 0 : 1].name }}
          </option></select
        ><select
          id="theme"
          v-model="selectedSkill"
          class="border border-gray-300 rounded-lg p-2 text-hgv-950 font-sans md:col-span-2"
          name="theme"
        >
          <option value="0">
            {{ $i18n.locale === 'de' ? 'Themen' : 'Themes' }}
          </option>
          <option v-for="skill in skills" :key="skill.id" :value="skill.id">
            {{ skill.translations[$i18n.locale === 'de' ? 0 : 1].name }}
          </option>
        </select>
        <select
          id="orte"
          v-model="selectedPlace"
          class="border border-gray-300 rounded-lg p-2 text-hgv-950 font-sans md:col-span-2"
          name="orte"
        >
          <option value="0">
            {{ $i18n.locale === 'de' ? 'Orte' : 'Places' }}
          </option>
          <option v-for="place in places" :key="place.id" :value="place.id">
            {{ place.translations[$i18n.locale === 'de' ? 0 : 1].name }}
          </option>
        </select>
        <button
          class="bg-hgv-950 text-white rounded-lg p-2 font-sans disabled:opacity-50 disabled:cursor-not-allowed md:col-span-3"
          :disabled="
            selectedLanguage === '0' &&
            selectedMobility === '0' &&
            selectedSkill === '0' &&
            selectedPlace === '0'
          "
          @click="filterGuide()"
        >
          {{ $i18n.locale === 'de' ? 'Guides Filtern' : 'filter guides' }}
        </button>
        <button
          class="bg-hgv_red-50 rounded-lg p-2 font-sans disabled:opacity-50 disabled:cursor-not-allowed md:col-span-1 flex items-center justify-center"
          :disabled="
            selectedLanguage === '0' &&
            selectedMobility === '0' &&
            selectedSkill === '0' &&
            selectedPlace === '0'
          "
          @click="
            selectedLanguage = '0'
            selectedMobility = '0'
            selectedSkill = '0'
            selectedPlace = '0'
            filterGuide()
          "
        >
          <img src="/delete.svg" alt="delete" class="w-6 h-6" />
        </button>
      </div>
      <hr class="border-1 border-gray-300 mt-1 mb-3" />
      <div
        v-if="filteredGuides.length > 0"
        class="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <guide-component
          v-for="guide in filteredGuides"
          :key="guide.id"
          :guide="guide"
        >
        </guide-component>
        <div v-if="loadingNextPage" class="flex justify-center items-center">
          <div
            class="bg-gray-100 animate-pulse mr-2 w-full h-56 rounded-xl pt-4 px-4 pb-3 text-decoration-none"
          ></div>
        </div>
        <div v-if="loadingNextPage" class="flex justify-center items-center">
          <div
            class="bg-gray-100 animate-pulse mr-2 w-full h-56 rounded-xl pt-4 px-4 pb-3 text-decoration-none"
          ></div>
        </div>
        <div v-if="loadingNextPage" class="flex justify-center items-center">
          <div
            class="bg-gray-100 animate-pulse mr-2 w-full h-56 rounded-xl pt-4 px-4 pb-3 text-decoration-none"
          ></div>
        </div>
        <div v-if="loadingNextPage" class="flex justify-center items-center">
          <div
            class="bg-gray-100 animate-pulse mr-2 w-full h-56 rounded-xl pt-4 px-4 pb-3 text-decoration-none"
          ></div>
        </div>
        <div v-if="loadingNextPage" class="flex justify-center items-center">
          <div
            class="bg-gray-100 animate-pulse mr-2 w-full h-56 rounded-xl pt-4 px-4 pb-3 text-decoration-none"
          ></div>
        </div>
        <div v-if="loadingNextPage" class="flex justify-center items-center">
          <div
            class="bg-gray-100 animate-pulse mr-2 w-full h-56 rounded-xl pt-4 px-4 pb-3 text-decoration-none"
          ></div>
        </div>
        <div v-if="loadingNextPage" class="flex justify-center items-center">
          <div
            class="bg-gray-100 animate-pulse mr-2 w-full h-56 rounded-xl pt-4 px-4 pb-3 text-decoration-none"
          ></div>
        </div>
        <div v-if="loadingNextPage" class="flex justify-center items-center">
          <div
            class="bg-gray-100 animate-pulse mr-2 w-full h-56 rounded-xl pt-4 px-4 pb-3 text-decoration-none"
          ></div>
        </div>
        <div v-if="loadingNextPage" class="flex justify-center items-center">
          <div
            class="bg-gray-100 animate-pulse mr-2 w-full h-56 rounded-xl pt-4 px-4 pb-3 text-decoration-none"
          ></div>
        </div>
      </div>
      <div v-else class="flex justify-center items-center">
        <p class="text-hgv-950">
          {{
            $i18n.locale === 'de' ? 'Keine Guides gefunden' : 'No guides found'
          }}
        </p>
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
</template>

<script>
export default {
  layout: 'main',
  data() {
    return {
      translations: {
        siteTitle: {
          de: 'Unsere Guides',
          en: 'Our Guides',
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
      places: [
        {
          id: 1,
          translations: [
            { name: 'lade Orte...' },
            { name: 'loading Places...' },
          ],
        },
      ],
      selectedLanguage: '0',
      selectedMobility: '0',
      selectedSkill: '0',
      selectedPlace: '0',
      guidePage: 1,
      currentPageLoading: false,
      loadingNextPage: false,
      guides: [],
      maxPages: 0,
      image: null,
      random_seed: null,
    }
  },

  head() {
    return {
      title:
        this.$i18n.locale === 'de'
          ? 'Unsere Guides | Hamburger Gästeführer Verein e.V.'
          : 'Our Guides | Hamburger Gästeführer Verein e.V.',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Unsere Gästeführer sind Experten für Hamburg. Sie kennen die Stadt wie ihre Westentasche und zeigen Ihnen die schönsten Ecken der Hansestadt.',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content:
            this.$i18n.locale === 'de'
              ? 'Unsere Guides | Hamburger Gästeführer Verein e.V.'
              : 'Our Guides | Hamburger Gästeführer Verein e.V.',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'Unsere Gästeführer sind Experten für Hamburg. Sie kennen die Stadt wie ihre Westentasche und zeigen Ihnen die schönsten Ecken der Hansestadt.',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content:
            'https://api.hamburger-gaestefuehrer.de/storage/x7hk3mQpocKCksbGCHcRtRYZssznzVKJAm5oJ8KC.jpg',
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: 'https://hamburger-gaestefuehrer.de/guides',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content:
            this.$i18n.locale === 'de'
              ? 'Unsere Guides | Hamburger Gästeführer Verein e.V.'
              : 'Our Guides | Hamburger Gästeführer Verein e.V.',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'Unsere Gästeführer sind Experten für Hamburg. Sie kennen die Stadt wie ihre Westentasche und zeigen Ihnen die schönsten Ecken der Hansestadt.',
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content:
            'https://api.hamburger-gaestefuehrer.de/storage/x7hk3mQpocKCksbGCHcRtRYZssznzVKJAm5oJ8KC.jpg',
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
      ],
    }
  },
  computed: {
    pageLoading() {
      return this.guides.length === 0 && this.image === null
    },
    filteredGuides() {
      return this.guides
    },
  },
  beforeMount() {
    this.getAllGuides()
    this.getAllData()
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },

  methods: {
    filterGuide() {
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
      if (this.selectedPlace !== '0') {
        queryString += `&place=${this.selectedPlace}`
      }
      this.loadingNextPage = true
      this.currentPageLoading = true
      this.$axios
        .get(
          `https://api.hamburger-gaestefuehrer.de/api/guides?param=2${queryString}`
        )
        .then((response) => {
          this.guides = response.data.guides.data
          this.maxPages = response.data.guides.last_page
          this.currentPageLoading = false
          this.loadingNextPage = false
        })
        .catch((error) => {
          console.log(error)
          window.alert(
            'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.'
          )
        })
    },

    async getAllGuides() {
      const guides = await this.$axios.$get(
        `https://api.hamburger-gaestefuehrer.de/api/guides`
      )
      this.guides = guides.guides.data
      this.maxPages = guides.guides.last_page
      this.random_seed = guides.random_seed
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
        })
        .catch((error) => {
          console.log(error)
        })
    },

    getMoreGuides() {
      if (this.currentPageLoading) {
        return
      }

      if (this.guidePage >= this.maxPages) {
        return
      }

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
      if (this.selectedPlace !== '0') {
        queryString += `&place=${this.selectedPlace}`
      }
      if(this.random_seed) {
        queryString += `&random_seed=${this.random_seed}`
      }

      this.loadingNextPage = true
      this.guidePage++
      this.currentPageLoading = true
      this.$axios
        .get(
          `https://api.hamburger-gaestefuehrer.de/api/guides?page=${this.guidePage}${queryString}`
        )
        .then((response) => {
          this.guides.push(...response.data.guides.data)
          this.currentPageLoading = false
          this.loadingNextPage = false
        })
        .catch((error) => {
          console.log(error)
          window.alert(
            'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.'
          )
          this.loadingNextPage = false
        })
    },

    handleScroll() {
      const bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight >=
        document.documentElement.offsetHeight - (window.innerHeight * 2) / 3
      if (bottomOfWindow) {
        this.getMoreGuides()
      }
    },
  },
}
</script>

<style></style>
