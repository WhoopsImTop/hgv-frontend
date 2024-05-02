<template>
  <div id="imprint">
    <div
      class="font-sans text-hgv-950 mt-5 mb-1"
      v-html="imprint[$i18n.locale]"
    ></div>
  </div>
</template>

<script>
export default {
  layout: 'main',

  async asyncData({ $content, $axios }) {
    const imprint = await $axios.$get(
      'https://api.hamburger-gaestefuehrer.de/api/pages/5'
    )
    const data = {}
    data.de = imprint.translations[0].description
    data.en = imprint.translations[1].description

    return { imprint: data }
  },

  data() {
    return {
      imprint: {
        de: `<h1>Impressum</h1>

<h2>Angaben gem&auml;&szlig; &sect; 5 TMG</h2>
<p>Hamburger G&auml;stef&uuml;hrer Verein e. V.<br />
Am Kaiserkai 69<br />
20457 Hamburg</p>

<p><strong>Vertreten durch:</strong><br />
Tomas Kaiser<br />
1. Vorsitzender<br />
<br />
Ronald L&uuml;hrs<br />
2. Vorsitzender</p>

<h2>Kontakt</h2>
<p>Telefon: 0151 50484148<br />
E-Mail: info@hamburger-gaestefuehrer.de</p>

<h2>Redaktionell verantwortlich</h2>
<p>Tomas Kaiser</p>

<h2>Bankverbindung:</h2>

<p>Bank: Hamburger Sparkasse</p>
<p>BIC: HASPDEHHXXX</p>
<p>IBAN: DE92 2005 0550 1236 1207 86

<h2>Registereintrag:</h2>

<p>Registergericht: Amtsgericht Hamburg</p>
<p>Vereinsregister: 15150</p>

<p>Der Verein wird rechtsgeschäftlich vertreten durch zwei Mitglieder des Vorstands.</p>

<h2>Fotos:</h2>

<p>Mit freundlicher Genehmigung von:</p>
<p>Hamburg Marketing GmbH</p>
<p>Mediaserver Hamburg- © mediaserver.hamburg.de_ Andreas Vallbracht</p>
<p>Mediaserver Hamburg- © mediaserver.hamburg.de_ThisIsJulia Photography</p>
<p>Mediaserver Hamburg- © mediaserver.hamburg.de_Christian Spahrbier</p>
<p>Mediaserver Hamburg- © mediaserver.hamburg.de_Jörg Modrow</p>
<p>Mediaserver Hamburg- © mediaserver.hamburg.de_CHRISTIAN BRANDES</p>
<p>Mediaserver Hamburg- © mediaserver.hamburg.de_Konstantin Beck</p>
<p>Mediaserver Hamburg- © mediaserver.hamburg.de_Ingo Boelter</p>
<p>Mediaserver Hamburg- © mediaserver.hamburg.de_Mattias Boem</p>
<p>Shutterstock-© shutterstock.de_2024561522</p>
<p>Hamburger Gästeführer Verein e.V.</p>

<h2>EU-Streitschlichtung</h2>
<p>Die Europ&auml;ische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a>.<br /> Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>

<h2>Verbraucher&shy;streit&shy;beilegung/Universal&shy;schlichtungs&shy;stelle</h2>
<p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>`,
        en: `<h1>Site Notice</h1>

<h2>Information pursuant to Sect. 5 German Telemedia Act (TMG)</h2>
<p>Hamburger G&auml;stef&uuml;hrer Verein e. V.<br />
Am Kaiserkai 69<br />
20457 Hamburg</p>

<p><strong>Represented by:</strong><br />
Tomas Kaiser<br />
1. Vorsitzender<br />
<br />
Ronald L&uuml;hrs<br />
2. Vorsitzender</p>

<h2>Contact</h2>
<p>Phone: 0151 50484148<br />
E-mail: info@hamburger-gaestefuehrer.de</p>

<h2>Person responsible for editorial</h2>
<p>Tomas Kaiser</p>

<h2>Bank Details:</h2>

<p>Bank: Hamburger Sparkasse</p>
<p>BIC: HASPDEHHXXX</p>
<p>IBAN: DE92 2005 0550 1236 1207 86</p>

<h2>Register Entry:</h2>

<p>Court of Registration: Amtsgericht Hamburg</p>
<p>Association Register: 15150</p>

<p>The association is legally represented by two members of the board.</p>

<h2>Photos:</h2>

<p>With kind permission from:</p>
<p>Hamburg Marketing GmbH</p>
<p>Mediaserver Hamburg- © mediaserver.hamburg.de_Piet Niemann</p>
<p>Mediaserver Hamburg- © mediaserver.hamburg.de_Julia Schwendner</p>
<p>Mediaserver Hamburg- © mediaserver.hamburg.de_Uta Gleiser</p>
<p>Mediaserver Hamburg- © mediaserver.hamburg.de_André Reuter</p>
<p>KZ_Gedenkstätte_Neuengamme_Michael Kottmeier_2005_ANg 2014-479</p>


<h2>EU dispute resolution</h2>
<p>The European Commission provides a platform for online dispute resolution (ODR): <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a>.<br /> Our e-mail address can be found above in the site notice.</p>

<h2>Dispute resolution proceedings in front of a consumer arbitration board</h2>
<p>We are not willing or obliged to participate in dispute resolution proceedings in front of a consumer arbitration board.</p>`,
      },
    }
  },
}
</script>

<style>
#imprint h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
}
</style>
