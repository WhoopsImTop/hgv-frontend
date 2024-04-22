<template>
  <div>
    <div
      v-if="pageData.translations"
      class="mt-12 md:mt-32 grid grid-cols-1 md:grid-cols-2 gap-16"
    >
      <div class="relative block w-full">
        <h1 class="text-4xl font-sans font-bold text-hgv-950">
          {{ pageData.translations[$i18n.locale === 'de' ? 0 : 1].name }}
        </h1>
        <div
          class="font-sans text-hgv-950 mt-5 mb-1"
          v-html="
            pageData.translations[$i18n.locale === 'de' ? 0 : 1].description
          "
        ></div>
      </div>
      <random-image-generator />
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
import axios from 'axios'
export default {
  layout: 'main',

  async asyncData({ $axios, params }) {
    try {
      const accesskey = 'fpsBXV7HBwRnN5B90GnMnIZYg2EtqCBTCGMMyBvjvtw'
      const secretkey = '-m9PfeP7BMEvsGE6HdU5QIWr2Hmb4-TfnTaszqbh_GI'
      const url = `https://api.unsplash.com/photos/random?query=hamburg%20tourism&orientation=landscape&client_id=${accesskey}&client_key=${secretkey}&count=2`
      const response = await fetch(url)
      const data = await response.json()
      return { image: data[0], image2: data[1] }
    } catch (error) {
      console.log(error)
    }
  },

  data() {
    return {
      pageData: {},
      loading: false,
      errorMessages: '',
    }
  },

  head() {
    return {
      title:
        this.$i18n.locale === 'de'
          ? 'Über uns | Hamburger Gästeführer Verein e.V.'
          : 'About us | Hamburger Gästeführer Verein e.V.',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            this.$i18n.locale === 'de'
              ? 'Der Hamburger Gästeführer Verein e. V. (HGV) wurde am 28. November 1995 als Berufsverband professioneller Gästeführerinnen und Gästeführer in Hamburg gegründet. Er vertritt die Interessen seiner Mitglieder gegenüber Tourismuseinrichtungen, Behörden und Verbänden.'
              : 'The Hamburger Gästeführer Verein e. V. (HGV) was founded on November 28, 1995 as a professional association for professional tour guides in Hamburg. It represents the interests of its members vis-à-vis tourism facilities, authorities and associations.',
        },
      ],
    }
  },

  beforeMount() {
    this.loading = true
    axios
      .get('https://api.hamburger-gaestefuehrer.de/api/pages/1')
      .then((res) => {
        this.pageData = res.data
        this.loading = false
      })
      .catch((error) => {
        console.log(error)
        this.errorMessages =
          'Wir haben akutell eine hohe Auslastung. Bitte versuchen Sie es später erneut.'
        this.loading = false
      })
  },
}
</script>

<style></style>
