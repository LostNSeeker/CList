import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import IconCloud from "../Components/ui/icon-cloud";
import { toast } from "react-toastify";

const slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailAnimating, setIsEmailAnimating] = useState(false);

  if (auth.currentUser) {
    window.location.href = "/";
  }

  const handleEmailClick = () => {
    setIsEmailAnimating(true);
    setTimeout(() => setIsEmailAnimating(false), 300);
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset link sent to your email");
      setEmail(""); // Clear the email field after successful submission
    } catch (error) {
      toast.error(
        "Failed to send reset link. Please check your email address."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white">
      {/* Icon Cloud Section - Hidden on mobile, shown on desktop */}
      <div className="hidden md:flex justify-center items-center w-1/2 bg-white">
        <IconCloud iconSlugs={slugs} />
      </div>

      {/* Forgot Password Form Section */}
      <div className="flex flex-col justify-start md:justify-center w-full md:w-1/2 bg-white p-4 h-screen">
        <div className="w-full max-w-md mx-auto">
          {/* Small IconCloud for mobile only */}
          <div className="flex md:hidden justify-center mb-16 mt-[-30px]">
            <div className="w-24 h-24">
              <IconCloud iconSlugs={slugs} />
            </div>
          </div>

          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
            Reset Password
          </h1>
          <p className="text-gray-600 text-sm md:text-base mb-6">
            Enter your email to receive a password reset link
          </p>

          <form onSubmit={handlePasswordReset} className="space-y-4">
            {/* Email Input */}
            <div className={isEmailAnimating ? "animate-pulse" : ""}>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onClick={handleEmailClick}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
                placeholder="Enter your email"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 transition-colors font-medium text-sm mt-2"
            >
              {isLoading ? "Sending Reset Link..." : "Send Reset Link"}
            </button>

            {/* Back to Login Link */}
            <p className="text-sm text-gray-700 text-center mt-4">
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-orange-500 font-medium hover:text-orange-600 transition-colors"
              >
                Back to login
              </Link>
            </p>
          </form>

          <div className="mt-8 space-y-4">
            <div className="border-t border-gray-200 pt-4">
              <h2 className="text-sm font-medium text-gray-700 mb-2">
                Didn't receive the reset link?
              </h2>
              <ul className="text-xs text-gray-600 space-y-2">
                <li>• Check your spam folder</li>
                <li>• Make sure you entered the correct email address</li>
                <li>• Wait a few minutes and try again</li>
              </ul>
            </div>
          </div>

          <p className="text-xs text-gray-400 text-center mt-6">
            Powered by <strong>DevLaunch</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
