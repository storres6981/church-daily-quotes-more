import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container px-4 py-8 pb-24">
        <h1 className="text-4xl font-crimson font-bold text-center mb-8 text-primary">Profile</h1>
        
        <div className="text-center mb-8">
          <Link 
            to="/" 
            className="text-primary hover:text-primary/80 underline text-lg"
          >
            Return to Home Page
          </Link>
        </div>

        {/* Profile content will go here */}
      </div>
      <Navigation />
    </div>
  );
};

export default Profile;