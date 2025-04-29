
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Products', href: '#products' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`w-full ${isSticky ? 'navbar-sticky' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center py-3">
        <div className="flex items-center">
          <a href="#" className="flex items-center">
            <span className="text-2xl font-bold text-tech-blue font-heading">Renunciant<span className="text-tech-purple">Tech</span></span>
          </a>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-tech-dark-gray hover:text-tech-purple transition-colors duration-300 hover-underline-animation font-medium"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Contact Button */}
        <div className="hidden md:block">
          <Button className="tech-button">
            Get In Touch
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-tech-blue focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-lg animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-tech-dark-gray hover:text-tech-purple transition-colors duration-300 py-2 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Button className="tech-button w-full mt-2">
              Get In Touch
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
