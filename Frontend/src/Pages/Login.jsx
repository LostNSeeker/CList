import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { auth } from "../../config/firebaseConfig";
import {
	signInWithEmailAndPassword,
	setPersistence,
	browserSessionPersistence,
	browserLocalPersistence,
} from "firebase/auth";

import IconCloud from "../../Components/ui/icon-cloud";
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

	const handleLogin = async (event) => {
		event.preventDefault();
		console.log(rememberMe);
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
			// eslint-disable-next-line no-unused-vars
		} catch (error) {
			toast.error("Invalid email or password");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="login-screen">
			<div className="left">
				<IconCloud iconSlugs={slugs} />
			</div>
			<div className="right">
				<div className="login-hero-page">
					<div className="login-container">
						<div className="login-title">Login</div>

						<div className="login-form"></div>
						<form onSubmit={handleLogin}>
							<div
								className={`form-group ${isEmailAnimating ? "animate" : ""}`}
							>
								<label htmlFor="email">Email address</label>
								<input
									type="email"
									id="email"
									name="email"
									onClick={handleEmailClick}
									required
								/>
							</div>
							<div
								className={`form-group ${isPasswordAnimating ? "animate" : ""}`}
							>
								<label htmlFor="password">Password</label>
								<input
									type="password"
									id="password"
									name="password"
									onClick={handlePasswordClick}
									required
								/>
							</div>
							<div style={{ display: "flex", justifyContent: "space-between" }}>
								<CheckboxWithLabel
									onChange={handleRememberMeChange}
									checked={rememberMe}
									label="Remember me"
								/>
								<Link to="/forgot-password" className="right-span">
									Forgot password?
								</Link>
							</div>
							<div className="form-group">
								<button type="submit" disabled={isLoading}>
									{isLoading ? (
										<p style={{ cursor: "not-allowed" }}>Validating...</p>
									) : (
										<p>Login</p>
									)}
								</button>
							</div>
							<p>
								Don&apos;t have an account ?{" "}
								<Link to="/signup" className="right-span">
									Sign up here
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
