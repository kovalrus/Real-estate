'use client';

import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface PropertyMapProps {
  address: string;
  city: string;
  state: string;
  zipcode: string;
}

// Create a singleton loader instance with proper error handling
const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
  version: 'weekly',
  libraries: ['places', 'geometry'],
  authReferrerPolicy: 'origin',
});

export default function PropertyMap({ address, city, state, zipcode }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const fullAddress = `${address}, ${city}, ${state} ${zipcode}`;
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        // Log the API key (remove in production)
        console.log('API Key:', process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
        
        if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
          throw new Error('Google Maps API key is not configured');
        }

        await loader.load();
        
        // Create geocoder after loading the API
        const geocoder = new google.maps.Geocoder();
        
        geocoder.geocode({ address: fullAddress }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
            // Clear previous marker if it exists
            if (markerRef.current) {
              markerRef.current.setMap(null);
            }

            // Create or update map
            if (!mapInstanceRef.current && mapRef.current) {
              mapInstanceRef.current = new google.maps.Map(mapRef.current, {
                center: results[0].geometry.location,
                zoom: 16,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
              });
            } else if (mapInstanceRef.current) {
              mapInstanceRef.current.setCenter(results[0].geometry.location);
            }

            // Create new marker
            markerRef.current = new google.maps.Marker({
              map: mapInstanceRef.current,
              position: results[0].geometry.location,
              animation: google.maps.Animation.DROP
            });
          }
        });
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    if (mapRef.current) {
      initMap();
    }

    // Cleanup function
    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
    };
  }, [fullAddress]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-[400px] rounded-lg shadow-md"
    />
  );
} 