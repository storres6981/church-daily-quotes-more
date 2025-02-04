import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Church {
  id: string;
  name: string;
  address: string;
  latitude?: number;
  longitude?: number;
}

interface ChurchMapProps {
  churches: Church[];
}

const ChurchMap = ({ churches }: ChurchMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    // Note: Replace with your Mapbox token
    mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN';
    
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [longitude, latitude],
        zoom: 12
      });

      // Add user location marker
      new mapboxgl.Marker({ color: '#FF0000' })
        .setLngLat([longitude, latitude])
        .addTo(map.current);

      // Add church markers
      churches.forEach(church => {
        if (church.latitude && church.longitude) {
          const popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <strong>${church.name}</strong>
              <p>${church.address}</p>
            `);

          new mapboxgl.Marker({ color: '#4B5563' })
            .setLngLat([church.longitude, church.latitude])
            .setPopup(popup)
            .addTo(map.current!);
        }
      });
    });

    return () => {
      map.current?.remove();
    };
  }, [churches]);

  return (
    <div className="w-full h-full">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default ChurchMap;