import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-dark-200/90 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary-500">FitAI</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/chat"
              className={`nav-link ${isActive('/chat') ? 'active' : ''}`}
            >
              Chat
            </Link>
            <Link
              to="/diet-plans"
              className={`nav-link ${isActive('/diet-plans') ? 'active' : ''}`}
            >
              Diet Plans
            </Link>
            <Link
              to="/stats"
              className={`nav-link ${isActive('/stats') ? 'active' : ''}`}
            >
              Stats
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-500 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-gray-600" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-dark-500 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-dark-300/95 backdrop-blur-lg"
          >
            <div className="flex flex-col space-y-4 py-4 px-4">
              <Link
                to="/"
                className={`nav-link px-2 py-2 rounded-md ${
                  isActive('/') ? 'bg-gray-100 dark:bg-dark-500' : ''
                }`}
              >
                Home
              </Link>
              <Link
                to="/chat"
                className={`nav-link px-2 py-2 rounded-md ${
                  isActive('/chat') ? 'bg-gray-100 dark:bg-dark-500' : ''
                }`}
              >
                Chat
              </Link>
              <Link
                to="/diet-plans"
                className={`nav-link px-2 py-2 rounded-md ${
                  isActive('/diet-plans') ? 'bg-gray-100 dark:bg-dark-500' : ''
                }`}
              >
                Diet Plans
              </Link>
              <Link
                to="/stats"
                className={`nav-link px-2 py-2 rounded-md ${
                  isActive('/stats') ? 'bg-gray-100 dark:bg-dark-500' : ''
                }`}
              >
                Stats
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;