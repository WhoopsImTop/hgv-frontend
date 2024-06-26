<template>
  <div>
    <div
      v-if="pageData.translations"
      class="mt-12 md:mt-32 grid grid-cols-1 md:grid-cols-2 gap-16"
    >
      <div>
        <h1 class="text-4xl font-sans font-bold text-hgv-950">
          {{ pageData.translations[$i18n.locale === 'de' ? 0 : 1].name }}
        </h1>
        <div
          id="description"
          class="font-sans text-hgv-950 mt-5 mb-1"
          v-html="
            pageData.translations[$i18n.locale === 'de' ? 0 : 1].description
          "
        ></div>
      </div>
      <random-image-generator />
    </div>
    <div
      v-else
      class="h-[calc(100vh-170px)] w-full flex flex-col justify-center items-center"
    >
      <div>
        <svg
          aria-hidden="true"
          class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-hgv-200 fill-hgv-950"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  layout: 'main',

  data() {
    return {
      pageData: {},
      loading: false,
      errorMessages: '',
    }
  },

  head() {
    const schema = {
      '@context': 'http://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Welche Voraussetzungen müssen mitgebracht werden, um Mitglied im Verein zu werden?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Um Mitglied zu werden, müssen Sie seit mindestens drei Jahren als Gästeführer/in in Hamburg tätig sein und aktuell als Gästeführer/in arbeiten.',
          },
        },
        {
          '@type': 'Question',
          name: 'Sind diese Voraussetzungen erfüllt, wie kann ich mich bewerben?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Melden Sie sich bei uns per E-Mail an info@hamburger-gaestefuehrer.de. Senden Sie uns einen tabellarischen Lebenslauf, mindestens zwei Empfehlungen von Auftraggebern, eine Empfehlung eines HGV-Mitglieds (falls vorhanden), und falls vorhanden, einen Ausbildungsnachweis zur Gästeführer/in.',
          },
        },
        {
          '@type': 'Question',
          name: 'Wie geht es dann mit der Bewerbung weiter?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nach Erhalt Ihrer vollständigen Bewerbung senden wir Ihnen einen Aufnahmeantrag. Nachdem Sie diesen ausgefüllt zurücksenden, laden wir Sie zu einem Vorstellungsgespräch ein. Die Entscheidung über die Aufnahme liegt beim Vorstand.',
          },
        },
        {
          '@type': 'Question',
          name: 'Vermittelt der Hamburger Gästeführer Verein Aufträge?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nein, der Verein vermittelt keine Aufträge.',
          },
        },
        {
          '@type': 'Question',
          name: 'Bildet der HGV zum anerkannten Gästeführer nach DIN EN aus?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ja, der HGV bildet Gästeführer nach den Richtlinien des BVGD (DIN EN-Zertifikat) aus. Die Termine für den Ausbildungszyklus finden Sie auf dieser Internetseite.',
          },
        },
        {
          '@type': 'Question',
          name: 'Ist die Ausbildung bzw. Zertifizierung kostenpflichtig und wird ein Bildungsgutschein anerkannt?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ja, sowohl die Ausbildung als auch die Zertifizierung sind kostenpflichtig. Die Höhe hängt von verschiedenen Faktoren ab. Ein Bildungsgutschein wird nicht anerkannt.',
          },
        },
      ],
    }

    return {
      title:
        this.$i18n.locale === 'de'
          ? 'FAQ | Hamburger Gästeführer Verein e.V.'
          : 'FAQ | Hamburger Gästeführer Verein e.V.',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            this.$i18n.locale === 'de'
              ? 'Häufig gestellte Fragen und Antworten zum Hamburger Gästeführer Verein e.V.'
              : 'Frequently asked questions and answers about the Hamburger Gästeführer Verein e.V.',
        },
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(schema),
        },
      ],
    }
  },

  beforeMount() {
    this.loading = true
    axios
      .get('https://api.hamburger-gaestefuehrer.de/api/pages/2')
      .then((res) => {
        this.pageData = res.data
        this.loading = false
      })
      .catch((error) => {
        console.log(error)
        this.errorMessages =
          'Wir haben akutell eine hohe Auslastung. Bitte versuchen Sie es später erneut.'
        this.loading = false
      })
  },
}
</script>

<style>
#description ul {
  list-style: disc;
  margin-left: 1.5rem;
}

#description ul li {
  margin-bottom: 0.5rem;
}
</style>
