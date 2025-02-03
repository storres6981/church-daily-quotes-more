import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from "@/hooks/use-toast";
import { MapPin, Navigation, Phone, Globe } from 'lucide-react';

interface Church {
  id: string;
  name: string;
  address: string;
  distance: string;
  phone?: string;
  website?: string;
  rating?: number;
}

const Churches = () => {
  const [churches, setChurches] = useState<Church[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const getNearbyChurches = async () => {
      if (!navigator.geolocation) {
        toast({
          title: "Error",
          description: "Geolocation is not supported by your browser",
          variant: "destructive",
        });
        return;
      }

      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        
        // Here you would typically make an API call to Google Places API
        // For now, we'll use mock data
        const mockChurches: Church[] = [
          {
            id: '1',
            name: 'First Baptist Church',
            address: '123 Main St',
            distance: '0.5 miles',
            phone: '(555) 123-4567',
            website: 'https://example.com',
            rating: 4.5
          },
          {
            id: '2',
            name: 'St. Mary\'s Catholic Church',
            address: '456 Church Ave',
            distance: '1.2 miles',
            phone: '(555) 234-5678',
            rating: 4.8
          },
          // Add more mock churches as needed
        ];

        setChurches(mockChurches);
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to get nearby churches",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    getNearbyChurches();
  }, [toast]);

  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-3xl font-bold">Nearby Churches</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="h-[400px] bg-accent rounded-lg">
          {/* Map component would go here */}
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            Map loading...
          </div>
        </div>
        
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Churches Near You</h2>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading nearby churches...
            </div>
          ) : (
            <ScrollArea className="h-[350px] pr-4">
              <div className="space-y-4">
                {churches.map((church) => (
                  <Card key={church.id} className="p-4 hover:bg-accent/50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{church.name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {church.address}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Navigation className="w-4 h-4" />
                          {church.distance}
                        </p>
                        {church.phone && (
                          <p className="text-sm flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {church.phone}
                          </p>
                        )}
                        {church.website && (
                          <a
                            href={church.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary flex items-center gap-1 hover:underline"
                          >
                            <Globe className="w-4 h-4" />
                            Visit website
                          </a>
                        )}
                      </div>
                      {church.rating && (
                        <div className="bg-primary/10 px-2 py-1 rounded">
                          ⭐ {church.rating}
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Churches;