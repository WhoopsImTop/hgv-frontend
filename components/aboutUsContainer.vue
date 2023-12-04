<template>
  <div class="text-center lg:w-4/6 mx-auto my-64">
    <h2 class="font-sans text-4xl font-bold text-hgv-950">{{ translations[$i18n.locale].title }}</h2>
    <p class="mt-4 text-hgv-950" v-html="translations[$i18n.locale].text">
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      translations: {
        de: {
          title: "Über den HGV e.V.",
          text: `Der Hamburger Gästeführer Verein e. V. (HGV) wurde am 28. November 1995
          gegründet und ist der Berufsverband für erfahrene Gästeführerinnen und
          Gästeführer in Hamburg. Als Interessenvertretung agiert der HGV gegenüber
          Tourismuseinrichtungen, Behörden und Verbänden. <br><br> Unser Hauptziel ist die
          Sicherstellung hoher Qualitätsstandards durch kontinuierliche Weiter- und
          Neuausbildung unserer Mitglieder. Wir bieten regelmäßige Fort- und
          Weiterbildungsmaßnahmen zu verschiedenen Themen an. Neue Guides haben die
          Möglichkeit, nach Bedarf an Neuausbildungen teilzunehmen und können nach
          mindestens drei Jahren professioneller Gästeführung in Hamburg und der
          Metropolregion ordentliches Mitglied im Hamburger Gästeführer Verein zu
          werden.`,
        },
        en: {
          title: "About the HGV e.V.",
          text: `The Hamburger Gästeführer Verein e. V. (HGV) was founded on November 28, 1995
          founded and is the professional association for experienced tour guides and
          Tour guides in Hamburg. The HGV acts as an interest group
          Tourism facilities, authorities and associations. <br> <br> Our main goal is the
          Ensuring high quality standards through continuous further and
          Further training of our members. We offer regular further and
          Further training on various topics. New guides have the
          Opportunity to participate in new training courses as required and can
          become a full member of the Hamburger Gästeführer Verein after
          at least three years of professional guest management in Hamburg and the
          Metropolitan region.`,
        }
      },
    };
  },
}
</script>

<style>
</style>