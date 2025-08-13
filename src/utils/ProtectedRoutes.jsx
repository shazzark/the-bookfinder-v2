// src/components/ProtectedRoute.jsx
// src/components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../hooks/supabaseClient";

export default function ProtectedRoute({ children, redirectTo = "/login" }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    checkSession();
    return () => subscription.unsubscribe();
  }, []);

  if (loading) return null;

  return user ? children : <Navigate to={redirectTo} replace />;
}
