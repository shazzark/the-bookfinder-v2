import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { supabase } from "../hooks/supabaseClient";

export default function Hero() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    checkAuth();
  }, []);

  return (
    <section className="min-h-[calc(100dvh-140px)] flex items-center justify-center px-6 ">
      <div className="max-w-[130rem] w-full mx-auto text-center p-8">
        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          The Easiest Way To Open Your World
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-600 mb-10">
          Discover the easiest way to explore, organize, and{" "}
          <span className="text-green-700 font-medium">fall in love</span> with
          books.
        </p>

        {/* Always show CTA, but link changes depending on login */}
        <NavLink
          to={user ? "/discover" : "/login"}
          className="bg-green-700 hover:bg-green-800 text-white font-medium px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
        >
          Try it Now
        </NavLink>

        {/* Footer note */}
        <p className="mt-12 text-xs text-gray-500 uppercase tracking-wider">
          SEARCH AND DISCOVER BOOKS FROM GLOBAL LIBRARIES
        </p>
      </div>
    </section>
  );
}
