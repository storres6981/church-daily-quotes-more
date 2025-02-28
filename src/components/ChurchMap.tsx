import React from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useState, useEffect } from 'react';

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
  const [isLoaded, setIsLoaded] = useState(false);
  const [mapKey, setMapKey] = useState<string>('');

  useEffect(() => {
    // Extract API key or set to empty string if not defined
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
        () => {
          // Keep default center if geolocation fails
          console.log('Geolocation permission denied or unavailable');
        }
      );
    }
  }, []);

  const mapContainerStyle = {
    width: '100%',
    height: '100%'
  };

  const onLoad = () => {
    setIsLoaded(true);
  };

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
      onLoad={onLoad}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
      >
        {isLoaded && (
          <>
            {/* User location marker */}
            <Marker
              position={center}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 7,
                fillColor: "#FF0000",
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: "#FFFFFF",
              }}
            />

            {/* Church markers */}
            {churches.map((church) => {
              if (church.latitude && church.longitude) {
                return (
                  <Marker
                    key={church.id}
                    position={{ lat: church.latitude, lng: church.longitude }}
                    onClick={() => setSelectedChurch(church)}
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
                <div>
                  <h3 className="font-semibold">{selectedChurch.name}</h3>
                  <p>{selectedChurch.address}</p>
                </div>
              </InfoWindow>
            )}
          </>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default ChurchMap;
