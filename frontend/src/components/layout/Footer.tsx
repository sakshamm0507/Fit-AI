import { Github as GitHub, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-6 px-4 border-t border-dark-600 bg-dark-200/30 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} FitAI. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="#" 
              className="text-gray-400 hover:text-primary-500 transition-colors"
              aria-label="GitHub"
            >
              <GitHub size={20} />
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-primary-500 transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-primary-500 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;