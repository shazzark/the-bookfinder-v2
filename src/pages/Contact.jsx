// src/pages/Contact.jsx
import { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { supabase } from "../lib/supabase";
import PrimaryButton from "../components/button/PrimaryButton";
import { supabase } from "../service/supabase";
import { useAuth } from "../hooks/useAuth";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });
  const { user } = useAuth();

  // Pre-fill form if user is logged in
  useState(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.user_metadata?.full_name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });

    try {
      const { error } = await supabase
        .from("contact_submissions")
        .insert([
          {
            user_id: user?.id || null,
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          },
        ])
        .select();

      if (error) throw error;

      setSubmitStatus({
        type: "success",
        message:
          "Message sent successfully! We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        name: user ? user.user_metadata?.full_name || "" : "",
        email: user ? user.email || "" : "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({
        type: "error",
        message: "Failed to send message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br    to-neutral-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about BookFinder? We'd love to hear from you.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Contact Information - Left Side */}
            <div className="bg-gradient-to-br from-neutral-200 to-neutral-300 text-black p-8 md:p-12">
              <h2 className="text-2xl font-bold mb-8">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-white/20 p-3 rounded-lg mr-4 flex-shrink-0">
                    <span className="text-xl">📧</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-black">support@bookfinder.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white/20 p-3 rounded-lg mr-4 flex-shrink-0">
                    <span className="text-xl">📱</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-black">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white/20 p-3 rounded-lg mr-4 flex-shrink-0">
                    <span className="text-xl">📍</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-black">
                      123 Library Lane
                      <br />
                      Bookville, BK 12345
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-blue-400/30">
                <p className="text-black">
                  Usually respond within{" "}
                  <span className="font-semibold text-white">24 hours</span>
                </p>
              </div>

              {/* Decorative elements */}
              <div className="mt-12 opacity-50">
                <div className="text-6xl font-serif italic opacity-30">"</div>
                <p className="text-lg text-black mt-2">
                  WE'RE HERE TO HELP YOU DISCOVER YOUR NEXT FAVORITE BOOK
                </p>
              </div>
            </div>

            {/* Contact Form - Right Side */}
            <div className="p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitStatus.message && (
                  <div
                    className={`p-4 rounded-lg ${
                      submitStatus.type === "success"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                    placeholder="What is this regarding?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <PrimaryButton
                  type="submit"
                  className="w-full py-3 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </PrimaryButton>
              </form>

              {/* Mobile-only footer note */}
              <div className="mt-8 pt-6 border-t border-gray-200 text-center md:hidden">
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  WE'RE HERE TO HELP YOU DISCOVER YOUR NEXT FAVORITE BOOK
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
