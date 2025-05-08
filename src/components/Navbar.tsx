import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Book as Roof, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 
      ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Roof size={32} className="text-primary-600" />
              <span className="ml-2 text-xl font-display font-bold text-gray-900">
                Amman  Roofing
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" label="Home" current={location.pathname === '/'} />
            <NavLink to="/products" label="Products" current={location.pathname === '/products'} />
            <NavLink to="/stocks" label="Stocks" current={location.pathname === '/stocks'} />
            <NavLink to="/contact" label="Contact" current={location.pathname === '/contact'} />
            
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center font-medium text-gray-700 hover:text-primary-600 transition-colors">
                  Admin <ChevronDown size={16} className="ml-1" />
                </button>
                <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="py-1">
                    <Link to="/admin/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Dashboard
                    </Link>
                    <button 
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <NavLink to="/admin" label="Admin" current={location.pathname === '/admin'} />
            )}
          </div>
          
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="text-gray-700 hover:text-primary-600 focus:outline-none"
            >
              {isOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={`md:hidden transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out fixed top-0 right-0 bottom-0 w-64 bg-white z-50 shadow-xl`}
      >
        <div className="flex justify-end p-4">
          <button 
            onClick={toggleMenu}
            className="text-gray-700 hover:text-primary-600 focus:outline-none"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col px-4 pt-2 pb-3 space-y-1">
          <MobileNavLink to="/" label="Home" />
          <MobileNavLink to="/products" label="Products" />
          <MobileNavLink to="/stocks" label="Stocks" />
          <MobileNavLink to="/contact" label="Contact" />
          
          {isAuthenticated ? (
            <>
              <MobileNavLink to="/admin/dashboard" label="Admin Dashboard" />
              <button 
                onClick={logout}
                className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary-600 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <MobileNavLink to="/admin" label="Admin" />
          )}
        </div>
      </div>
      
      {/* Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        ></div>
      )}
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  current: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label, current }) => (
  <Link
    to={to}
    className={`font-medium transition-colors ${
      current 
        ? 'text-primary-600' 
        : 'text-gray-700 hover:text-primary-600'
    }`}
  >
    {label}
  </Link>
);

interface MobileNavLinkProps {
  to: string;
  label: string;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, label }) => (
  <Link
    to={to}
    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary-600 rounded-md"
  >
    {label}
  </Link>
);

export default Navbar;