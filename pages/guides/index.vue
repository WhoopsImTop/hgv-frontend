<template>
  <div>
    <div
      class="relative h-[60vh] rounded-xl mx-auto w-full overflow-hidden flex items-center justify-center"
    >
      <img
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
    </div>
  </div>
</template>

<script>
export default {
  layout: 'main',
  async asyncData({ $axios }) {
    try {
      const guides = await $axios.$get(
        `https://api.hamburger-gaestefuehrer.de/api/guides`
      )
      const accesskey = 'fpsBXV7HBwRnN5B90GnMnIZYg2EtqCBTCGMMyBvjvtw'
      const secretkey = '-m9PfeP7BMEvsGE6HdU5QIWr2Hmb4-TfnTaszqbh_GI'
      const url = `https://api.unsplash.com/photos/random?query=hamburg%20tourism&orientation=landscape&client_id=${accesskey}&client_key=${secretkey}&count=1`
      const response = await fetch(url)
      const data = await response.json()
      return { guides: guides.guides.data.sort(() => Math.random() - 0.5), image: data[0] }
    } catch (error) {
      console.log(error)
    }
  },
  data() {
    return {
      translations: {
        siteTitle: {
          de: 'Unsere Guides',
          en: 'Our Guides',
        },
      },
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
    }
  },
  computed: {
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
      return guides;
    },
  },
  beforeMount() {
    this.getAllLanguages()
    this.getAllMobility()
    this.getAllSkills()
    this.getAllPlaces()
  },

  methods: {
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
      this.guidePage++
      this.currentPageLoading = true
      this.$axios
        .get(
          `https://api.hamburger-gaestefuehrer.de/api/guides?page=${this.guidePage}`
        )
        .then((response) => {
          this.guides.push(...response.data.guides.data)
          this.currentPageLoading = false
        })
        .catch((error) => {
          console.log(error)
          window.alert(
            'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.'
          )
        })
    },

    handleScroll() {
      const bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight >=
          (document.documentElement.offsetHeight - window.innerHeight * 2/3);
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
