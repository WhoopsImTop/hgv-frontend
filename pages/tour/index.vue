<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-[calc(100vh-150px)]">
    <div class="col-span-2">
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <select
          class="border border-gray-300 rounded-lg p-2 text-hgv-950 font-sans"
          name="category"
          id="category"
          v-model="selectedCategory"
        >
          <option value="0">
            {{ $i18n.locale === 'de' ? 'Kategorie' : 'Categories' }}
          </option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.translations[$i18n.locale === 'de' ? '0' : '1'].name }}
          </option>
        </select>
        <select
          class="border border-gray-300 rounded-lg p-2 text-hgv-950 font-sans"
          name="language"
          id="language"
          v-model="selectedLanguage"
        >
          <option value="0">
            {{ $i18n.locale === 'de' ? 'Sprachen' : 'Languages' }}
          </option>
          <option
            v-for="language in languages"
            :key="language.id"
            :value="language.id"
          >
            {{ language.translations[$i18n.locale === 'de' ? '0' : '1'].name }}
          </option>
        </select>
        <div
          class="border border-gray-300 rounded-lg p-2 flex items-center justify-between"
        >
          <span class="text-hgv-950 font-sans">{{
            $i18n.locale === 'de' ? 'Öffentliche Touren' : 'Public Tours'
          }}</span>
          <label class="relative inline-flex items-center cursor-pointer mb-0">
            <input
              type="checkbox"
              value=""
              class="sr-only peer"
              v-model="publicTour"
            />
            <div
              class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-hgv-950/20 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-hgv-950 peer-checked:bg-hgv-950"
            ></div>
          </label>
        </div>
        <select
          class="border border-gray-300 rounded-lg p-2 text-hgv-950 font-sans"
          name="guide"
          id="guide"
          v-model="selectedGuide"
        >
          <option value="0">
            {{ $i18n.locale === 'de' ? 'Guides' : 'Guides' }}
          </option>
          <option v-for="guide in guides" :key="guide.id" :value="guide.id">
            {{ guide.translations[$i18n.locale === 'de' ? '0' : '1'].name }}
          </option>
        </select>
        <select
          class="border border-gray-300 rounded-lg p-2 text-hgv-950 font-sans"
          name="mobility"
          v-model="selectedMobility"
          id="mobility"
        >
          <option value="0">
            {{ $i18n.locale === 'de' ? 'Mobilität' : 'Mobility' }}
          </option>
          <option
            v-for="mobility in mobility"
            :key="mobility.id"
            :value="mobility.id"
          >
            {{ mobility.translations[$i18n.locale === 'de' ? '0' : '1'].name }}
          </option>
        </select>
        <select
          class="border border-gray-300 rounded-lg p-2 text-hgv-950 font-sans"
          name="skills"
          v-model="selectedSkill"
          id="skills"
        >
          <option value="0">
            {{ $i18n.locale === 'de' ? 'Themen' : 'Skills' }}
          </option>
          <option v-for="skill in skills" :key="skill.id" :value="skill.id">
            {{ skill.translations[$i18n.locale === 'de' ? '0' : '1'].name }}
          </option>
        </select>
        <button
          class="border md:col-span-1 lg:col-span-2 rounded-lg p-2 bg-hgv-950 font-sans text-white hover:bg-hgv-900"
          @click="FilterTours"
        >
          {{ $i18n.locale === 'de' ? 'Touren filtern' : 'filter tours' }}
        </button>
        <button
          class="border md:col-span-1 lg:col-span-1 rounded-lg p-2 border-hgv-950 font-sans hover:bg-hgv_red-50 text-hgv_red-950"
          @click="
            selectedCategory = '0'
            selectedLanguage = '0'
            selectedGuide = '0'
            selectedMobility = '0'
            selectedSkill = '0'
            publicTour = false
            getAllTours()
          "
        >
          {{ $i18n.locale === 'de' ? 'Filter zurücksetzen' : 'reset filter' }}
        </button>
      </div>
      <hr class="border-1 border-gray-300 w-full my-3" />

      <div
        v-if="tourLoading === false"
        class="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-6 h-auto"
      >
        <div
          v-if="filteredTours.length === 0 && tourLoading === false"
          class="border-hgv-950 border-2 md:grid-cols-2 lg:col-span-3 rounded-xl p-4 flex flex-col justify-between items-center text-center"
        >
          <div class="flex flex-col">
            <h3 class="text-hgv-950 font-sans font-bold text-xl mb-2">
              {{
                $i18n.locale === 'de'
                  ? 'Es wurden keine Touren mit diesem Filter gefunden'
                  : 'No tours found with this filter'
              }}
            </h3>
            <p class="text-hgv-950 font-sans text-base">
              {{
                $i18n.locale === 'de'
                  ? 'Bitte versuchen Sie es mit einem anderen Filter'
                  : 'Please try another filter'
              }}
            </p>
          </div>
        </div>
        <nuxt-link
          v-for="tour in filteredTours"
          :key="tour.id"
          :to="linkGenerator(tour)"
          class="rounded-xl aspect-square relative overflow-hidden"
          ><div
            v-if="tour.needs_registration"
            class="absolute top-5 left-5 py-1 px-2 bg-white rounded flex items-center"
          >
            <img
              src="/info.svg"
              width="15"
              alt="info"
              title="info"
              class="mr-1"
            />
            <h4 class="text-sm">Anmeldung Erforderlich</h4>
          </div>
          <img
            :src="tour.images[0].url"
            :alt="tour.name"
            class="object-cover h-100 w-100"
          />
          <div
            class="absolute bottom-0 py-3 px-4 w-full flex items-end h-36 bg-gradient-to-t from-slate-950/50 to-slate-950/0"
          >
            <h3
              class="text-white text-base md:text-base lg:text-base font-bold"
            >
              {{ tour.translations[$i18n.locale === 'de' ? '0' : '1'].name }}
            </h3>
          </div>
        </nuxt-link>
      </div>
      <div
        v-else-if="tourLoading === true"
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

      <div class="flex justify-center items-center mt-8" v-if="filteredTours.length > 0 || pagination != null">
        <div v-for="page in pagination" :key="page.url">
          <button
            v-if="page.url !== null"
            class="border border-gray-300 rounded-lg px-2.5 py-1 text-hgv-950 font-sans mx-1"
            :class="page.active ? 'bg-hgv-950 text-white' : ''"
            @click="getAllTours(page.url)"
          >
            {{ page.label }}
          </button>
        </div>
      </div>
    </div>
    <div
      class="overflow-hidden rounded-xl hidden lg:block sticky top-[6em] max-h-[80vh]"
    >
      <mapComponent class="h-full" :tours="filteredTours" />
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
  data: () => ({
    tours: [],
    categories: [],
    languages: [],
    guides: [],
    mobility: [],
    skills: [],
    selectedCategory: '0',
    selectedLanguage: '0',
    selectedGuide: '0',
    selectedMobility: '0',
    selectedSkill: '0',
    publicTour: false,
    pagination: {},
    locations: [
      {
        lat: 53.551086,
        lng: 9.993682,
      },
    ],
    currentLocation: {},
    mapLoading: true,
    tourLoading: true,
  }),

  computed: {
    filteredTours() {
      return this.tours
    },
  },

  watch: {
    filteredTours() {
      this.mapLoading = true
      this.$nextTick(() => {
        this.mapLoading = false
      })
    },
  },

  mounted() {
    this.getAllTours()
    this.getAllCategories()
    this.getAllLanguages()
    this.getAllGuides()
    this.getAllMobility()
    this.getAllSkills()
  },
  methods: {
    linkGenerator(tour) {
      const link = `/tour/${tour.id}`
      let query = '?'
      if (this.selectedLanguage !== '0') {
        query += 'language=' + this.selectedLanguage + '&'
      }
      if (this.selectedGuide !== '0') {
        query += 'guide=' + this.selectedGuide + '&'
      }
      if (this.selectedMobility !== '0') {
        query += 'mobility=' + this.selectedMobility + '&'
      }
      query = query.slice(0, -1)
      return link + query
    },
    FilterTours() {
      this.tourLoading = true
      this.pagination = null
      let query = '?'
      if (this.selectedCategory !== '0') {
        query += 'theme=' + this.selectedCategory + '&'
      }
      if (this.selectedLanguage !== '0') {
        query += 'language=' + this.selectedLanguage + '&'
      }
      if (this.selectedGuide !== '0') {
        query += 'guide=' + this.selectedGuide + '&'
      }
      if (this.selectedMobility !== '0') {
        query += 'mobility=' + this.selectedMobility + '&'
      }
      if (this.selectedSkill !== '0') {
        query += 'skill=' + this.selectedSkill + '&'
      }
      if (this.publicTour) {
        query += 'is_public=true&'
      }
      query = query.slice(0, -1)

      this.$axios
        .get('https://api.hamburger-gaestefuehrer.de/api/tours' + query)
        .then((response) => {
          this.tours = response.data.tours
          this.tourLoading = false
        })
        .catch((error) => {
          console.log(error)
          this.tourLoading = false
        })
    },
    getAllTours(url = null) {
      this.mapLoading = true
      this.tourLoading = true
      let fetchUrl = url || 'https://api.hamburger-gaestefuehrer.de/api/tours'
      
      if (fetchUrl.includes('?')) {
        fetchUrl += '&'
      } else {
        fetchUrl += '?'
      }
      fetchUrl += 'preview=true'

      this.$axios
        .get(fetchUrl)
        .then((response) => {
          const tours = response.data.tours.data.sort((a, b) =>
            a.translations[
              this.$i18n.locale === 'de' ? 0 : 1
            ].name.localeCompare(
              b.translations[this.$i18n.locale === 'de' ? 0 : 1].name
            )
          )

          this.pagination = response.data.tours.links
            .filter((link) => {
              return !isNaN(link.label)
            })
            .map((link) => {
              return {
                label: link.label,
                url: link.url,
                active: link.active,
              }
            })
          this.tours = tours
          this.mapLoading = false
          this.tourLoading = false
        })
        .catch((error) => {
          console.log(error)
          this.mapLoading = false
          this.tourLoading = false
        })
    },
    async getAllCategories() {
      await this.$axios
        .get('https://api.hamburger-gaestefuehrer.de/api/themes')
        .then((response) => {
          this.categories = response.data.themes.sort((a, b) =>
            a.translations[
              this.$i18n.locale === 'de' ? 0 : 1
            ].name.localeCompare(
              b.translations[this.$i18n.locale === 'de' ? 0 : 1].name
            )
          )
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async getAllLanguages() {
      await this.$axios
        .get('https://api.hamburger-gaestefuehrer.de/api/languages')
        .then((response) => {
          this.languages = response.data.languages.sort((a, b) =>
            a.translations[
              this.$i18n.locale === 'de' ? 0 : 1
            ].description.localeCompare(
              b.translations[this.$i18n.locale === 'de' ? 0 : 1].description
            )
          )
        })
        .catch((error) => {
          console.log(error)
        })
    },

    async getAllGuides() {
      await this.$axios
        .get(
          'https://api.hamburger-gaestefuehrer.de/api/guides?preview=true&per_page=200'
        )
        .then((response) => {
          this.guides = response.data.guides.data.sort((a, b) =>
            a.translations[
              this.$i18n.locale === 'de' ? 0 : 1
            ].name.localeCompare(
              b.translations[this.$i18n.locale === 'de' ? 0 : 1].name
            )
          )
        })
        .catch((error) => {
          console.log(error)
        })
    },

    async getAllMobility() {
      await this.$axios
        .get('https://api.hamburger-gaestefuehrer.de/api/mobility')
        .then((response) => {
          this.mobility = response.data.mobilities.sort((a, b) =>
            a.translations[
              this.$i18n.locale === 'de' ? 0 : 1
            ].name.localeCompare(
              b.translations[this.$i18n.locale === 'de' ? 0 : 1].name
            )
          )
        })
        .catch((error) => {
          console.log(error)
        })
    },

    async getAllSkills() {
      await this.$axios
        .get('https://api.hamburger-gaestefuehrer.de/api/skills')
        .then((response) => {
          this.skills = response.data.skills.sort((a, b) =>
            a.translations[
              this.$i18n.locale === 'de' ? 0 : 1
            ].name.localeCompare(
              b.translations[this.$i18n.locale === 'de' ? 0 : 1].name
            )
          )
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>

<style>
.GMap__Wrapper {
  height: calc(100vh - 150px);
}
</style>
