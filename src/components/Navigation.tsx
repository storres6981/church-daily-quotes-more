import { Home, Book, Church, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
      <div className="flex justify-around items-center p-4">
        <Link to="/" className={`${isActive('/') ? 'text-primary' : 'text-gray-500'}`}>
          <Home className="w-6 h-6" />
        </Link>
        <Link to="/bible" className={`${isActive('/bible') ? 'text-primary' : 'text-gray-500'}`}>
          <Book className="w-6 h-6" />
        </Link>
        <Link to="/churches" className={`${isActive('/churches') ? 'text-primary' : 'text-gray-500'}`}>
          <Church className="w-6 h-6" />
        </Link>
        <Link to="/profile" className={`${isActive('/profile') ? 'text-primary' : 'text-gray-500'}`}>
          <User className="w-6 h-6" />
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;