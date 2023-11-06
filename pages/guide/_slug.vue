<template>
  <div>
    <div
      class="relative bg-gray-200 max-h-[256px] rounded-xl mx-auto w-full flex items-center justify-center"
    >
      <img
        class="object-cover w-full h-full max-h-[256px] rounded-xl"
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
                      '#' + skill.translations[$i18n.locale === 'de' ? 0 : 1].name
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
                class="object-cover h-100"
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
      const accesskey = 'fpsBXV7HBwRnN5B90GnMnIZYg2EtqCBTCGMMyBvjvtw'
      const secretkey = '-m9PfeP7BMEvsGE6HdU5QIWr2Hmb4-TfnTaszqbh_GI'
      const url = `https://api.unsplash.com/photos/random?query=hamburg%20tourism&orientation=landscape&client_id=${accesskey}&client_key=${secretkey}&count=1`
      const response = await fetch(url)
      const data = await response.json()
      return { guide: guide.guide, image: data[0] }
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

  methods: {
    getUrl(guide) {
      console.log(guide)
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
        return guide.image.url
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
