import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import IconCloud from "../Components/ui/icon-cloud";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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

	if (auth.currentUser) {
		window.location.href = "/";
	}

	const handlePasswordReset = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		const auth = getAuth();
		try {
			await sendPasswordResetEmail(auth, email);

			toast.success("Password reset link sent to your email");
		} catch (error) {
			toast.error(error.message);
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
						<div
							className="login-title"
							style={{ width: "100%", fontSize: "2rem" }}
						>
							Reset Password
						</div>

						<div className="login-form"></div>
						<form onSubmit={handlePasswordReset}>
							<div className="form-group">
								<label htmlFor="email">Email address</label>
								<input
									type="email"
									id="email"
									name="email"
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
							<div className="form-group">
								<button type="submit" disabled={isLoading}>
									{isLoading ? (
										<p style={{ cursor: "not-allowed" }}>Sending...</p>
									) : (
										<p>Send reset link</p>
									)}
								</button>
							</div>
							<p>
								Password reset done?{" "}
								<Link to="/login" className="right-span">
									Log in here
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;
