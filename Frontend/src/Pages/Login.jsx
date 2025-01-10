import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../config/firebaseConfig";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";
import IconCloud from "../Components/ui/icon-cloud";
import { toast } from "react-toastify";
import CheckboxWithLabel from "../Components/CheckboxWithLabel";

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

const Login = () => {
  const [isEmailAnimating, setIsEmailAnimating] = useState(false);
  const [isPasswordAnimating, setIsPasswordAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (auth.currentUser) {
    window.location.href = "/";
  }

  const handleEmailClick = () => {
    setIsEmailAnimating(true);
    setTimeout(() => {
      setIsEmailAnimating(false);
    }, 300);
  };

  const handlePasswordClick = () => {
    setIsPasswordAnimating(true);
    setTimeout(() => {
      setIsPasswordAnimating(false);
    }, 300);
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const persistence = rememberMe
        ? browserLocalPersistence
        : browserSessionPersistence;
      await setPersistence(auth, persistence);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully");
      window.location.href = "/";
    } catch (error) {
      toast.error("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white gap-6 font-sans">
      {/* Icon Cloud Section */}
      <div className="flex justify-center items-center w-full md:w-1/2 bg-white">
        <div className="w-40 h-40 md:w-full md:h-full flex justify-center items-center">
          <IconCloud iconSlugs={slugs} />
        </div>
      </div>

      {/* Login Form Section */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white px-6">
        <div className="w-full max-w-md">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Login
          </h1>
          
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div className={`${isEmailAnimating ? "animate-pulse" : ""}`}>
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
                onClick={handleEmailClick}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Input */}
            <div className={`relative ${isPasswordAnimating ? "animate-pulse" : ""}`}>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  onClick={handlePasswordClick}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <CheckboxWithLabel
                onChange={handleRememberMeChange}
                checked={rememberMe}
                label="Remember me"
              />
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 transition-colors font-medium text-lg"
            >
              {isLoading ? "Validating..." : "Sign In"}
            </button>
          </form>

          {/* Signup Link */}
          <p className="text-sm text-gray-700 mt-6 text-center">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-orange-500 font-medium hover:text-orange-600 transition-colors"
            >
              Create an account
            </Link>
          </p>
          <p className="text-xs text-gray-400 text-center">
            Powered by <strong>DevLaunch</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;