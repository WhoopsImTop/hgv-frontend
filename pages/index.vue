<template>
  <div>
    <landing-component></landing-component>
    <individual-tour-component></individual-tour-component>
    <public-tour-component
      v-if="$i18n.locale === 'de'"
    ></public-tour-component>
    <how-it-works></how-it-works>
  </div>
</template>

<script>
export default {
  layout: 'main',
  data() {
    return {}
  },
  head() {
    return {
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Hamburger Gästeführer Verein e.V.',
            alternateName: 'HGV',
            url: 'https://hamburger-gaestefuehrer.de',
            logo: 'https://hamburger-gaestefuehrer.de/_nuxt/img/logo.3414964.svg',
          }),
        },
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'WebSite',
            name: 'Hamburger Gästeführer Verein e.V.',
            url: 'https://hamburger-gaestefuehrer.de',
            potentialAction: {
              '@type': 'SearchAction',
              target:
                'https://hamburger-gaestefuehrer.de/tour{search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          }),
        },
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Führungen',
                item: 'https://hamburger-gaestefuehrer.de/tour/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Gästeführer',
                item: 'https://hamburger-gaestefuehrer.de/guides/',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Über Uns',
                item: 'https://hamburger-gaestefuehrer.de/about',
              },
              {
                '@type': 'ListItem',
                position: 4,
                name: 'Honorare',
                item: 'https://hamburger-gaestefuehrer.de/fees',
              },
              {
                '@type': 'ListItem',
                position: 5,
                name: 'Kontakt',
                item: 'https://hamburger-gaestefuehrer.de/contact',
              },
            ],
          }),
        },
      ],
    }
  },
}
</script>

<style></style>
