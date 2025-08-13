import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { supabase } from "../hooks/supabaseClient";
import { useEffect, useState } from "react";

export default function AppLayout() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);
  return (
    <div className="relative min-h-screen">
      {/* Responsive Background Container */}
      <div className="fixed inset-0 -z-10">
        <img
          src="/backgroundImg.jpg"
          alt="Decorative background"
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.2 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b "></div>
      </div>

      {/* Fixed Header */}
      <Header user={user} />

      {/* Main content container with consistent max-width and centering */}
      <main className="max-w-[150rem] w-full mx-auto pt-24 pb-10 px-6">
        {" "}
        {/* Matches header's max-width */}
        <Outlet /> {/* All page content will inherit this centered layout */}
      </main>
    </div>
  );
}
