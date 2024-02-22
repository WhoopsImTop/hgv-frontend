<template>
  <div ref="map" class="map" style="width: 100%; height: 100%"></div>
</template>

<script>
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

export default {
  props: ['tours', 'hoverId'],
  data() {
    return {
      map: null,
      mapMarkers: [],
    }
  },
  computed: {
    markers() {
      console.log(this.tours)
      if (Array.isArray(this.tours)) {
        return this.tours.map((tour) => {
          return {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [
                JSON.parse(tour.location).lng,
                JSON.parse(tour.location).lat,
              ],
            },
            properties: {
              title:
                (this.$i18n.locale === 'de'
                  ? tour.translations[0].name
                  : tour.translations[0].name) || tour.name,
              description:
                (this.$i18n.locale === 'de'
                  ? tour.translations[0].description
                  : tour.translations[0].description) || tour.description,
              image: tour.images ? tour.images[0] : null,
              id: tour.id,
            },
          }
        })
      } else {
        return []
      }
    },
  },
  mounted() {
    this.map = new maplibregl.Map({
      container: this.$refs.map,
      style:
        'https://api.maptiler.com/maps/streets-v2/style.json?key=tx0bWkeJlS2k9FWCMNgS',
      center: [9.993682, 53.551086], // starting position [lng, lat]
      zoom: 9, // starting zoom
    })

    if (this.markers.length > 0) this.addMarkers()
  },
  watch: {
    markers() {
      this.addMarkers()
    },
  },
  methods: {
    addMarkers() {
      this.removeMarkers()

      this.markers.forEach((marker) => {
        const pupup = new maplibregl.Popup({
          offset: -25,
        }).setHTML(
          `<div class="h-24 w-full aspect-video flex items-center overflow-hidden rounded-lg"><img class="object-cover" src="${
            marker.properties.image.url
          }" alt="${marker.properties.title}"></div>
          <h3 class="text-xl font-sans text-hgv-950 mt-2 mb-4">${
            marker.properties.title
          }</h3>
          <a class="font-sans" href="/tour/${marker.properties.id}">${
            this.$i18n.locale === 'de' ? 'Mehr erfahren' : 'Learn more'
          }</a>
          `
        )
        const mapMarker = new maplibregl.Marker()
          .setLngLat(marker.geometry.coordinates)
          .setPopup(pupup)
          .addTo(this.map)

        this.mapMarkers.push(mapMarker)
      })
    },
    removeMarkers() {
      // Remove all existing markers from the map
      this.mapMarkers.forEach((marker) => {
        marker.remove()
      })

      // Clear the array
      this.mapMarkers = []
    },
  },
}
</script>

<style></style>
