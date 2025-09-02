// src/pages/Login.jsx
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import PrimaryButton from "../components/button/PrimaryButton";
// import { useAuth } from "../context/useAuth";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import SocialLogin from "../components/Logincomponent/SocialLogin";
import RemembermeForm from "../components/Logincomponent/RemembermeForm";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithEmail, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signInWithEmail(formData.email, formData.password);
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("Google login error:", error);
      toast.error(error.message || "Failed to login with Google");
    }
  };

  return (
    <div className="min-h-[100dvh] bg-primary-100 flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-book p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-700 mb-2">
            Welcome Back
          </h1>
          <p className="text-neutral-600">
            Sign in to continue your book discovery journey
          </p>
        </div>

        {/* Login Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-neutral-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <RemembermeForm />

          <PrimaryButton className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </PrimaryButton>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-neutral-300"></div>
          <span className="px-3 text-sm text-neutral-500">or</span>
          <div className="flex-1 border-t border-neutral-300"></div>
        </div>

        {/* Social Login */}
        <SocialLogin
          handleGoogleLogin={handleGoogleLogin}
          isLoading={isLoading}
        />

        {/* Signup Link */}
        <div className="text-center mt-8">
          <p className="text-neutral-600">
            Don't have an account?{" "}
            <NavLink
              to="/signup"
              className="text-primary-600 hover:text-primary-700 font-semibold"
            >
              Create one
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
