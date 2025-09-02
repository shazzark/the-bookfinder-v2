// src/components/Header.jsx
// src/components/Header.jsx
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Navbar from "../navigation/Navbar";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../brand/Logo";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when window is resized above 1000px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1000) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update header height when layout changes
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, [isScrolled, isMobileMenuOpen]);

  return (
    <>
      <motion.header
        ref={headerRef}
        className="fixed top-0 z-40 w-full"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <AnimatePresence mode="wait">
          {isScrolled ? (
            // Compact header when scrolled
            <motion.div
              key="compact-header"
              className="bg-primary-200/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-center">
                <div className="w-full max-w-[1600px] flex items-center justify-between px-4 py-3">
                  {/* Logo on the left */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Logo compact={true} />
                  </motion.div>

                  {/* Regular navbar - hidden on mobile */}
                  <div className="hidden lg:block flex-1">
                    <Navbar compact={true} />
                  </div>

                  {/* Mobile menu button - positioned on the right */}
                  <button
                    className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-white/50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  >
                    {isMobileMenuOpen ? (
                      <XMarkIcon className="h-6 w-6" />
                    ) : (
                      <Bars3Icon className="h-6 w-6" />
                    )}
                  </button>
                </div>
              </div>

              {/* Mobile menu dropdown */}
              <AnimatePresence>
                {isMobileMenuOpen && (
                  <motion.div
                    className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/50"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-4 py-4">
                      <Navbar isMobile={true} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            // Regular header at top of page
            <motion.div
              key="regular-header"
              className="bg-primary-200 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-center">
                <div className="w-full max-w-[1600px] flex items-center justify-between px-6 py-6">
                  {/* Logo on the left */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Logo />
                  </motion.div>

                  {/* Regular navbar - hidden on mobile */}
                  <div className="hidden lg:block flex-1">
                    <Navbar />
                  </div>

                  {/* Mobile menu button - positioned on the right */}
                  <button
                    className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-white/50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  >
                    {isMobileMenuOpen ? (
                      <XMarkIcon className="h-6 w-6" />
                    ) : (
                      <Bars3Icon className="h-6 w-6" />
                    )}
                  </button>
                </div>
              </div>

              {/* Mobile menu dropdown */}
              <AnimatePresence>
                {isMobileMenuOpen && (
                  <motion.div
                    className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/50"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 py-6">
                      <Navbar isMobile={true} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Dynamic spacer based on header height */}
      <div style={{ height: `${headerHeight}px` }} />
    </>
  );
}
