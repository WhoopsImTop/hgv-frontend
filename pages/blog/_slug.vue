<template>
  <div class="my-12 md:my-24 max-w-[1000px] mx-auto">
    <h1>
      {{
        $i18n.locale === 'de'
          ? posts.translations[0].name
          : posts.translations[1].name
      }}
    </h1>
    <div class="mt-3"
      v-html="
        $i18n.locale === 'de'
          ? posts.translations[0].description
          : posts.translations[1].description
      "
    ></div>
  </div>
</template>

<script>
export default {
  layout: 'main',
  async asyncData({ $axios, params }) {
    const posts = await $axios.$get(
      'https://api.hamburger-gaestefuehrer.de/api/blogs/' + params.slug
    )
    return { posts }
  },
  data() {
    return {}
  },
}
</script>

<style></style>
