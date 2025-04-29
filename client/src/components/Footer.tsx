
import { Github, Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-tech-blue text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold mb-4">Renunciant<span className="text-tech-purple">Tech</span></h3>
            <p className="text-gray-300 mb-6">
              Innovative technology solutions for businesses of all sizes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-tech-purple transition-colors duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-tech-purple transition-colors duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-tech-purple transition-colors duration-300">
                <Linkedin size={18} />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-tech-purple transition-colors duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-tech-purple transition-colors duration-300">
                <Github size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: "Home", url: "#home" },
                { name: "About Us", url: "#about" },
                { name: "Services", url: "#services" },
                { name: "Products", url: "#products" },
                { name: "Contact", url: "#contact" }
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.url} className="text-gray-300 hover:text-tech-purple transition-colors duration-300">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-4">Our Services</h4>
            <ul className="space-y-2">
              {[
                "Software Development",
                "Cloud Computing",
                "Mobile Apps",
                "IT Consulting",
                "Data Analytics"
              ].map((service) => (
                <li key={service}>
                  <a href="#services" className="text-gray-300 hover:text-tech-purple transition-colors duration-300">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-4">Newsletter</h4>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-white/10 text-white px-4 py-2 rounded-l-md focus:outline-none flex-grow"
              />
              <button 
                type="submit" 
                className="bg-tech-purple hover:bg-tech-purple/80 px-4 py-2 rounded-r-md transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; {currentYear} Renunciant Technologies Pvt Ltd. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-tech-purple transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-tech-purple transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-tech-purple transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
