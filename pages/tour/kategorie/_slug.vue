<template>
  <div v-if="themes">
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
            :href="image.user.links.html + '?utm_source=hgv&utm_medium=referral'"
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
          {{
            themes.translations[$i18n.locale === 'de' ? 0 : 1 || themes].name
          }}
        </h1>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
      <div class="flex flex-col">
        <nuxt-link
          v-for="tour in themes.tours"
          :key="tour.id"
          :to="`/tour/${tour.id}`"
          class="flex flex-row items-start border border-zinc-50 rounded-xl p-3 my-4 text-decoration-none"
        >
          <div class="mr-4">
            <img
              v-if="tour.images"
              :src="tour.images[0].url"
              :alt="tour.name"
              class="w-24 h-24 rounded-lg object-cover"
            />
            <div v-else class="bg-zinc-50 rounded w-24 h-24"></div>
          </div>
          <div>
            <h3 class="text-2xl font-sans font-bold mb-2">
              {{
                tour.translations[$i18n.locale === 'de' ? 0 : 1].name ||
                tour.name
              }}
            </h3>
            <p
              v-html="
                tour.translations[
                  $i18n.locale === 'de' ? 0 : 1
                ].description.slice(0, 100) + '...' ||
                tour.description.slice(0, 200) + '...'
              "
            ></p>
          </div>
        </nuxt-link>
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
          de: 'Touren in der Kategorie:',
          en: 'Tours in the category:',
        },
        categories: {
          de: 'Kategorien',
          en: 'Categories',
        },
        further_Categories: {
          de: 'Weitere Kategorien',
          en: 'Further categories',
        },
      },
    }
  },
  async asyncData({ $axios, params }) {
    const themes = await $axios.$get(
      `https://api.hamburger-gaestefuehrer.de/api/themes/${params.slug}`
    )
    const accesskey = 'fpsBXV7HBwRnN5B90GnMnIZYg2EtqCBTCGMMyBvjvtw'
    const secretkey = '-m9PfeP7BMEvsGE6HdU5QIWr2Hmb4-TfnTaszqbh_GI'
    const url = `https://api.unsplash.com/photos/random?query=hamburg&client_id=${accesskey}&client_key=${secretkey}&count=1`
    const response = await fetch(url)
    const data = await response.json()
    return { themes: themes.theme, image: data[0] }
  },

  mounted() {
    console.log(this.image)
  },
}
</script>

<style>
.description h2 {
  @apply text-4xl font-sans font-bold mb-3;
}
</style>
