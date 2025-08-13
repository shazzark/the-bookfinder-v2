// src/components/Header.jsx
import { useEffect, useState } from "react";
import { supabase } from "../hooks/supabaseClient";
import CTAButton from "./CTAButton";
import Logo from "./Logo";
import Navbar from "./Navbar";

export default function Header() {
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    checkAuth();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => subscription.subscription?.unsubscribe();
  }, []);

  return (
    <header className="fixed w-full z-50 py-2 px-4  backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Mobile menu button - more compact */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          type="button"
          className="p-1.5 text-gray-600 rounded-lg md:hidden hover:bg-gray-100/50 focus:outline-none"
          aria-controls="navbar-default"
          aria-expanded={mobileMenuOpen}
        >
          <span className="sr-only">Open menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Navigation and Auth Buttons - more compact */}
        <div
          className={`${
            mobileMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto h-[3.5rem]`}
          id="navbar-default"
        >
          <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
            <Navbar
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
            />
            <div className="mt-2 md:mt-0 md:ml-2">
              <CTAButton user={user} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
