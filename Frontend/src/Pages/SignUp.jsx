// Desc: Login Page
import { useState } from "react";
import "./Login.css";
import IconCloud from "../Components/ui/icon-cloud";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";

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

	const handleSignup = async (e) => {
		e.preventDefault();
		const name = e.target.name.value;
		const email = e.target.email.value;
		const password = e.target.password.value;
		const college = e.target.college.value;
		const codeforces = e.target.codeforces.value;
		const leetcode = e.target.leetcode.value;
		const codechef = e.target.codechef.value;

		if (!codeforces && !leetcode && !codechef) {
			toast.error("Please enter atleast one username");
			return;
		}

		console.log(name, email, college, password, codeforces, leetcode, codechef);

		createUserWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				const user = userCredential.user;

				console.log(userCredential);

				// Send a request to your backend with user data
				fetch("http://localhost:5000/api/user/signup", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						accessToken: await user.getIdToken(),
						email,
						name,
						college,
						codeforces,
						leetcode,
						codechef,
					}),
				})
					.then((response) => {
						if (!response.ok) {
							// If backend fails, delete the user from Firebase
							user
								.delete()
								.then(() => {
									console.error(
										"User creation failed on the backend, user deleted from Firebase"
									);
								})
								.catch((error) => {
									console.error("Failed to delete user from Firebase:", error);
								});
							throw new Error("Backend user creation failed");
						} else {
							console.log("User created successfully on the backend");
						}
					})
					.catch((error) => {
						user.delete().then(() => {
							console.error(
								"User creation failed on the backend, user deleted from Firebase"
							);
						});
						console.error("Error during user creation:", error);
					});
			})
			.catch((error) => {
				console.error("Error signing up:", error);
			});
	};

	return (
		<div className="login-screen">
			<div className="left">
				<IconCloud iconSlugs={slugs} />
			</div>
			<div className="right">
				<div className="login-hero-page">
					<div className="login-container">
						<div className="login-title">SignUp</div>
						{/*<div className="login-p">If you are a Admin you can login with your email address and password.</div>*/}
						<div className="login-form">
							<form onSubmit={handleSignup}>
								<div className="form-group">
									<input type="text" id="name" name="name" placeholder="Name" />
								</div>
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
										required
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
									<Link to="/login" className="right-span">
										Login here
									</Link>
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
