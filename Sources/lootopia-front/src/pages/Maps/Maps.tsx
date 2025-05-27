import { TLayoutPage } from '@/Layout';
import Layout from '@/Layout/Layout';
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import openrouteservice from 'openrouteservice-js';

export type TMaps = TLayoutPage;

const Maps = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const routeLayerRef = useRef<L.GeoJSON | null>(null);

  const parisLatLng: [number, number] = [48.8566, 2.3522]; // lat, lon
  const parisLonLat: [number, number] = [2.3522, 48.8566]; // lon, lat (pour ORS)

  const orsClient = new openrouteservice.Directions({
    api_key: import.meta.env.VITE_ORS_API_KEY, // 🔁 remplace par ta clé OpenRouteService
  });

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current).setView(parisLatLng, 13);
    mapInstance.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

   const crossIcon = L.icon({
    iconUrl: 'cross.png',
    iconSize: [70, 70], // largeur, hauteur
    iconAnchor: [15, 15], // le "point" de la croix (centre)
  });

    L.marker(parisLatLng, { icon: crossIcon })
      .addTo(map)
      .bindPopup('📍 Paris - Point de départ');

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  const handleShowRoute = () => {
    if (!navigator.geolocation || !mapInstance.current) {
      alert('Géolocalisation non supportée sur ce navigateur.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const userLatLng: [number, number] = [
          pos.coords.latitude,
          pos.coords.longitude,
        ];
        const userLonLat: [number, number] = [
          pos.coords.longitude,
          pos.coords.latitude,
        ];

        L.marker(userLatLng)
          .addTo(mapInstance.current!)
          .bindPopup('📍 Vous êtes ici')
          .openPopup();

        try {
          const geojson = await orsClient.calculate({
            coordinates: [parisLonLat, userLonLat],
            profile: 'driving-car',
            format: 'geojson',
          });

          if (routeLayerRef.current) {
            mapInstance.current!.removeLayer(routeLayerRef.current);
          }

          const route = L.geoJSON(geojson as any, {
            style: { color: 'blue', weight: 4 },
          }).addTo(mapInstance.current!);

          routeLayerRef.current = route;
          mapInstance.current!.fitBounds(route.getBounds());
        } catch (error) {
          console.error('Erreur OpenRouteService:', error);
          alert('Erreur lors du calcul de l’itinéraire.');
        }
      },
      (err) => {
        alert('Erreur de géolocalisation : ' + err.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <Layout>
      <h1>🗺️ Bienvenue sur la carte de Lootopia</h1>
      <p>Clique sur le bouton pour afficher ton itinéraire jusqu'à Paris.</p>

      <button
        onClick={handleShowRoute}
        style={{
          padding: '10px 20px',
          margin: '1rem 0',
          borderRadius: '8px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        🧭 Afficher le trajet routier
      </button>

      <div
        ref={mapRef}
        style={{
          height: '500px',
          width: '100%',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      />
    </Layout>
  );
};

export default Maps;
