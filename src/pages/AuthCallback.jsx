import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../hooks/supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        navigate("/"); // Redirects to home page after confirmation
      }
    });
  }, [navigate]);

  return (
    <div className="grid place-items-center min-h-screen">
      <p>Completing your signup...</p>
    </div>
  );
}
