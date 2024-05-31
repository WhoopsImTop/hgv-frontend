<template>
  <div>
    <div class="container mx-auto">
      <headerComponent />
      <div
        v-if="error.statusCode === 404"
        class="flex items-center justify-center flex-col text-center h-[70vh]"
      >
        <h1>404 - Seite nicht gefunden</h1>
        <p class="mt-3">Die Seite die Sie suchen existiert nicht.</p>
        <nuxt-link to="/" class="mt-3 bg-hgv-900 text-white px-3 py-2 rounded"
          >Zurück zur Startseite</nuxt-link
        >
      </div>
      <div
        v-else-if="error.statusCode === 500"
        class="flex items-center justify-center flex-col text-center h-[70vh]"
      >
        <h1>Ups da ist etwas schief gelaufen</h1>
        <p class="mt-3">Probiere es doch noch einmal.</p>
        <nuxt-link to="/" class="mt-3 bg-hgv-900 text-white px-3 py-2 rounded"
          >Zurück zur Startseite</nuxt-link
        >
      </div>
      <div
        v-else-if="error.stautsCode === 429"
        class="flex items-center justify-center flex-col text-center h-[70vh]"
      >
        <h1>Lass uns abkühlen...</h1>
        <p class="mt-3">
          Wir haben aktuell sehr viele anfragen, bitte versuchen Sie es erneut.
        </p>
        <nuxt-link to="/" class="mt-3 bg-hgv-900 text-white px-3 py-2 rounded"
          >Zurück zur Startseite</nuxt-link
        >
      </div>
    </div>
    <footerComponent />
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'error',
}
</script>
