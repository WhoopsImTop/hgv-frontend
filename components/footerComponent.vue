<template>
  <div>
    <div class="content-container footer-container">
      <img
        src="/blue-angel-stripclub-wortbildmarke.svg"
        alt="blue-angle-logo"
        title="blue-angle-logo"
        width="170"
        style="margin-top: 10px"
      />
      <div class="link-container">
        <NuxtLink :to="LocalizePath('/impressum')">{{
          translations[locale].impressum
        }}</NuxtLink>
        <NuxtLink :to="LocalizePath('/datenschutzerklaerung')">{{
          translations[locale].datenschutzerklären
        }}</NuxtLink>
      </div>
      <div class="social-actions">
        <a href="https://www.facebook.com/blue.angel.breisach" target="_blank">
          <img src="/images/facebook.svg" alt="facebook" width="30" height="30"
        /></a>
        <a href="https://www.instagram.com/blue.angel.nightclub/" target="_blank"
          ><img
            src="/images/instagram.svg"
            alt="instagram"
            width="30"
            height="30"
        /></a>
      </div>
    </div>
    <div class="highlighted">
      <div class="content-container footer-credencials">
        <img
          src="/payments.png"
          alt="zahlungsmöglichleiten"
          title="zahlungsmöglichekiten"
          height="30"
          style="margin: 10px 0"
        />
        <p style="text-transform: uppercase; margin: 0">
          © 2023 Blue Angel Breisach
        </p>
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
          impressum: 'Impressum',
          datenschutzerklären: 'Datenschutzerklärung',
        },
        en: {
          impressum: 'Imprint',
          datenschutzerklären: 'Privacy Policy',
        },
        fr: {
          impressum: 'Mentions légales',
          datenschutzerklären: 'Politique de confidentialité',
        },
      },
      locale: this.$i18n.locale,
    }
  },
  methods: {
    LocalizePath(path) {
      return `/${this.$i18n.locale}${path}`
    },
  },
}
</script>

<style>

</style>