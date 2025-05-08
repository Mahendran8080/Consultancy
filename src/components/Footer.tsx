import React from 'react';
import { Link } from 'react-router-dom';
import { Book as Roof, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Roof size={28} className="text-primary-400" />
              <span className="ml-2 text-xl font-display font-bold">Sri Amman Roofing</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-xs">
              Providing quality roofing solutions for residential and commercial properties since 2022.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<Facebook size={20} />} link="#" />
              <SocialIcon icon={<Instagram size={20} />} link="#" />
              <SocialIcon icon={<Twitter size={20} />} link="#" />
              <SocialIcon icon={<Linkedin size={20} />} link="#" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink to="/" label="Home" />
              <FooterLink to="/products" label="Products" />
              <FooterLink to="/stocks" label="Stocks" />
              <FooterLink to="/contact" label="Contact" />
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <FooterLink to="/#services" label="Residential Roofing" />
              <FooterLink to="/#services" label="Commercial Roofing" />
              <FooterLink to="/#services" label="Roof Repairs" />
              <FooterLink to="/#services" label="Roof Inspections" />
              <FooterLink to="/#services" label="Gutter Installation" />
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone size={18} className="mt-1 mr-3 text-primary-400" />
                <span>75388 59982</span>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="mt-1 mr-3 text-primary-400" />
                <span>sriammanroofings@gmail.com</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mt-1 mr-3 text-primary-400" />
                <span>Annai Satya Nagar, Kanakagiri, Kakapalayam, Salem</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Sri Amman Roofing. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm hover:text-primary-400 cursor-pointer">Privacy Policy</span>
              <span className="text-gray-400 text-sm hover:text-primary-400 cursor-pointer">Terms of Service</span>
              <span className="text-gray-400 text-sm hover:text-primary-400 cursor-pointer">Sitemap</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  to: string;
  label: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ to, label }) => (
  <li>
    <Link 
      to={to} 
      className="text-gray-400 hover:text-primary-400 transition-colors"
    >
      {label}
    </Link>
  </li>
);

interface SocialIconProps {
  icon: React.ReactNode;
  link: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ icon, link }) => (
  <a 
    href={link} 
    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-primary-600 hover:text-white transition-colors"
    target="_blank" 
    rel="noopener noreferrer"
  >
    {icon}
  </a>
);

export default Footer;
