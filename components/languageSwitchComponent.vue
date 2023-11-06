<template>
  <div class="flex items-center md:order-2 relative">
    <button
      type="button"
      data-dropdown-toggle="language-dropdown-menu"
      class="inline-flex items-center font-medium justify-center px-2 py-2 text-sm text-hgv-950 rounded-lg cursor-pointer font-sans"
    >
      <div class="w-4 h-4 rounded-full overflow-hidden mr-2">
        <img
          :src="selectedLanguage.language_image"
          alt="English"
          class="mr-2 object-cover w-full h-full"
        />
      </div>
      {{ selectedLanguage.language_names[currentLanguage].language_name }}
    </button>
    <!-- Dropdown -->
    <div
      class="absolute top-3 z-50 my-4 text-base list-none bg-white divide-y divide-hgv-100 rounded-lg shadow dark:bg-hgv-950"
      :class="{ block: isActive, hidden: !isActive }"
      id="language-dropdown-menu"
    >
      <ul class="py-2 font-medium" role="none">
        <li v-for="(language, index) in languages" :key="index">
          <nuxt-link
            :to="switchLocale(language.language_code)"
            class="block px-4 py-2 text-sm text-hgv-950 hover:bg-hgv-100"
            role="menuitem"
          >
            <div class="inline-flex items-center font-sans">
              <div class="w-4 h-4 rounded-full overflow-hidden mr-2">
                <img
                  :src="language.language_image"
                  :alt="language.language_names[currentLanguage].language_name"
                  class="mr-2 object-cover w-full h-full"
                />
              </div>
              {{ language.language_names[currentLanguage].language_name }}
            </div>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentLanguage: 'de',
      isActive: false,
      selectedLanguage: {
        language_code: 'de',
        language_names: {
          de: {
            language_name: 'Deutsch',
            language_image: '/languages/de.svg',
          },
          en: {
            language_name: 'German',
            language_image: '/languages/de.svg',
          },
        },
      },
      languages: [
        {
          language_code: 'de',
          language_names: {
            de: {
              language_name: 'Deutsch',
              language_image: '/languages/de.svg',
            },
            en: {
              language_name: 'German',
              language_image: '/languages/de.svg',
            },
          },
          language_image: '/languages/de.svg',
        },
        {
          language_code: 'en',
          language_names: {
            de: {
              language_name: 'Englisch',
              language_image: '/languages/en.svg',
            },
            en: {
              language_name: 'English',
              language_image: '/languages/en.svg',
            },
          },
          language_image: '/languages/en.svg',
        },
      ],
    }
  },
  watch: {
    '$i18n.locale': function (newLocale) {
      this.currentLanguage = newLocale
      this.selectedLanguage = this.languages.find(
        (lang) => lang.language_code === this.currentLanguage
      )
    },
  },
  mounted() {
    this.currentLanguage = this.$i18n.locale
    this.selectedLanguage = this.languages.find(
      (lang) => lang.language_code === this.currentLanguage
    )

    document.addEventListener('click', (event) => {
      if (event.target.closest('[data-dropdown-toggle]')) {
        this.isActive = !this.isActive
      } else {
        this.isActive = false
      }
    })
  },
  methods: {
    switchLocale(language) {
      return this.switchLocalePath(language)
    },
  },
}
</script>

<style></style>
