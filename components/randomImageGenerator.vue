<template>
  <div
    class="flex justify-center items-center relative rounded-xl overflow-hidden"
  >
    <transition name="fade" mode="out-in" class="z-10">
      <img
        :key="landingImage.image"
        class="object-cover w-full h-full"
        :src="landingImage.image"
        alt="landing-image"
      />
    </transition>
    <transition v-if="prevImage.image" name="fade" mode="out-in">
      <img
        :key="prevImage.image"
        class="object-cover w-full h-full absolute top-0 left-0 right-0 bottom-0"
        :src="prevImage.image"
        alt="landing-image"
      />
    </transition>
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
import landing05 from '../static/5.JPG'
import landing06 from '../static/6.JPG'
import landing07 from '../static/7.JPG'
import landing08 from '../static/8.JPG'
import landing09 from '../static/9.jpg'
import landing10 from '../static/10.jpg'
import landing11 from '../static/11.jpeg'
import landing12 from '../static/12.jpeg'
import landing13 from '../static/13.jpeg'
import landing14 from '../static/14.jpeg'
import landing15 from '../static/15.jpeg'
import landing16 from '../static/16.jpeg'
import landing17 from '../static/17.jpeg'
import landing18 from '../static/18.jpeg'
import landing19 from '../static/19.jpeg'
import landing20 from '../static/20.jpeg'
import landing21 from '../static/21.jpeg'
import landing22 from '../static/22.jpeg'
import landing23 from '../static/23.jpeg'
import landing24 from '../static/24.jpeg'
import landing25 from '../static/25.jpeg'
import landing26 from '../static/26.jpeg'
import landing27 from '../static/27.jpeg'
import landing28 from '../static/28.jpg'
import landing29 from '../static/29.jpg'
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
        {
          image: landing11,
          copyright: 'Hamburger Gästeführer e.V.',
        },
        {
          image: landing12,
          copyright: 'Hamburger Gästeführer e.V.',
        },
        {
          image: landing13,
          copyright: 'Hamburger Gästeführer e.V.',
        },
        {
          image: landing14,
          copyright: 'Hamburger Gästeführer e.V.',
        },
        {
          image: landing15,
          copyright: 'Hamburger Gästeführer e.V.',
        },
        {
          image: landing16,
          copyright: 'Hamburger Gästeführer e.V.',
        },
        {
          image: landing17,
          copyright: 'Hamburger Gästeführer e.V.',
        },
        {
          image: landing18,
          copyright: 'Hamburger Gästeführer e.V.',
        },
        {
          image: landing19,
          copyright: 'Hamburger Gästeführer e.V.',
        },
        {
          image: landing20,
          copyright: 'Hamburger Gästeführer e.V.',
        },
        {
          image: landing21,
          copyright: 'Hamburger Gästeführer e.V.',
        },
        {
          image: landing22,
          copyright: 'Hamburger Gästeführer e.V.',
        },
        {
          image: landing23,
          copyright: 'Hamburger Gästeführer e.V.',
        },
        {
          image: landing24,
          copyright: 'Hamburger Gästeführer e.V.',
        },
        {
          image: landing25,
          copyright: 'Hamburger Gästeführer e.V.',
        },
        {
          image: landing26,
          copyright: 'Hamburger Gästeführer e.V.',
        },
        {
          image: landing27,
          copyright: 'Hamburger Gästeführer e.V.',
        },
        {
          image: landing28,
          copyright: 'Hamburger Gästeführer e.V.',
        },
        {
          image: landing29,
          copyright: 'Hamburger Gästeführer e.V.',
        },
      ],
      landingImage: {},
      prevImage: {},
    }
  },
  beforeMount() {
    this.getRandomImage()
    this.changeImages()
  },
  methods: {
    getRandomImage() {
      if (this.landingImage === this.chooseRandomImage()) {
        this.getRandomImage()
      } else {
        this.landingImage = this.chooseRandomImage()
        this.prevImage = this.landingImage
      }
    },
    chooseRandomImage() {
      return this.images[Math.floor(Math.random() * this.images.length)]
    },
    changeImages() {
      setInterval(() => {
        this.getRandomImage()
        setTimeout(() => {
          this.prevImage = this.landingImage
        }, 500)
      }, 8000)
    },
  },
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
