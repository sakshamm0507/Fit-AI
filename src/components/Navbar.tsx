
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";

// Kendo UI components
import { Button } from "@progress/kendo-react-buttons";
import { Drawer, DrawerContent } from "@progress/kendo-react-layout";
import { AppBar, AppBarSection } from "@progress/kendo-react-layout";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Chat", path: "/chat" },
    { name: "Diet Plans", path: "/diet-plans" },
    { name: "Stats", path: "/stats" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled 
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <AppBar className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-transparent shadow-none">
        <AppBarSection className="flex items-center justify-between h-16 w-full">
          <Link 
            to="/" 
            className="font-display text-xl font-medium text-foreground"
            onClick={closeMenu}
          >
            <span className="text-gradient font-bold">FitAI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "relative text-sm font-medium transition-colors hover:text-primary",
                  isActive(item.path) 
                    ? "text-primary" 
                    : "text-foreground/80"
                )}
              >
                {item.name}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-[5px] left-0 right-0 h-[2px] bg-primary"
                    initial={false}
                  />
                )}
              </Link>
            ))}
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <ThemeToggle />
            <Button
              onClick={toggleMenu}
              className="text-foreground p-2 rounded-full hover:bg-secondary transition-colors"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </AppBarSection>
      </AppBar>

      {/* Mobile Navigation using Kendo Drawer */}
      <Drawer
        expanded={isOpen}
        position="start"
        mode="overlay"
        onOverlayClick={closeMenu}
        className="md:hidden"
      >
        <DrawerContent>
          <div className="px-4 pt-2 pb-4 bg-background dark:bg-gray-900 shadow-lg">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "py-2 px-3 rounded-md text-sm font-medium transition-colors",
                    isActive(item.path)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-secondary"
                  )}
                  onClick={closeMenu}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </DrawerContent>
      </Drawer>
    </header>
  );
};

export default Navbar;
