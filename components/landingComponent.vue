<template>
  <div
    class="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:h-[calc(100vh-176px)] mt-4"
  >
    <div class="col-span-4 flex flex-col justify-center">
      <h1 class="font-sans text-hgv-950 font-bold text-6xl" v-html="translations[$i18n.locale].headline"></h1>
      <p class="mt-4 lg:mb-28 text-hgv-950">
        {{ translations[$i18n.locale].description }}
      </p>
    </div>
    <div
      class="col-span-8 bg-hgv-100 rounded-3xl relative flex justify-center align-center h-full min-h-full"
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
          description:
            'Wir bieten 70 verschiedene Führungen in 15 Sprachen an, darunter Bus- und Stadtrundfahrten zu vielfältigen Themen. Unser Verein vereint über 80 engagierte Guides. Schauen Sie sich unser Angebot an und treten Sie direkt in Kontakt.',
        },
        en: {
          headline: 'Hamburger <br> Gästeführer <br> Verein e.V.',
          description:
            'We offer 70 different tours in 15 languages, including bus and city tours on a variety of topics. Our association unites over 80 dedicated guides. Take a look at our offer and get in touch directly.',
        },
      },
    }
  },
}
</script>

<style></style>
