import { useState, useEffect } from "react";
import Logo from "../components/Logo";
import { supabase } from "../hooks/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check for existing session on component mount
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    checkSession();
  }, []);

  const handleSignUp = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      console.log(data);

      if (error) throw error;

      // Immediately update user state
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();
      setUser(currentUser);
      setSuccess(true);

      // Redirect to discover page after successful signup
      // navigate("/discover");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // If user is already logged in, redirect to discover
  if (user) {
    navigate("/");

    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Signup Card */}
      <div className="max-w-md w-full mx-auto p-8 bg-gray-400 bg-opacity-90 rounded-xl shadow-xl relative z-10">
        {/* Centered Logo */}
        <div className="flex justify-center mb-6">
          <Logo className="h-12" />
        </div>

        {success ? (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold mb-4">Check Your Email!</h2>
            <p className="text-gray-700">
              We've sent a confirmation link to <strong>{email}</strong>
            </p>
          </div>
        ) : (
          <>
            <header className="mb-6 text-center">
              <h1 className="text-2xl font-bold">
                Discover Unlimited Books with Premium
              </h1>
              <p className="text-gray-600 mt-2">
                The best authors and exclusive reads.
              </p>
            </header>

            <form onSubmit={handleSignUp} className="space-y-4">
              {/* Social Auth Buttons */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white py-3 px-4 rounded-lg hover:bg-gray-900 transition"
                onClick={() =>
                  supabase.auth.signInWithOAuth({ provider: "google" })
                }
              >
                <span>Sign up with Google</span>
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white bg-opacity-90 px-2 text-sm text-gray-500">
                    or
                  </span>
                </div>
              </div>

              {/* Email Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-700 hover:bg-green-800 text-white py-3 px-4 rounded-lg font-medium mt-6 transition disabled:opacity-70"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>
          </>
        )}

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
