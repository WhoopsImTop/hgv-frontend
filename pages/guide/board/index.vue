<template>
  <div>
    <div v-if="pageData.translations" class="mt-12 md:mt-32">
      <div class="flex flex-col items-center">
        <h1 class="text-4xl font-sans font-bold text-hgv-950">
          {{ pageData.translations[$i18n.locale === 'de' ? 0 : 1].name }}
        </h1>
        <p
          id="contact-information"
          class="font-sans text-hgv-950 mt-4 mb-1 max-w-[600px] text-center"
          v-html="
            pageData.translations[$i18n.locale === 'de' ? 0 : 1].description
          "
        ></p>
      </div>
      <div
        v-if="pageData.members.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
      >
        <guideComponentBoard
          v-for="guide in pageData.members"
          :key="guide.id"
          :guide="guide"
          class="w-full"
        />
      </div>
      <div v-else class="mt-12 md:mt-32">
        <!-- Board Members Skeleton Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div
            v-for="n in 5"
            :key="n"
            class="bg-white rounded-lg shadow-md p-6 animate-pulse"
          >
            <!-- Profile Image Skeleton -->
            <div class="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>

            <!-- Name Skeleton -->
            <div class="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>

            <!-- Position Skeleton -->
            <div class="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-4"></div>

            <!-- Description Lines Skeleton -->
            <div class="space-y-2">
              <div class="h-3 bg-gray-300 rounded"></div>
              <div class="h-3 bg-gray-300 rounded w-5/6"></div>
              <div class="h-3 bg-gray-300 rounded w-4/6"></div>
            </div>

            <!-- Languages/Tags Skeleton -->
            <div class="flex gap-2 mt-4 justify-center">
              <div class="h-6 bg-gray-300 rounded-full w-16"></div>
              <div class="h-6 bg-gray-300 rounded-full w-12"></div>
            </div>
          </div>
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
import axios from 'axios'
import guideComponentBoard from '~/components/guideComponentBoard.vue'
export default {
  components: {
    guideComponentBoard,
  },
  layout: 'main',

  data() {
    return {
      pageData: {},
      loading: true,
      errorMessages: '',
    }
  },

  head() {
    return {
      title:
        this.$i18n.locale === 'de'
          ? 'Vorstand | Hamburger Gästeführer Verein e.V.'
          : 'Board | Hamburger Gästeführer Verein e.V.',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            this.$i18n.locale === 'de'
              ? 'Vorstand des Hamburger Gästeführer Vereins e.V.'
              : 'Board of the Hamburger Gästeführer Verein e.V.',
        },
      ],
    }
  },

  async beforeMount() {
    this.loading = true
    const members = []
    await axios
      .get(`https://api.hamburger-gaestefuehrer.de/api/board?preview=true`)
      .then((res) => {
        res.data.board_members.forEach((member) => {
          members.push(member)
        })
      })
    await axios
      .get(`https://api.hamburger-gaestefuehrer.de/api/pages/8`)
      .then((res) => {
        this.pageData = res.data
        this.pageData.members = members
      })
      .catch((error) => {
        this.errorMessages = error.response.data.message
      })
    this.loading = false
  },
}
</script>

<style>
#contact-information a {
  @apply text-hgv-950 underline my-1;
}
</style>
