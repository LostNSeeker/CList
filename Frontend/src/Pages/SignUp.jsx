import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../config/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";
import IconCloud from "../Components/ui/icon-cloud";
import { toast } from "react-toastify";

const slugs = [
  "typescript", "javascript", "dart", "java", "react", "flutter", "android",
  "html5", "css3", "nodedotjs", "express", "nextdotjs", "prisma", "amazonaws",
  "postgresql", "firebase", "nginx", "vercel", "testinglibrary", "jest",
  "cypress", "docker", "git", "jira", "github", "gitlab", "visualstudiocode",
  "androidstudio", "sonarqube", "figma",
];

const SignUp = () => {
  const [isEmailAnimating, setIsEmailAnimating] = useState(false);
  const [isPasswordAnimating, setIsPasswordAnimating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (auth.currentUser) {
    window.location.href = "/";
  }

  const handleEmailClick = () => {
    setIsEmailAnimating(true);
    setTimeout(() => setIsEmailAnimating(false), 300);
  };

  const handlePasswordClick = () => {
    setIsPasswordAnimating(true);
    setTimeout(() => setIsPasswordAnimating(false), 300);
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const college = e.target.college.value;
    const codeforces = e.target.codeforces.value;
    const leetcode = e.target.leetcode.value;
    const codechef = e.target.codechef.value;

    if (!codeforces && !leetcode && !codechef) {
      toast.error("Please enter at least one platform username");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accessToken: await user.getIdToken(),
          email, name, college, codeforces, leetcode, codechef,
        }),
      });

      if (!response.ok) {
        await user.delete();
        throw new Error("Backend user creation failed");
      }

      toast.success("Registration successful");
      window.location.href = "/";
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("An account with this email already exists");
      } else {
        toast.error("Registration failed. Please try again later");
      }
      console.error("Error signing up:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white">
      {/* Icon Cloud Section - Hidden on mobile, shown on desktop */}
      <div className="hidden md:flex justify-center items-center w-1/2 bg-white">
        <IconCloud iconSlugs={slugs} />
      </div>

      {/* Signup Form Section */}
      <div className="flex flex-col justify-start md:justify-center w-full md:w-1/2 bg-white p-4 h-screen overflow-y-auto">
        <div className="w-full max-w-md mx-auto">
          {/* Small IconCloud for mobile only */}
          <div className="flex md:hidden justify-center mb-16">
            <div className="w-24 h-24">
              <IconCloud iconSlugs={slugs} />
            </div>
          </div>

          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
            Create Account
          </h1>
          <p className="text-gray-600 text-sm md:text-base mb-4">
            Track your problem solving journey with Yorigin
          </p>

          <form onSubmit={handleSignup} className="space-y-3">
            {/* Name & Email Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Your name"
                />
              </div>
              <div className={isEmailAnimating ? "animate-pulse" : ""}>
                <label htmlFor="email" className="block text-xs font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onClick={handleEmailClick}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Your email"
                />
              </div>
            </div>

            {/* Password & College Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className={`relative ${isPasswordAnimating ? "animate-pulse" : ""}`}>
                <label htmlFor="password" className="block text-xs font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    onClick={handlePasswordClick}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 pr-8"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 top-[60%] -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="college" className="block text-xs font-medium text-gray-700">
                  College
                </label>
                <input
                  type="text"
                  id="college"
                  name="college"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Your college"
                />
              </div>
            </div>

            {/* Coding Platforms */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Coding Platforms usernames
              </label>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  id="codeforces"
                  name="codeforces"
                  className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Codeforces"
                />
                <input
                  type="text"
                  id="leetcode"
                  name="leetcode"
                  className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="LeetCode"
                />
                <input
                  type="text"
                  id="codechef"
                  name="codechef"
                  className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="CodeChef"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Enter at least one platform username</p>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 transition-colors font-medium text-sm mt-2"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>

            {/* Login Link */}
            <p className="text-xs text-gray-700 text-center mt-2">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-orange-500 font-medium hover:text-orange-600 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </form>

          <p className="text-xs text-gray-400 text-center mt-2">
            Powered by <strong>DevLaunch</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;