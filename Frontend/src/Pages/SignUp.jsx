// Desc: Login Page
import { useState } from "react";
import "./Login.css";
import IconCloud from "@/components/ui/icon-cloud";

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

const SignUp = () => {
  const [isEmailAnimating, setIsEmailAnimating] = useState(false);
  const [isPasswordAnimating, setIsPasswordAnimating] = useState(false);

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
  return (
    <div className="login-screen">
      <div className="left">
        <IconCloud iconSlugs={slugs} />
      </div>
      <div className="right">
        <div className="back">
          <a href="/">Back</a>
        </div>
        <div className="login-hero-page">
          <div className="login-container">
            <div className="login-title">SignUp</div>
            {/*<div className="login-p">If you are a Admin you can login with your email address and password.</div>*/}
            <div className="login-form">
              <form>
                <div
                  className={`form-group ${isEmailAnimating ? "animate" : ""}`}
                >
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email address"
                    onClick={handleEmailClick}
                    required
                  />
                </div>
                <div
                  className={`form-group ${
                    isPasswordAnimating ? "animate" : ""
                  }`}
                >
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onClick={handlePasswordClick}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="college"
                    name="college"
                    placeholder="Enter your college name"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="codeforces"
                    name="codeforces"
                    placeholder="Codeforces username"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="leetcode"
                    name="leetcode"
                    placeholder="Leetcode username"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="codechef"
                    name="codechef"
                    placeholder="Codechef username"
                  />
                </div>

                <div className="form-group">
                  <button type="submit">
                    <p>Register Account</p>
                  </button>
                </div>
                <p>
                  Already have an account ?{" "}
                  <a href="/login" className="right-span">
                    Login here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
