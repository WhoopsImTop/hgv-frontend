<template>
  <nuxt-link
    :to="'/guide/' + guide.id"
    class="flex items-start border border-gray-50 rounded-xl pt-4 px-4 pb-3 text-decoration-none"
  >
    <div
      class="min-w-[48px] min-h-[48px] w-12 h-12 aspect-square rounded-full overflow-hidden flex items-center justify-center"
    >
      <img
        :src="getUrl(guide)"
        :alt="guide.name"
        class="object-cover rounded-full"
      />
    </div>
    <div class="ml-2">
      <h3 class="font-sans font-bold mb-2">
        {{ guide.name }}
      </h3>
      <p class="block mb-2 my-2">
        <a
          v-if="JSON.parse(guide.contact).email"
          class="flex items-center text-xs sm:text-base"
          :href="'mailto:' + JSON.parse(guide.contact).email"
          ><img src="/mail.svg" alt="mail" class="mr-2" />{{
            JSON.parse(guide.contact).email
          }}</a
        >
        <a
          v-if="JSON.parse(guide.contact).mobile"
          class="flex items-center text-xs sm:text-base"
          :href="'tel:' + JSON.parse(guide.contact).mobile"
          ><img src="/phone.svg" alt="mobile" class="mr-2" />{{
            JSON.parse(guide.contact).mobile
          }}</a
        >
      </p>
      <div class="flex items-center flex-wrap">
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
      <div class="flex items-center flex-wrap">
        <span
          v-for="mobil in guide.mobility"
          :key="mobil.id"
          class="py-1 rounde text-hgv-950 font-bold mb-2 mr-2 text-sm text-decoration-none"
        >
          <img
            :src="'/transportation/' + mobil.name + '.svg'"
            :alt="mobil.name"
            :title="mobil.translations[$i18n.locale === 'de' ? 0 : 1].name"
          />
        </span>
      </div>
      <div class="flex items-center flex-wrap">
        <span
          v-for="skill in guide.skills"
          :key="skill.id"
          class="py-1 rounde text-hgv-950 font-bold mr-2 text-sm text-decoration-none"
        >
          #{{ skill.translations[$i18n.locale === 'de' ? 0 : 1].name }}
        </span>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    guide: {
      type: Object,
      required: true,
    },
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
      } else if (Array.isArray(guide.image)) {
        return guide.image[0].url
      } else {
        return guide.image.url
      }
    },
  },
}
</script>

<style></style>
