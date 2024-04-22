<template>
  <div>
    <div class="relative">
      <random-image-generator class="max-h-[265px]" displayTopRight="true" />
      <div
        class="w-24 h-24 rounded-full border-2 border-white absolute -bottom-12 left-4"
      >
        <img
          class="object-cover rounded-full w-full h-full"
          :src="getUrl(guide)"
        />
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-20">
      <div class="col-span-2 border border-gray-50 rounded-lg p-4">
        <h1 class="font-sans text-4xl text-hgv-950 font-bold">
          {{ guide.name }}
        </h1>
        <p
          class="font-sans mt-2"
          v-html="
            guide.translations[$i18n.locale === 'de' ? 0 : 1].description ||
            guide.description
          "
        ></p>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div v-if="guide.languages.length > 0" class="mt-4">
            <h3 class="text-xl font-bold font-sans text-hgv-950">
              {{ translations.languages[$i18n.locale] }}
            </h3>
            <div class="flex items-center flex-wrap mt-2">
              <nuxt-link
                v-for="language in guide.languages"
                :key="language.id"
                :to="'/tour/sprache/' + language.id"
                class="px-2 py-1 rounded border border-hgv-900 font-bold mb-2 mr-2 text-sm text-decoration-none flex items-center"
              >
                <div class="w-4 h-4 rounded-full overflow-hidden mr-2">
                  <img
                    :src="`/languages/${language.description.toLowerCase()}.svg`"
                    lazy
                    class="object-cover h-full"
                    alt="language icon"
                  />
                </div>
                {{ language.translations[$i18n.locale === 'de' ? 0 : 1].name }}
              </nuxt-link>
            </div>
          </div>

          <div v-if="guide.skills.length > 0" class="mt-4">
            <h3 class="text-xl font-bold font-sans text-hgv-950">
              {{ translations.skills[$i18n.locale] }}
            </h3>
            <p class="font-sans text-hgv-950">
              {{
                guide.skills
                  .map(
                    (skill) =>
                      '#' +
                      skill.translations[$i18n.locale === 'de' ? 0 : 1].name
                  )
                  .join(', ')
              }}
            </p>
          </div>

          <div v-if="guide.mobility.length > 0" class="mt-4">
            <h3 class="text-xl font-bold font-sans text-hgv-950">
              {{ translations.mobility[$i18n.locale] }}
            </h3>
            <div class="flex items-center flex-wrap">
              <span
                v-for="mobil in guide.mobility"
                :key="mobil.id"
                class="py-1 rounde text-hgv-950 font-bold mb-2 mr-2 text-sm text-decoration-none"
              >
                <img
                  :src="'/transportation/' + mobil.name + '.svg'"
                  :alt="mobil.name"
                  :title="
                    mobil.translations[$i18n.locale === 'de' ? 0 : 1].name
                  "
                />
              </span>
            </div>
          </div>
        </div>
        <div v-if="guide.tours.length > 0" class="mt-4">
          <h3 class="text-xl font-bold font-sans text-hgv-950">
            {{ translations.tours[$i18n.locale] }}
          </h3>
          <div
            v-if="guide.tours"
            class="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-2"
          >
            <nuxt-link
              v-for="tour in guide.tours"
              :key="tour.id"
              :to="`/tour/${tour.id}`"
              class="rounded-xl aspect-square relative overflow-hidden"
            >
              <img
                :src="tour.images[0].url"
                :alt="tour.name"
                class="object-cover h-100 w-100"
              />
              <div
                class="absolute bottom-0 py-3 px-4 w-full flex items-end h-36 bg-gradient-to-t from-slate-950/50 to-slate-950/0"
              >
                <h3
                  class="text-white text-base md:text-md xl:text-xl font-bold"
                >
                  {{ tour.name }}
                </h3>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>

      <div class="col-span-1">
        <div class="border border-gray-50 rounded-lg p-4">
          <h2 class="text-2xl font-sans font-bold text-hgv-950 mb-3">
            {{ translations.contact[$i18n.locale] }}
          </h2>
          <a
            v-if="JSON.parse(guide.contact).mobile"
            class="flex items-center my-2"
            :href="'tel:' + JSON.parse(guide.contact).mobile"
            ><img src="/phone.svg" alt="phone" class="mr-2" />{{
              JSON.parse(guide.contact).mobile
            }}</a
          >
          <a
            v-if="JSON.parse(guide.contact).phone"
            class="flex items-center my-2"
            :href="'tel:' + JSON.parse(guide.contact).phone"
            ><img src="/phone.svg" alt="phone" class="mr-2" />{{
              JSON.parse(guide.contact).phone
            }}</a
          >
          <a
            v-if="JSON.parse(guide.contact).email"
            class="flex items-center my-2"
            :href="'mailto:' + JSON.parse(guide.contact).email"
            ><img src="/mail.svg" alt="mail" class="mr-2" />{{
              JSON.parse(guide.contact).email
            }}</a
          >
          <a
            v-if="JSON.parse(guide.contact).website"
            class="flex items-center my-2"
            :href="'//' + JSON.parse(guide.contact).website"
            target="_blank"
            ><img src="/web.svg" alt="website" class="mr-2" />{{
              JSON.parse(guide.contact).website
            }}</a
          >
        </div>
        <div
          v-if="guide.certificates.length > 0"
          class="mt-3 flex flex-col border border-gray-50 rounded-lg p-4"
        >
          <h2 class="text-2xl font-sans font-bold text-hgv-950 mb-2">
            {{ translations.certificates[$i18n.locale] }}
          </h2>
          <div
            v-for="certificate in guide.certificates"
            :key="certificate.id"
            class="flex items-center py-2"
          >
            <img
              :src="certificate.image ? certificate.image.url : '/verified.svg'"
              class="w-12 h-12 mr-3"
            />
            <p class="font-sans">{{ certificate.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'main',
  async asyncData({ $axios, params }) {
    try {
      const guide = await $axios.$get(
        `https://api.hamburger-gaestefuehrer.de/api/guides/${params.slug}`
      )
      return { guide: guide.guide }
    } catch (error) {
      console.log(error)
    }
  },

  data() {
    return {
      translations: {
        contact: {
          de: 'Kontakt',
          en: 'Contact',
        },
        certificates: {
          de: 'Zertifikate',
          en: 'Certificates',
        },
        languages: {
          de: 'Sprachen',
          en: 'Languages',
        },
        skills: {
          de: 'Themen',
          en: 'Themes',
        },
        mobility: {
          de: 'Fortbewegungsmittel',
          en: 'Means of transportation',
        },
        tours: {
          de: 'Touren',
          en: 'Tours',
        },
      },
    }
  },

  head() {
    return {
      title: this.guide.name
        ? this.guide.name + ' | Hamburger Gästeführer Verein e.V.'
        : 'Hamburger Gästeführer Verein e.V.',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.guide.description
            ? this.guide.description.slice(0, 200) + '...'
            : 'Wir vereinen nicht nur über 80 engagierte Guides, sondern bieten auch mehr als 70 verschiedene Führungen in 18 Sprachen an! Lauschen Sie bei einem Rundgang interessanten Fakten über die Stadt, erkunden Sie historisch entscheidende Orte auf dem Fahrrad oder erleben Sie Hamburgs Klassiker per Bus, Schiff oder zu Fuß: Bei unseren Führungen werden Sie mit Sicherheit fündig! ',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.guide.name
            ? this.guide.name + ' | Hamburger Gästeführer Verein e.V.'
            : 'Hamburger Gästeführer Verein e.V.',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.guide.description
            ? this.guide.description.slice(0, 200) + '...'
            : 'Wir vereinen nicht nur über 80 engagierte Guides, sondern bieten auch mehr als 70 verschiedene Führungen in 18 Sprachen an! Lauschen Sie bei einem Rundgang interessanten Fakten über die Stadt, erkunden Sie historisch entscheidende Orte auf dem Fahrrad oder erleben Sie Hamburgs Klassiker per Bus, Schiff oder zu Fuß: Bei unseren Führungen werden Sie mit Sicherheit fündig! ',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.guide.image ? this.guide.image[0].url : '',
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: 'https://hamburger-gaestefuehrer.de/guide/' + this.guide.id,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.guide.name
            ? this.guide.name + ' | Hamburger Gästeführer Verein e.V.'
            : 'Hamburger Gästeführer Verein e.V.',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.guide.description
            ? this.guide.description.slice(0, 200) + '...'
            : 'Wir vereinen nicht nur über 80 engagierte Guides, sondern bieten auch mehr als 70 verschiedene Führungen in 18 Sprachen an! Lauschen Sie bei einem Rundgang interessanten Fakten über die Stadt, erkunden Sie historisch entscheidende Orte auf dem Fahrrad oder erleben Sie Hamburgs Klassiker per Bus, Schiff oder zu Fuß: Bei unseren Führungen werden Sie mit Sicherheit fündig! ',
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.guide.image ? this.guide.image[0].url : '',
        },
      ],
    }
  },

  methods: {
    getUrl(guide) {
      if (!guide.image) {
        const canvas = document.createElement('canvas')
        canvas.width = 128
        canvas.height = 128
        const ctx = canvas.getContext('2d')

        const r = (Math.round(Math.random() * 127) + 127).toString(16)
        const g = (Math.round(Math.random() * 127) + 127).toString(16)
        const b = (Math.round(Math.random() * 127) + 127).toString(16)
        const color = '#' + r + g + b

        ctx.fillStyle = color
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        const contrast = Math.round(
          (parseInt(r, 16) * 299 +
            parseInt(g, 16) * 587 +
            parseInt(b, 16) * 114) /
            1000
        )

        if (contrast < 125) {
          ctx.fillStyle = '#ffffff'
        } else {
          ctx.fillStyle = '#000000'
        }

        ctx.font = 'bold 40px sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(
          guide.name
            .split(' ')
            .map((word) => word[0])
            .join(''),
          canvas.width / 2,
          canvas.height / 2
        )

        return canvas.toDataURL()
      } else {
        return guide.image[0].url
      }
    },
    generateContactOutput(guide) {
      const contact = JSON.parse(guide.contact)
      let output = ''
      for (const [key, value] of Object.entries(contact)) {
        if (value) {
          output += `<p class="font-sans"><strong>${key}:</strong> ${value}</p>`
        }
      }
      return output
    },
  },
}
</script>

<style></style>
