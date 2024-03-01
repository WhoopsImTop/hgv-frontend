<template>
  <div
    class="rounded-xl z-10 h-auto bg-white transition-transform duration-300"
  >
    <input
      v-model="guideSearchInput"
      type="search"
      class="bg-white mx-auto text-sm outline-none rounded border border-hgv-950 font-sans text-hgv-950 p-2 w-full"
      placeholder="Suche nach Guides..."
      @input="searchGuides"
    />

    <div
      class="absolute top-12 flex flex-col rounded max-h-40 overflow-y-scroll"
      :class="guidesSearchResult.length > 0 ? 'mt-2 border border-hgv-950' : ''"
    >
      <nuxt-link
        v-for="guide in guidesSearchResult"
        :key="guide.id"
        :to="'/guide/' + guide.id"
        class="flex items center p-2"
        :class="guidesSearchResult.length > 1 ? 'border-b border-gray-200' : ''"
      >
        <h3 class="font-sans text-hgv-950 text-sm">{{ guide.name }}</h3>
        <img src="/arrow-right.svg" class="w-4 h-4 ml-auto" alt="arrow" />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showSearch: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      guidesSearchResult: [],
      guideSearchInput: '',
      searchTimeout: null,
    }
  },

  watch: {
    $route() {
      this.guidesSearchResult = []
      this.guideSearchInput = ''
    },
  },

  methods: {
    searchGuides() {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout)
      }
      this.searchTimeout = setTimeout(this.getGuides, 500)
    },
    async getGuides() {
      this.guidesSearchResult = []
      if (this.guideSearchInput.length > 0) {
        const response = await this.$axios.get(
          `https://api.hamburger-gaestefuehrer.de/api/guide/${this.guideSearchInput}`
        )
        if (Array.isArray(response.data.guide)) {
          this.guidesSearchResult = response.data.guide
        } else {
          this.guidesSearchResult = [response.data.guide]
        }
      }
    },
  },
}
</script>

<style></style>
