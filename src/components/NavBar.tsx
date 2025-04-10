
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Home, Calculator } from "lucide-react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const routes = [
    { name: "Home", path: "/", icon: <Home className="w-5 h-5" /> },
    { name: "Calculator", path: "/name-numerology", icon: <Calculator className="w-5 h-5" /> },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="glass border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link to="/" className="flex items-center space-x-2">
                <span className="text-xl font-medium">Numerology</span>
                <span className="text-xl font-light text-accent">Path</span>
              </Link>
            </div>

            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="bg-background/80 rounded-md p-2 inline-flex items-center justify-center text-foreground"
                aria-expanded="false"
              >
                <span className="sr-only">Open menu</span>
                {isOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>

            <nav className="hidden md:flex space-x-8">
              {routes.map((route) => (
                <Link
                  key={route.path}
                  to={route.path}
                  className={`flex items-center px-1 py-2 text-sm font-medium relative group ${
                    location.pathname === route.path ? "text-accent" : "text-foreground hover:text-accent"
                  }`}
                >
                  {location.pathname === route.path && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-x-0 -bottom-[10px] h-0.5 bg-accent"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {route.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        className={`absolute top-full inset-x-0 glass-dark md:hidden shadow-md ${isOpen ? "block" : "hidden"}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -10 }}
        transition={{ duration: 0.2 }}
      >
        <div className="pt-2 pb-4 px-2 space-y-1">
          {routes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center px-3 py-4 text-base font-medium ${
                location.pathname === route.path
                  ? "text-accent bg-accent/5 rounded-lg"
                  : "text-foreground hover:bg-accent/5 hover:text-accent rounded-lg"
              }`}
            >
              <span className="mr-3">{route.icon}</span>
              {route.name}
            </Link>
          ))}
        </div>
      </motion.div>
    </header>
  );
};

export default NavBar;
