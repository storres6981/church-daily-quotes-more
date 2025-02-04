import React from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useState } from 'react';

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
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    }, () => {
      // Default to a central location if geolocation fails
      setCenter({ lat: 37.7749, lng: -122.4194 }); // San Francisco coordinates
    });
  }, []);

  const mapContainerStyle = {
    width: '100%',
    height: '100%'
  };

  const onLoad = () => {
    setIsLoaded(true);
  };

  return (
    <LoadScript 
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
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
                path: window.google.maps.SymbolPath.CIRCLE,
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
            {selectedChurch && (
              <InfoWindow
                position={{ 
                  lat: selectedChurch.latitude!, 
                  lng: selectedChurch.longitude! 
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