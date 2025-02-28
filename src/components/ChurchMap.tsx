import React from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { useState, useEffect, useMemo } from 'react';

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
  const [selectedChurch, setSelectedChurch] = useState<Church | null>(null);
  const [center, setCenter] = useState({ lat: 37.7749, lng: -122.4194 }); // Default to San Francisco
  const [mapKey, setMapKey] = useState<string>('');
  
  // Load API key from environment
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
    setMapKey(apiKey);
    
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          // Log error and keep default center if geolocation fails
          console.log('Geolocation error:', error.message);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser');
    }
  }, []);

  // Map configuration
  const mapContainerStyle = {
    width: '100%',
    height: '100%'
  };

  const options = useMemo(() => ({
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: true,
    mapTypeControl: true,
  }), []);

  // Only render the map if we have an API key
  if (!mapKey) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center p-4">
          <p className="text-muted-foreground mb-2">Google Maps API key is missing</p>
          <p className="text-sm">Set VITE_GOOGLE_MAPS_API_KEY in your environment</p>
        </div>
      </div>
    );
  }

  return (
    <LoadScript 
      googleMapsApiKey={mapKey}
      loadingElement={
        <div className="h-full flex items-center justify-center">
          <div className="text-center p-4">
            <p className="text-muted-foreground">Loading Google Maps...</p>
          </div>
        </div>
      }
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
      >
        {/* User location marker */}
        <Marker
          position={center}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 7,
            fillColor: "#4285F4", // Google blue
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: "#FFFFFF",
          }}
          title="Your location"
        />

        {/* Church markers */}
        {churches.map((church) => {
          if (church.latitude && church.longitude) {
            return (
              <Marker
                key={church.id}
                position={{ lat: church.latitude, lng: church.longitude }}
                onClick={() => setSelectedChurch(church)}
                icon={{
                  url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
                }}
              />
            );
          }
          return null;
        })}

        {/* Info window for selected church */}
        {selectedChurch && selectedChurch.latitude && selectedChurch.longitude && (
          <InfoWindow
            position={{ 
              lat: selectedChurch.latitude, 
              lng: selectedChurch.longitude 
            }}
            onCloseClick={() => setSelectedChurch(null)}
          >
            <div className="p-1">
              <h3 className="font-semibold">{selectedChurch.name}</h3>
              <p className="text-sm">{selectedChurch.address}</p>
              <button 
                className="text-xs text-blue-600 hover:underline mt-1"
                onClick={() => {
                  window.open(`https://www.google.com/maps/dir/?api=1&destination=${selectedChurch.latitude},${selectedChurch.longitude}`, '_blank');
                }}
              >
                Get directions
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default ChurchMap;
