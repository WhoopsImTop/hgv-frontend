<template>
  <div class="flex flex-col lg:grid lg:grid-cols-12 gap-20 mt-4">
    <div class="col-span-6 flex flex-col justify-center">
      <h1
        class="font-sans text-hgv-950 font-bold text-6xl"
        v-html="title ?? translations[$i18n.locale].headline"
      ></h1>
      <div
        class="mt-4 lg:mb-28 text-hgv-950 introduction-text"
        v-html="description ?? translations[$i18n.locale].description"
      ></div>
    </div>
    <div
      class="col-span-6 bg-hgv-100 rounded-3xl relative flex justify-center align-center h-full min-h-full overflow-hidden"
    >
      <img
        class="object-cover w-full h-full aspect-square"
        :src="landingImage.image"
        alt="landing-image"
      />
      <div
        v-if="landingImage?.copyright"
        class="absolute bottom-0 left-0 px-3 pt-1 pb-2 rounded-tr-md bg-black/70"
      >
        <span class="text-white font-bold text-xs">
          © {{ landingImage.copyright }}
        </span>
      </div>
      <img
        class="absolute bottom-6 right-6 w-6 h-6 animate-spin-slow"
        src="/favicon.png"
        alt="hgv-logo"
      />
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
    title: String,
    description: String,
  },
  data() {
    return {
      landingImage: {},
      translations: {
        de: {
          headline: 'Hamburger <br> Gästeführer <br> Verein e.V.',
          description: `Herzlich willkommen in Hamburg! Wir vereinen nicht nur über 80 engagierte <a class="underline text-hgv_red-700" href="/guides">Guides</a>, sondern bieten auch mehr als 70 verschiedene Führungen in 18 Sprachen an! Lauschen Sie bei einem Rundgang interessanten Fakten über die Stadt, erkunden Sie historisch entscheidende Orte auf dem Fahrrad oder erleben Sie Hamburgs Klassiker per Bus, Schiff oder zu Fuß: Bei unseren <a class="underline text-hgv_red-700" href="/tour">Führungen</a>  werden Sie mit Sicherheit fündig! Wählen Sie einfach favorisierte Orte, Ihre Sprache, die Themen, die Sie interessieren sowie Ihr bevorzugtes Verkehrsmittel und fragen Sie die Tour direkt bei einem unserer Guides an.<br>
<br>
Sie möchten mehr über unser, unser Schaffen und unser Vereinsleben wissen? <a class="underline text-hgv_red-700" href="/about">Erfahren Sie hier alles zum HGV</a>.<br>
<br>
Sie sind selbst interessiert daran, unseren Gästen die schönste Stadt der Welt näher zu bringen? Dann freuen wir uns, wenn Sie in unserem Verein Mitglied werden möchten! <a class="underline text-hgv_red-700" href="/faq">Hier finden Sie die wichtigsten Fragen und Antworten</a> - wir sind gespannt auf Ihre Bewerbung!

`,
        },
        en: {
          headline: 'Hamburger <br> Gästeführer <br> Verein e.V.',
          description: `Welcome to Hamburg! Not only do we bring together over 80 dedicated <a class="underline text-hgv_red-700" href="/guides">guides</a>, we also offer more than 70 different guided tours in 18 languages! Listen to interesting facts about the city, explore historically important places by bike or experience Hamburg's classics by bus, boat or by foot: you will sure find what you are looking for on our <a class="underline text-hgv_red-700" href="/tour">guided tours!</a> Simply select your favourite places, your language, the topics that interest you as well as your preferred means of transport and request the tour directly from one of our guides.<br>
<br>
Would you like to know more about our organisation, our work and our club life? <a class="underline text-hgv_red-700" href="/about">Find out everything about the HGV here</a>.<br>
<br>
Are you interested in introducing our guests to the most beautiful city in the world? Then we would be delighted if you would like to become a member of our association! <a class="underline text-hgv_red-700" href="/faq">Here you will find our faqs</a> - we look forward to receiving your application!
`,
        },
      },
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
    }
  },
  mounted() {
    this.getRandomImage()
    this.changeSlideTimer()
  },
  beforeDestroy() {
    clearInterval(this.changeSlideTimer)
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
    changeSlideTimer() {
      setInterval(() => {
        this.getRandomImage()
      }, 10000)
    },
  },
}
</script>

<style>
.introduction-text a {
  @apply underline text-hgv_red-700 hover:text-hgv_red-900;
}
</style>
