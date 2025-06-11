import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Logo from '../images/LogoChamp.png'


const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-sm shadow-md py-3' : 'bg-transparent py-5'
        }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center">
            <img src={Logo} alt="Champ Logo" className='h-14' />
          </a>

          {/* Desktop Navigation */}
          {/* <div className="hidden md:flex items-center space-x-8">
            <NavLinks isScrolled={isScrolled} />
            <HashLink 
              to="/#join"
              className="bg-gradient-to-r from-yellow-500 to-amber-400 text-black px-5 py-2 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/20"
            >
              Get Started
            </HashLink>
          </div> */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks isScrolled={isScrolled} />
            <a href="/go-dashboard" className="mt-2 text-yellow-400 hover:text-black border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium  text-sm px-5 py-2 rounded-full text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-black dark:hover:bg-yellow-400 dark:focus:ring-yellow-900">Get Started</a>

          </div>




          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 bg-black/95 backdrop-blur-sm shadow-lg' : 'max-h-0'
          }`}
      >
        <div className="px-4 py-3 space-y-3">
          <MobileNavLinks setIsOpen={setIsOpen} />
          <a
            href="/go-dashboard"
            className="block w-full bg-gradient-to-r from-yellow-500 to-amber-400 text-black px-5 py-2 rounded-full transition-all duration-300 text-center"
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
};

const NavLinks: React.FC<{ isScrolled: boolean }> = ({ isScrolled }) => {
  const linkClass = `font-medium transition-colors duration-300 ${isScrolled ? 'text-white hover:text-yellow-500' : 'text-white hover:text-yellow-400'
    }`;

  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <>
      <a href="/" className={linkClass}>
        Home
      </a>
      <div className="relative group">
        <button
          className={`${linkClass} flex items-center`}
          onClick={() => setProductsOpen(!productsOpen)}
        >
          Products <ChevronDown className="ml-1 h-4 w-4" />
        </button>
        <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-black/95 backdrop-blur-sm ring-1 ring-yellow-500/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
          <div className="py-1">
            <a href="/Private-sale-dashboard" className="block px-4 py-2 text-sm text-neutral-300 hover:text-yellow-500 hover:bg-yellow-500/10">Private Sale</a>
            <a href="champ-trade" className="block px-4 py-2 text-sm text-neutral-300 hover:text-yellow-500 hover:bg-yellow-500/10">CHAMP TRADE</a>
          </div>
        </div>
      </div>
      <a href="/services" className={linkClass}>
        Services
      </a>
      <a href="/about" className={linkClass}>
        About
      </a>
      <a href="/contact" className={linkClass}>
        Contact
      </a>
    </>
  );
};

const MobileNavLinks: React.FC<{ setIsOpen: (value: boolean) => void }> = ({ setIsOpen }) => {
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <>
      <a
        href="/"
        className="block font-medium text-white hover:text-yellow-500"
        onClick={() => setIsOpen(false)}
      >
        Home
      </a>
      <div>
        <button
          className="flex items-center justify-between w-full font-medium text-white hover:text-yellow-500"
          onClick={() => setProductsOpen(!productsOpen)}
        >
          Products <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${productsOpen ? 'transform rotate-180' : ''}`} />
        </button>
        <div className={`pl-4 mt-2 space-y-2 ${productsOpen ? 'block' : 'hidden'}`}>
          <a href="/Private-sale-dashboard" className="block text-neutral-400 hover:text-yellow-500" onClick={() => setIsOpen(false)}>PRIVATE SALE</a>
          <a href="/champ-trade" className="block text-neutral-400 hover:text-yellow-500" onClick={() => setIsOpen(false)}>CHAMP TRADE</a>
        </div>
      </div>
      <a
        href="/services"
        className="block font-medium text-white hover:text-yellow-500"
        onClick={() => setIsOpen(false)}
      >
        Services
      </a>
      <a
        href="/about"
        className="block font-medium text-white hover:text-yellow-500"
        onClick={() => setIsOpen(false)}
      >
        About
      </a>
      <a
        href="/contact"
        className="block font-medium text-white hover:text-yellow-500"
        onClick={() => setIsOpen(false)}
      >
        Contact
      </a>
    </>
  );
};

export default Navbar;