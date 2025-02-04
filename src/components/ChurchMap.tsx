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

  React.useEffect(() => {
    // Get user's location
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    });
  }, []);

  const mapContainerStyle = {
    width: '100%',
    height: '100%'
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
      >
        {/* User location marker */}
        <Marker
          position={center}
          icon={{
            url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23FF0000' width='24' height='24'%3E%3Ccircle cx='12' cy='12' r='8' stroke='white' stroke-width='2'/%3E%3C/svg%3E",
            scaledSize: new window.google.maps.Size(20, 20)
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
      </GoogleMap>
    </LoadScript>
  );
};

export default ChurchMap;