import { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 40.7128,
  lng: -74.0060
};

const Churches = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-3xl font-bold">Find Churches</h1>
      
      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <Input
            placeholder="Search churches nearby..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button>
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>

        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
          >
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </Card>
    </div>
  );
};

export default Churches;