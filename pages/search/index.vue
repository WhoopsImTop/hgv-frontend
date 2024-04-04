<template>
  <div>
    <div>
      <div
        class="relative h-[30vh] rounded-xl mx-auto w-full overflow-hidden flex items-center justify-center"
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
      <div class="grid grid-cols-1 mb-3 mt-3">
        <input
          v-model="searchParam"
          type="search"
          class="bg-white mx-auto outline-none rounded border border-hgv-950 font-sans text-hgv-950 p-2 w-full text-lg"
          :placeholder="
            $i18n.locale === 'de' ? 'Ich suche nach...' : 'I`m searching for...'
          "
          @input="searchGuides"
        />
      </div>
      <hr class="border-1 border-gray-300 my-3" />
      <div
        v-if="pageLoading"
        class="h-[200px] w-full flex flex-col justify-center items-center"
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
      <div
        v-if="guides.length > 0"
        class="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <guide-component v-for="guide in guides" :guide="guide" :key="guide.id">
        </guide-component>
      </div>
      <div v-else class="flex justify-center items-center">
        <p class="text-hgv-950">
          {{
            $i18n.locale === 'de' ? 'Keine Guides mit diesem Namen gefunden' : 'No guides found with this name'
          }}
        </p>
      </div>
      <hr class="border-1 border-gray-300 my-3" />
      <div
        v-if="pageLoading"
        class="h-[200px] w-full flex flex-col justify-center items-center"
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
      <div
        v-if="tours.length > 0"
        class="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <nuxt-link
          v-for="tour in tours"
          :key="tour.id"
          :to="'/tour/' + tour.id"
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
            :src="tour.images?.[0]?.url || '/placeholder.png'"
            :alt="tour.name"
            class="object-cover h-100 w-100"
          />
          <div
            class="absolute bottom-0 py-3 px-4 w-full flex items-end h-36 bg-gradient-to-t from-slate-950/50 to-slate-950/0"
          >
            <h3
              class="text-white text-base md:text-base lg:text-base font-bold"
            >
              {{ getTranslationName(tour) }}
            </h3>
          </div>
        </nuxt-link>
      </div>
      <div v-else class="flex justify-center items-center">
        <p class="text-hgv-950">
          {{
            $i18n.locale === 'de' ? 'Keine Touren mit diesem Namen gefunden' : 'No tours found with this name'
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import guideLandingImage1 from '../../static/guidesLandingImages/hamburger_gästeführer_Christian_Lue.jpeg'
import guideLandingImage2 from '../../static/guidesLandingImages/hamburger_gästeführer_Christian_Lue_2.jpeg'
import guideLandingImage3 from '../../static/guidesLandingImages/hamburger_gästeführer_Moritz_Kindler.jpeg'
import guideLandingImage4 from '../../static/guidesLandingImages/hamburger_gästeführer_Moritz_Kindler_2.jpeg'
export default {
  layout: 'main',
  data() {
    return {
      landingImages: [
        {
          urls: {
            regular: guideLandingImage1,
          },
          user: {
            username: 'Christian Lue',
            links: {
              html: 'https://unsplash.com/@christianlue?utm_source=hgv&utm_medium=referral',
            },
          },
        },
        {
          urls: {
            regular: guideLandingImage2,
          },
          user: {
            username: 'Christian Lue',
            links: {
              html: 'https://unsplash.com/@christianlue?utm_source=hgv&utm_medium=referral',
            },
          },
        },
        {
          urls: {
            regular: guideLandingImage3,
          },
          user: {
            username: 'Moritz Kindler',
            links: {
              html: 'https://unsplash.com/@moritzkindler?utm_source=hgv&utm_medium=referral',
            },
          },
        },
        {
          urls: {
            regular: guideLandingImage4,
          },
          user: {
            username: 'Moritz Kindler',
            links: {
              html: 'https://unsplash.com/@moritzkindler?utm_source=hgv&utm_medium=referral',
            },
          },
        },
      ],
      translations: {
        siteTitle: {
          de: 'Suche',
          en: 'Search',
        },
      },
      guides: [],
      tours: [],
      searchParam: '',
      searchTimeout: null,
      pageLoading: false,
      loadingNextPage: false,
    }
  },

  head() {
    return {
      title:
        this.$i18n.locale === 'de'
          ? 'Suche | Hamburger Gästeführer Verein e.V.'
          : 'Search | Hamburger Gästeführer Verein e.V.',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Durchsuchen Sie unsere Guides und Touren',
        },
      ],
    }
  },

  beforeMount() {
    const data = this.landingImages[Math.floor(Math.random() * 4)]
    this.image = data
  },

  mounted() {
    this.SearchForGuidesAndTours()
  },

  methods: {
    getTranslationName(tour) {
      // Überprüfen, ob tour.translations definiert ist
      if (tour.translations && tour.translations.length > 0) {
        const translationIndex = this.$i18n.locale === 'de' ? 0 : 1
        return tour.translations[translationIndex].name
      }
      // Fallback-Wert, wenn keine Übersetzungen vorhanden sind
      return tour.name // oder einen anderen geeigneten Wert
    },
    SearchForGuidesAndTours() {
      if (this.searchParam.length === 0) {
        return
      }
      this.pageLoading = true
      this.$axios
        .get(
          `https://api.hamburger-gaestefuehrer.de/api/guide/` + this.searchParam
        )
        .then((response) => {
          this.guides = response.data.guide
          this.tours = response.data.tours
          this.pageLoading = false
        })
        .catch((error) => {
          console.log(error)
          this.pageLoading = false
        })
    },
    searchGuides() {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout)
      }
      this.searchTimeout = setTimeout(this.SearchForGuidesAndTours, 500)
    },
  },
}
</script>

<style></style>
