// Desc: Login Page
import { useState } from "react";
import RememberMe from "../Components/RememberMe";
import "./Login.css";

import IconCloud from "../components/ui/icon-cloud";

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
        {/*<div className="back">
          <a href="/">Back</a>
        </div>*/}
        <div className="login-hero-page">
          <div className="login-container">
            <div className="login-title">Login</div>

            <div className="login-form">
              <form>
                <div
                  className={`form-group ${isEmailAnimating ? "animate" : ""}`}
                >
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onClick={handleEmailClick}
                  />
                </div>
                <div
                  className={`form-group ${
                    isPasswordAnimating ? "animate" : ""
                  }`}
                >
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    onClick={handlePasswordClick}
                  />
                </div>
                <RememberMe />
                <div className="form-group">
                  <button type="submit">
                    <p>Login</p>
                  </button>
                </div>
                <p>
                  Don&apos;t have an account ?{" "}
                  <a href="/signup" className="right-span">
                    Sign up here
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

export default Login;
