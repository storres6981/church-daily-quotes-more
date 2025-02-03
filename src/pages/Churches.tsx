import { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const containerStyle = {
  width: '100%',
  height: '400px'
};

interface Church {
  id: string;
  name: string;
  address: string;
  distance: string;
  position: {
    lat: number;
    lng: number;
  };
}

const Churches = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState({ lat: 40.7128, lng: -74.0060 });
  const [churches, setChurches] = useState<Church[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          toast({
            title: "Location Access Denied",
            description: "Please enable location services to find nearby churches.",
            variant: "destructive",
          });
        }
      );
    }
  }, [toast]);

  const searchNearbyChurches = async () => {
    try {
      const service = new google.maps.places.PlacesService(
        new google.maps.Map(document.createElement('div'))
      );

      const request = {
        location: new google.maps.LatLng(userLocation.lat, userLocation.lng),
        radius: 5000,
        keyword: searchQuery || 'church',
        type: 'church'
      };

      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          const churchResults: Church[] = results.map((place) => ({
            id: place.place_id || Math.random().toString(),
            name: place.name || 'Unknown Church',
            address: place.vicinity || 'Address unavailable',
            distance: '${calculateDistance(userLocation, place.geometry?.location)} miles',
            position: {
              lat: place.geometry?.location?.lat() || userLocation.lat,
              lng: place.geometry?.location?.lng() || userLocation.lng
            }
          }));
          setChurches(churchResults);
        }
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch nearby churches. Please try again.",
        variant: "destructive",
      });
    }
  };

  const calculateDistance = (from: { lat: number; lng: number }, to: google.maps.LatLng | undefined) => {
    if (!to) return '0';
    const R = 3959; // Earth's radius in miles
    const lat1 = from.lat * Math.PI / 180;
    const lat2 = to.lat() * Math.PI / 180;
    const dLat = lat2 - lat1;
    const dLon = (to.lng() - from.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1) * Math.cos(lat2) * 
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(1);
  };

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
          <Button onClick={searchNearbyChurches}>
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>

        <LoadScript
          googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''}
          libraries={['places']}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={userLocation}
            zoom={13}
          >
            <Marker position={userLocation} />
            {churches.map((church) => (
              <Marker
                key={church.id}
                position={church.position}
                title={church.name}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </Card>

      <div className="space-y-4">
        {churches.map((church) => (
          <Card key={church.id} className="p-4 hover:bg-accent/50 transition-colors">
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-primary mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold">{church.name}</h3>
                <p className="text-muted-foreground text-sm">{church.address}</p>
                <p className="text-sm text-primary">{church.distance} away</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Churches;