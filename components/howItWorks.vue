<template>
  <div class="my-64">
    <h2 class="text-center font-sans text-4xl font-bold text-hgv-950">
      {{ translations[$i18n.locale].title }}
    </h2>
    <p class="text-center mt-4 text-hgv-950">
      {{ translations[$i18n.locale].text }}
    </p>
    <div class="flex flex-col md:grid grid-cols-3 mt-8 md:mt-12">
      <div class="flex flex-col items-center max-md:my-8">
        <img src="../assets/tour.svg" alt="tour" title="tour" />
        <h3 class="text-center font-sans text-xl font-bold text-hgv-950 mt-2">
          Tour finden
        </h3>
      </div>
      <div class="flex flex-col items-center max-md:my-8">
        <img src="../assets/mail.svg" alt="Email" title="Email" />
        <h3 class="text-center font-sans text-xl font-bold text-hgv-950 mt-2">
          Gästeführer Anfragen
        </h3>
      </div>
      <div class="flex flex-col items-center max-md:my-8">
        <img
          src="../assets/verified.svg"
          alt="bestätigung"
          title="bestätigung"
        />
        <h3 class="text-center font-sans text-xl font-bold text-hgv-950 mt-2">
          Bestätigung vom Gästeführer
        </h3>
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
          title: "So funktioniert's",
          text: `So einfach können Sie eine Tour bei uns buchen.`,
        },
        en: {
          title: 'How it works',
          text: `This is how you can book a tour with us.`,
        },
      },
    }
  },
}
</script>

<style></style>
