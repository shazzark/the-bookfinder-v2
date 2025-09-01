import { useEffect, useState } from "react";
import { supabase } from "../service/supabase";
import { AuthContext } from "./authContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial session
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const currentUser = session?.user
        ? {
            id: session.user.id,
            email: session.user.email,
            user_metadata: {
              avatar_url: session.user.user_metadata?.avatar_url,
              full_name: session.user.user_metadata?.full_name,
            },
          }
        : null;
      setUser(currentUser);
      setLoading(false);
    };

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      const currentUser = session?.user
        ? {
            id: session.user.id,
            email: session.user.email,
            user_metadata: {
              avatar_url: session.user.user_metadata?.avatar_url,
              full_name: session.user.user_metadata?.full_name,
            },
          }
        : null;
      setUser(currentUser);
    });

    getSession();

    return () => subscription.unsubscribe();
  }, []);

  // Fixed logout function
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
      window.location.href = "/login";
    }
  };

  // Google login function
  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) throw error;
  };

  // Email/password sign-up
  const signUpWithEmail = async (email, password, fullName) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName }, // custom metadata
          emailRedirectTo: window.location.origin, // optional
        },
      });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  // Email/password login
  const signInWithEmail = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    logout,
    loginWithGoogle,
    signUpWithEmail,
    signInWithEmail,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
