// src/pages/Signup.jsx
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import PrimaryButton from "../components/button/PrimaryButton";
// import { useAuth } from "../context/useAuth";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { signUpWithEmail, loginWithGoogle } = useAuth();
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

    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password should be at least 6 characters");
      setIsLoading(false);
      return;
    }

    try {
      await signUpWithEmail(formData.email, formData.password, formData.name);
      toast.success(
        "Account created successfully! Please check your email to confirm your account."
      );
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.message || "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("Google signup error:", error);
      toast.error(error.message || "Failed to sign up with Google");
    }
  };

  return (
    <div className="min-h-[100dvh] bg-primary-100 flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-book p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-700 mb-2">
            Create Account
          </h1>
          <p className="text-neutral-600">
            Join BookFinder and discover your next favorite book
          </p>
        </div>

        {/* Signup Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-neutral-700 mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter your name"
            />
          </div>

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
              minLength={6}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Create a password"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-neutral-700 mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Confirm your password"
            />
          </div>

          <PrimaryButton className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </PrimaryButton>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-neutral-300"></div>
          <span className="px-3 text-sm text-neutral-500">or</span>
          <div className="flex-1 border-t border-neutral-300"></div>
        </div>

        {/* Social Signup */}
        <div className="space-y-3">
          <button
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
            disabled={isLoading}
          >
            <span className="text-xl">📘</span>
            Sign up with Google
          </button>

          <button
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
            disabled
          >
            <span className="text-xl">📗</span>
            Sign up with Facebook
          </button>
        </div>

        {/* Login Link */}
        <div className="text-center mt-8">
          <p className="text-neutral-600">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="text-primary-600 hover:text-primary-700 font-semibold"
            >
              Sign in
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
