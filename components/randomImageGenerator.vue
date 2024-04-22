<template>
  <div
    class="flex justify-center items-center relative rounded-xl overflow-hidden"
  >
    <img
      class="object-cover w-full h-full"
      :src="landingImage.image"
      alt="landing-image"
    />
    <div
      v-if="landingImage?.copyright"
      class="absolute px-3 pt-1 pb-2 rounded-tr-md bg-black/70"
      :class="
        translations || displayTopRight ? 'top-0 right-0' : 'bottom-0 left-0'
      "
    >
      <span class="text-white font-bold text-xs">
        © {{ landingImage.copyright }}
      </span>
    </div>
    <div
      v-if="translations"
      class="absolute bottom-0 py-3 px-4 w-full flex items-end h-36 bg-gradient-to-t from-slate-950/50 to-slate-950/0 flex-row justify-between"
    >
      <h1 class="font-sans text-4xl font-bold text-white">
        {{ translations.siteTitle[$i18n.locale] }}
      </h1>
    </div>
  </div>
</template>

<script>
import landing01 from '../static/1.jpg'
import landing02 from '../static/2.jpg'
import landing03 from '../static/3.jpg'
import landing04 from '../static/4.jpg'
import landing05 from '../static/5.jpg'
import landing06 from '../static/6.jpg'
import landing07 from '../static/7.jpg'
import landing08 from '../static/8.jpg'
import landing09 from '../static/9.jpg'
import landing10 from '../static/10.jpg'
export default {
  props: {
    translations: {
      type: Object,
      required: false,
      default: () => null,
    },
    displayTopRight: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      images: [
        {
          image: landing01,
          copyright: 'Patricia Witzigmann',
        },
        {
          image: landing02,
          copyright: 'Patricia Witzigmann',
        },
        {
          image: landing03,
          copyright: 'Patricia Witzigmann',
        },
        {
          image: landing04,
          copyright: 'Patricia Witzigmann',
        },
        {
          image: landing05,
          copyright: 'Patricia Witzigmann',
        },
        {
          image: landing06,
          copyright: 'Patricia Witzigmann',
        },
        {
          image: landing07,
          copyright: 'Patricia Witzigmann',
        },
        {
          image: landing08,
          copyright: 'Patricia Witzigmann',
        },
        {
          image: landing09,
          copyright: 'Patricia Witzigmann',
        },
        {
          image: landing10,
          copyright: 'Patricia Witzigmann',
        },
      ],
      landingImage: {},
    }
  },
  mounted() {
    this.getRandomImage()
  },
  methods: {
    getRandomImage() {
      if (this.landingImage === this.chooseRandomImage()) {
        this.getRandomImage()
      } else {
        this.landingImage = this.chooseRandomImage()
      }
    },
    chooseRandomImage() {
      return this.images[Math.floor(Math.random() * this.images.length)]
    },
  },
}
</script>

<style></style>
