<template>
  <div
    class="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:h-[calc(100vh-176px)] mt-4"
  >
    <div class="col-span-5 flex flex-col justify-center">
      <h1
        class="font-sans text-hgv-950 font-bold text-6xl"
        v-html="translations[$i18n.locale].headline"
      ></h1>
      <p
        class="mt-4 lg:mb-28 text-hgv-950"
        v-html="translations[$i18n.locale].description"
      ></p>
    </div>
    <div
      class="col-span-7 bg-hgv-100 rounded-3xl relative flex justify-center align-center h-full min-h-full"
    >
      <img
        class="object-cover overflow-hidden rounded-3xl"
        src="/landing-image.png"
        alt="landing-image"
      />
      <div
        class="hidden md:felx absolute items-center -bottom-6 rounded-lg bg-hgv-100 px-2 py-2"
      >
        <input
          class="ring-1 ring-hgv-950 rounded py-2 px-2 focus:ring-0 mx-2"
          type="text"
          placeholder="Kategorie"
        />
        <input
          class="ring-1 ring-hgv-950 rounded py-2 px-2 focus:ring-0 mx-2"
          type="text"
          placeholder="Sprache"
        />
        <button
          class="bg-hgv-950 ring-1 ring-hgv-950 mx-2 px-4 py-2 rounded text-white"
        >
          Tour finden
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    }
  },
}
</script>

<style scoped>
</style>
