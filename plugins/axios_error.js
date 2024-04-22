// Erstelle eine Datei namens axios.js in deinem plugins-Ordner
export default function ({ $axios, error }) {
    $axios.onError(err => {
      const code = parseInt(err.response && err.response.status)
      if (code === 404) {
        error({ statusCode: 404, message: 'Seite nicht gefunden' })
      } else {
        error({ statusCode: code, message: 'Es ist ein Fehler aufgetreten' })
      }
    })
  }
  