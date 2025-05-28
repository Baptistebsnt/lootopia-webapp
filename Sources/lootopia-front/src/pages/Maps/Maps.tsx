"use client"

import { useEffect, useRef, useState } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import openrouteservice from "openrouteservice-js"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { MapPin, Navigation, Route, Loader2 } from "lucide-react"
import { cn } from "@/shared/lib/utils"
import Layout from "@/Layout/Layout"


type MapsProps = {
  className?: string
}

const Maps = ({ className }: MapsProps) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<L.Map | null>(null)
  const routeLayerRef = useRef<L.GeoJSON | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasRoute, setHasRoute] = useState(false)

  const parisLatLng: [number, number] = [48.8566, 2.3522]
  const parisLonLat: [number, number] = [2.3522, 48.8566]

  const orsClient = new openrouteservice.Directions({
    api_key: import.meta.env.VITE_ORS_API_KEY ,
  })

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return

    const map = L.map(mapRef.current, {
      zoomControl: false,
    }).setView(parisLatLng, 13)

    mapInstance.current = map

    // Add zoom control to top right
    L.control
      .zoom({
        position: "topright",
      })
      .addTo(map)

    // Modern tile layer with better styling
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 20,
    }).addTo(map)

    // Custom marker icon
    const customIcon = L.divIcon({
      html: `
    <div class="flex items-center justify-center w-8 h-8 bg-black rounded-full border-2 border-white shadow-lg">
      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
      </svg>
    </div>
  `,
      className: "custom-marker",
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    })

    L.marker(parisLatLng, { icon: customIcon })
      .addTo(map)
      .bindPopup(`
  <div class="p-2">
    <div class="flex items-center gap-2 font-semibold text-gray-800">
      <svg class="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
      </svg>
      Paris - Point de départ
    </div>
  </div>
`)

    return () => {
      map.remove()
      mapInstance.current = null
    }
  }, [])

  const handleShowRoute = async () => {
    if (!navigator.geolocation || !mapInstance.current) {
      alert("Géolocalisation non supportée sur ce navigateur.")
      return
    }

    setIsLoading(true)

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const userLatLng: [number, number] = [pos.coords.latitude, pos.coords.longitude]
          const userLonLat: [number, number] = [pos.coords.longitude, pos.coords.latitude]

          // User location marker
          const userIcon = L.divIcon({
            html: `
    <div class="flex items-center justify-center w-8 h-8 bg-gray-600 rounded-full border-2 border-white shadow-lg animate-pulse">
      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
      </svg>
    </div>
  `,
            className: "user-marker",
            iconSize: [32, 32],
            iconAnchor: [16, 16],
          })

          L.marker(userLatLng, { icon: userIcon })
            .addTo(mapInstance.current!)
            .bindPopup(`
  <div class="p-2">
    <div class="flex items-center gap-2 font-semibold text-gray-800">
      <svg class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
      </svg>
      Vous êtes ici
    </div>
  </div>
`)
            .openPopup()

          const geojson = await orsClient.calculate({
            coordinates: [parisLonLat, userLonLat],
            profile: "driving-car",
            format: "geojson",
          })

          if (routeLayerRef.current) {
            mapInstance.current!.removeLayer(routeLayerRef.current)
          }

          const route = L.geoJSON(geojson as any, {
            style: {
              color: "#000000",
              weight: 4,
              opacity: 0.8,
              dashArray: "10, 5",
            },
          }).addTo(mapInstance.current!)

          routeLayerRef.current = route
          mapInstance.current!.fitBounds(route.getBounds(), { padding: [20, 20] })
          setHasRoute(true)
        } catch (error) {
          console.error("Erreur OpenRouteService:", error)
          alert("Erreur lors du calcul de l'itinéraire.")
        } finally {
          setIsLoading(false)
        }
      },
      (err) => {
        setIsLoading(false)
        alert("Erreur de géolocalisation : " + err.message)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    )
  }

  const clearRoute = () => {
    if (routeLayerRef.current && mapInstance.current) {
      mapInstance.current.removeLayer(routeLayerRef.current)
      routeLayerRef.current = null
      setHasRoute(false)
    }
  }

  return (
    <Layout>
    <div className={cn("w-full max-w-6xl mx-auto p-4", className)}>
      <Card className="overflow-hidden border-0 shadow-2xl bg-white">
        <CardHeader className="bg-black text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">Carte de Lootopia</CardTitle>
              <CardDescription className="text-gray-300">
                Découvrez votre itinéraire jusqu'à votre prochaine étape
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Button
              onClick={handleShowRoute}
              disabled={isLoading}
              className="flex-1 h-12 text-base font-semibold bg-black hover:bg-gray-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Calcul en cours...
                </>
              ) : (
                <>
                  <Navigation className="mr-2 h-5 w-5" />
                  Afficher l'itinéraire
                </>
              )}
            </Button>

            {hasRoute && (
              <Button
                onClick={clearRoute}
                variant="outline"
                className="h-12 text-base font-semibold border-2 border-black text-black hover:bg-black hover:text-white"
              >
                <Route className="mr-2 h-5 w-5" />
                Effacer l'itinéraire
              </Button>
            )}
          </div>

          <div className="relative rounded-xl overflow-hidden shadow-lg border border-gray-200">
            <div ref={mapRef} className="h-[500px] w-full bg-gray-100" />

            {/* Overlay for loading state */}
            {isLoading && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center backdrop-blur-sm">
                <div className="bg-white rounded-lg p-4 shadow-lg flex items-center gap-3 border border-gray-200">
                  <Loader2 className="h-5 w-5 animate-spin text-black" />
                  <span className="font-medium text-gray-700">Calcul de l'itinéraire...</span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 p-4 bg-gray-100 rounded-lg border border-gray-300">
            <div className="flex items-start gap-3">
              <div className="p-1 bg-black rounded-full">
                <MapPin className="h-4 w-4 text-white" />
              </div>
              <div className="text-sm text-gray-800">
                <p className="font-semibold mb-1">Comment ça marche ?</p>
                <p>
                  Cliquez sur "Afficher l'itinéraire" pour calculer automatiquement le chemin depuis Paris jusqu'à votre
                  position actuelle. Votre navigateur vous demandera l'autorisation d'accéder à votre localisation.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    </Layout>
  )
}

export default Maps
