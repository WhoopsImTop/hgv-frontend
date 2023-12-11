<template>
  <div>
    <div v-if="!pageLoading">
      <div
        class="relative h-[60vh] rounded-xl mx-auto w-full overflow-hidden flex items-center justify-center"
      >
        <img
          v-if="image"
          class="object-cover w-full h-full"
          :src="
            image.urls.regular ||
            'https://images.unsplash.com/photo-1569150216991-aba1feb19ac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
          "
        />
        <div
          v-if="image && image.user"
          class="absolute top-0 right-0 px-2 py-2 text-xs text-white bg-black bg-opacity-50 rounded-bl"
        >
          <p>
            {{ $i18n.locale == 'de' ? 'Bild von' : 'image by' }}
            <a
              class="hover:text-white text-white"
              :href="
                image.user.links.html + '?utm_source=hgv&utm_medium=referral'
              "
              target="_blank"
              >{{ image.user.username }}</a
            >
            {{ $i18n.locale == 'de' ? 'auf' : 'on' }}
            <a
              class="hover:text-white text-white"
              href="https://unsplash.com/?utm_source=hgv&utm_medium=referral"
              target="_blank"
              >Unsplash</a
            >
          </p>
        </div>
        <div
          class="absolute bottom-0 py-3 px-4 w-full flex items-end h-36 bg-gradient-to-t from-slate-950/50 to-slate-950/0 flex-row justify-between"
        >
          <h1 class="font-sans text-4xl font-bold text-white">
            {{ translations.siteTitle[$i18n.locale] }}
          </h1>
        </div>
      </div>
      <h3 class="font-sans font-sm font-bold text-hgv-950 mt-5 mb-1">
        {{ $i18n.locale === 'de' ? 'Guide Filter' : 'Guide filter' }}
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-3">
        <select
          class="border border-gray-300 rounded-lg p-2 text-hgv-950 font-sans"
          name="language"
          id="language"
          v-model="selectedLanguage"
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
          class="border border-gray-300 rounded-lg p-2 text-hgv-950 font-sans"
          name="mobility"
          v-model="selectedMobility"
          id="mobility"
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
          class="border border-gray-300 rounded-lg p-2 text-hgv-950 font-sans"
          name="theme"
          id="theme"
          v-model="selectedSkill"
        >
          <option value="0">
            {{ $i18n.locale === 'de' ? 'Themen' : 'Themes' }}
          </option>
          <option v-for="skill in skills" :key="skill.id" :value="skill.id">
            {{ skill.translations[$i18n.locale === 'de' ? 0 : 1].name }}
          </option>
        </select>
        <select
          class="border border-gray-300 rounded-lg p-2 text-hgv-950 font-sans"
          name="orte"
          id="orte"
          v-model="selectedPlace"
        >
          <option value="0">
            {{ $i18n.locale === 'de' ? 'Orte' : 'Places' }}
          </option>
          <option v-for="place in places" :key="place.id" :value="place.id">
            {{ place.translations[$i18n.locale === 'de' ? 0 : 1].name }}
          </option>
        </select>
        <button
          class="bg-hgv-950 text-white rounded-lg p-2 font-sans disabled:opacity-50 disabled:cursor-not-allowed"
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
          "
        >
          {{ $i18n.locale === 'de' ? 'Filter löschen' : 'Clear filter' }}
        </button>
      </div>
      <hr class="border-1 border-gray-300 mt-1 mb-3" />
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <guide-component
          v-for="guide in filteredGuides"
          :guide="guide"
          :key="guide.id"
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
      guides: [],
      maxPages: 0,
      image: null,
      languages: [],
      mobility: [],
      skills: [],
      places: [],
      selectedLanguage: '0',
      selectedMobility: '0',
      selectedSkill: '0',
      selectedPlace: '0',
      guidePage: 1,
      currentPageLoading: false,
      loadingNextPage: false,
    }
  },
  computed: {
    pageLoading() {
      return this.guides.length === 0 && this.image === null
    },
    filteredGuides() {
      let guides = this.guides
      if (this.selectedLanguage !== '0') {
        guides = guides.filter((guide) => {
          return guide.languages.some(
            (language) => language.id === this.selectedLanguage
          )
        })
      }
      if (this.selectedMobility !== '0') {
        guides = guides.filter((guide) => {
          return guide.mobility.some(
            (mobility) => mobility.id === this.selectedMobility
          )
        })
      }
      if (this.selectedSkill !== '0') {
        guides = guides.filter((guide) => {
          return guide.skills.some((skill) => skill.id === this.selectedSkill)
        })
      }

      if (this.selectedPlace !== '0') {
        const guideIds = []
        this.places.forEach((place) => {
          if (place.id === this.selectedPlace) {
            place.tours.forEach((tour) => {
              tour.guides.forEach((guide) => {
                guideIds.push(guide.id)
              })
            })
          }
        })
        guides = guides.filter((guide) => {
          return guideIds.includes(guide.id)
        })
      }
      return guides
    },
  },
  beforeMount() {
    this.getAllGuides()
    this.getAllLanguages()
    this.getAllMobility()
    this.getAllSkills()
    this.getAllPlaces()
  },

  methods: {
    async getAllGuides() {
      const guides = await this.$axios.$get(
        `https://api.hamburger-gaestefuehrer.de/api/guides`
      )
      const accesskey = 'fpsBXV7HBwRnN5B90GnMnIZYg2EtqCBTCGMMyBvjvtw'
      const secretkey = '-m9PfeP7BMEvsGE6HdU5QIWr2Hmb4-TfnTaszqbh_GI'
      const url = `https://api.unsplash.com/photos/random?query=hamburg%20tourism&orientation=landscape&client_id=${accesskey}&client_key=${secretkey}&count=1`
      const response = await fetch(url)
      const data = await response.json()
      this.guides = guides.guides.data.sort(() => Math.random() - 0.5)
      this.maxPages = guides.guides.last_page
      this.image = data[0]
    },
    async getAllLanguages() {
      await this.$axios
        .get('https://api.hamburger-gaestefuehrer.de/api/languages')
        .then((response) => {
          this.languages = response.data.languages
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async getAllMobility() {
      await this.$axios
        .get('https://api.hamburger-gaestefuehrer.de/api/mobility')
        .then((response) => {
          this.mobility = response.data.mobilities
        })
        .catch((error) => {
          console.log(error)
        })
    },

    async getAllSkills() {
      await this.$axios
        .get('https://api.hamburger-gaestefuehrer.de/api/skills')
        .then((response) => {
          this.skills = response.data.skills
        })
        .catch((error) => {
          console.log(error)
        })
    },

    async getAllPlaces() {
      await this.$axios
        .get('https://api.hamburger-gaestefuehrer.de/api/places?with_guides=1')
        .then((response) => {
          this.places = response.data.places
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

      this.loadingNextPage = true
      this.guidePage++
      this.currentPageLoading = true
      this.$axios
        .get(
          `https://api.hamburger-gaestefuehrer.de/api/guides?page=${this.guidePage}`
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
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
}
</script>

<style></style>
