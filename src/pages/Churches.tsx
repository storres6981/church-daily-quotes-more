import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from "@/hooks/use-toast";
import { MapPin, Navigation, Phone, Globe, Search } from 'lucide-react';
import ChurchMap from '@/components/ChurchMap';

interface Church {
  id: string;
  name: string;
  address: string;
  distance: string;
  phone?: string;
  website?: string;
  rating?: number;
  latitude?: number;
  longitude?: number;
}

const Churches = () => {
  const [churches, setChurches] = useState<Church[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
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
        
        // Mock data for demonstration
        const mockChurches: Church[] = [
          {
            id: '1',
            name: 'First Baptist Church',
            address: '123 Main St',
            distance: '0.5 miles',
            phone: '(555) 123-4567',
            website: 'https://example.com',
            rating: 4.5,
            latitude: latitude + 0.01,
            longitude: longitude + 0.01
          },
          {
            id: '2',
            name: 'St. Mary\'s Catholic Church',
            address: '456 Church Ave',
            distance: '1.2 miles',
            phone: '(555) 234-5678',
            rating: 4.8,
            latitude: latitude - 0.01,
            longitude: longitude - 0.01
          },
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

  const filteredChurches = churches.filter(church => 
    church.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    church.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-3xl font-bold">Nearby Churches</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="h-[400px] rounded-lg overflow-hidden">
          <ChurchMap churches={churches} />
        </div>
        
        <Card className="p-4">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search churches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading nearby churches...
            </div>
          ) : (
            <ScrollArea className="h-[350px] pr-4">
              <div className="space-y-4">
                {filteredChurches.map((church) => (
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