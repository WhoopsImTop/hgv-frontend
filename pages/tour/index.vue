<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-150px)]">
    <div class="col-span-2">
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <select
          class="border border-gray-300 rounded-lg p-2 text-hgv-950 font-sans"
          name="category"
          id="category"
          v-model="selectedCategory"
        >
          <option value="0">{{ $i18n.locale === 'de' ? 'Kategorie' : 'Categories'}}</option>
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
          <option value="0">{{ $i18n.locale === 'de' ? 'Sprachen' : 'Languages'}}</option>
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
          <span class="text-hgv-950 font-sans">{{ $i18n.locale === 'de' ? 'Öffentliche Touren' : 'Public Tours'}}</span>
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
          <option value="0">{{ $i18n.locale === 'de' ? 'Guides' : 'Guides'}}</option>
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
          <option value="0">{{ $i18n.locale === 'de' ? 'Mobilität' : 'Mobility'}}</option>
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
          <option value="0">{{ $i18n.locale === 'de' ? 'Themen' : 'Skills'}}</option>
          <option
            v-for="skill in skills"
            :key="skill.id"
            :value="skill.id"
          >
            {{ skill.translations[$i18n.locale === 'de' ? '0' : '1'].name }}
          </option>
        </select>
      </div>
      <!-- <div>
        <h2 class="font-sans font-bold mt-4 mb-2 text-hgv-950">
          {{ $i18n.locale === 'de' ? 'Sprachen' : 'Languages' }}
        </h2>
        <div class="flex items-center flex-wrap">
          <div
            v-for="language in languages"
            :key="language.id"
            class="hover:cursor-pointer"
            @click="
              selectedLanguage === language.id
                ? (selectedLanguage = '0')
                : (selectedLanguage = language.id)
            "
          >
            <language-component
              :language="
                language.translations[$i18n.locale === 'de' ? '0' : '1']
                  .description
              "
            >
            </language-component>
          </div>
        </div>
      </div>
      <div>
        <h2 class="font-sans font-bold mt-4 mb-2 text-hgv-950">
          {{ $i18n.locale === 'de' ? 'Themen' : 'Themes' }}
        </h2>
        <div class="flex items-center flex-wrap">
          <p
            v-for="skill in skills"
            :key="skill.id"
            class="font-sans text-hgv-950 mr-3 mb-1 hover:cursor-pointer hover:text-hgv_red-600"
            :class="selectedSkill === skill ? 'rounded text-hgv_red-600' : ''"
            @click="
              selectedSkill === skill.id
                ? (selectedSkill = '0')
                : (selectedSkill = skill.id)
            "
          >
            {{ skill.translations[$i18n.locale === 'de' ? '0' : '1'].name }}
          </p>
        </div>
      </div> -->
      <hr class="border-1 border-gray-300 w-full my-3" />

      <div
        v-if="filteredTours"
        class="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-6"
      >
        <nuxt-link
          v-for="tour in filteredTours"
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
            <h3
              class="text-white text-base md:text-base lg:text-base font-bold"
            >
              {{ tour.translations[$i18n.locale === 'de' ? '0' : '1'].name }}
            </h3>
          </div>
        </nuxt-link>
      </div>
    </div>
    <div class="overflow-hidden rounded-xl hidden lg:block">
      <mapComponent
        v-if="tours.length > 0"
        class="h-full"
        :tours="filteredTours"
      />
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
    locations: [
      {
        lat: 53.551086,
        lng: 9.993682,
      },
    ],
    currentLocation: {},
    mapLoading: true,
  }),

  computed: {
    filteredTours() {
      let tours = this.tours
      if (this.publicTour) {
        tours = tours.filter((tour) => tour.is_public === 1)
      }
      if (this.selectedGuide !== '0') {
        tours = tours.filter((tour) => {
          return tour.guides.some((guide) => guide.id === this.selectedGuide)
        })
      }
      if (this.selectedCategory !== '0') {
        tours = tours.filter((tour) => {
          return tour.themes.some(
            (category) => category.id === this.selectedCategory
          )
        })
      }
      if (this.selectedLanguage !== '0') {
        tours = tours.filter((tour) => {
          return tour.guides.some((guide) =>
            guide.languages.some(
              (language) => language.id === this.selectedLanguage
            )
          )
        })
      }
      if (this.selectedMobility !== '0') {
        tours = tours.filter((tour) => {
          return tour.guides.some((guide) =>
            guide.mobility.some(
              (mobility) => mobility.id === this.selectedMobility
            )
          )
        })
      }
      if (this.selectedSkill !== '0') {
        tours = tours.filter((tour) => {
          return tour.guides.some((guide) =>
            guide.skills.some((skill) => skill.id === this.selectedSkill)
          )
        })
      }
      return tours
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
    getAllTours() {
      this.mapLoading = true
      this.$axios
        .get('https://api.hamburger-gaestefuehrer.de/api/tours')
        .then((response) => {
          const tours = response.data.tours.sort((a, b) =>
            a.translations[
              this.$i18n.locale === 'de' ? 0 : 1
            ].name.localeCompare(
              b.translations[this.$i18n.locale === 'de' ? 0 : 1].name
            )
          )
          this.tours = tours
          this.mapLoading = false
        })
        .catch((error) => {
          console.log(error)
          this.mapLoading = false
        })
    },
    getAllCategories() {
      this.$axios
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
    getAllLanguages() {
      this.$axios
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

    getAllGuides() {
      this.$axios
        .get('https://api.hamburger-gaestefuehrer.de/api/guides')
        .then((response) => {
          this.guides = response.data.guides.sort((a, b) =>
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

    getAllMobility() {
      this.$axios
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

    getAllSkills() {
      this.$axios
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
