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
        >
          {{ pageData.translations[$i18n.locale === 'de' ? 0 : 1].description }}
        </p>
      </div>
      <div v-if="pageData.members.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
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
      pageData: {
        members: [],
        translations: [
          {
            name: 'Vorstand',
            description:
              'Der Vorstand des Hamburger Gästeführer Vereins e.V. setzt sich aus erfahrenen und engagierten Mitgliedern zusammen, die die Interessen des Vereins vertreten und die strategische Ausrichtung mitbestimmen.',
          },
          {
            name: 'Board',
            description:
              'The board of the Hamburger Gästeführer Verein e.V. consists of experienced and committed members who represent the interests of the association and help determine its strategic direction.',
          },
        ],
      },
      loading: true,
      errorMessages: '',
      boardIds: [9, 94, 39, 73, 58],
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

  beforeMount() {
    this.loading = true
    this.boardIds.forEach((id) => {
      axios
        .get(`https://api.hamburger-gaestefuehrer.de/api/guides/${id}`)
        .then((res) => {
          this.pageData.members.push(res.data.guide)
        })
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
