import { useGoogleLogin } from '@react-oauth/google';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { FcGoogle } from 'react-icons/fc';

const GoogleLogin = () => {
  const { toast } = useToast();

  const login = useGoogleLogin({
    onSuccess: (response) => {
      console.log('Login Success:', response);
      toast({
        title: "Success",
        description: "Successfully logged in with Google!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to login with Google",
        variant: "destructive",
      });
    },
  });

  return (
    <Button 
      onClick={() => login()} 
      variant="outline"
      className="w-full flex items-center gap-2 justify-center"
    >
      <FcGoogle className="w-5 h-5" />
      Sign in with Google
    </Button>
  );
};

export default GoogleLogin;