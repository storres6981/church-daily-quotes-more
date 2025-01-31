import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

const Profile = () => {
  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-3xl font-bold">Profile</h1>
      
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
            <p className="text-muted-foreground">Manage your account settings and preferences.</p>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Preferences</h2>
            <p className="text-muted-foreground">Customize your app experience.</p>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
            <p className="text-muted-foreground">Manage your notification settings.</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;