<template>
  <div class="my-12 md:my-24">
    <h1>{{ $i18n.locale === 'de' ? 'Neuigkeiten' : 'News' }}</h1>

    <div class="flex flex-col mt-12">
      <nuxt-link
        v-for="post in posts"
        :key="post.id"
        class="bg-white shadow-md rounded-lg p-4 text-decoration-none hover:-translate-y-2 transition-transform duration-300 ease-in-out mb-4 border border-hgv-950/90"
        :to="`/blog/${post.id}`"
      >
        <h2 class="mb-3">
          {{
            $i18n.locale === 'de'
              ? post.translations[0].name
              : post.translations[1].name
          }}
        </h2>
        <div
          v-html="
            $i18n.locale === 'de'
              ? post.translations[0].short_description
              : post.translations[1].short_description
          "
        ></div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'main',
  async asyncData({ $axios }) {
    const posts = await $axios.$get(
      'https://api.hamburger-gaestefuehrer.de/api/blogs'
    )
    return { posts }
  },
  data() {
    return {
      posts: [],
    }
  },
}
</script>

<style></style>
