import { AUTH_MODES, ROUTE_URL_AUTH } from '@/pages/Auth';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="wigth shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-primary">
                Lootopia
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link
              to={`${ROUTE_URL_AUTH}?mode=${AUTH_MODES.SIGN_IN}`}
              className="ml-8 inline-flex items-center px-4 py-2 border border-transparent text-base font-semibold rounded-md text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Connexion
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
