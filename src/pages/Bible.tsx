import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

const Bible = () => {
  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-3xl font-bold">Bible</h1>
      
      <Tabs defaultValue="read" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="read">Read</TabsTrigger>
          <TabsTrigger value="search">Search</TabsTrigger>
          <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="read">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Read the Bible</h2>
            <p className="text-muted-foreground">Select a book, chapter, and verse to start reading.</p>
          </Card>
        </TabsContent>
        
        <TabsContent value="search">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Search</h2>
            <p className="text-muted-foreground">Search the Bible by keyword or reference.</p>
          </Card>
        </TabsContent>
        
        <TabsContent value="bookmarks">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Bookmarks</h2>
            <p className="text-muted-foreground">Access your saved verses and chapters.</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Bible;