// Desc: Login Page
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { toast } from "react-toastify";
import axios from "axios";

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
		const email = e.target.email.value;
		const password = e.target.password.value;
		const codeforces = e.target.codeforces.value;
		const leetcode = e.target.leetcode.value;
		const codechef = e.target.codechef.value;

		if (!codeforces && !leetcode && !codechef) {
			toast.error("Please enter atleast one username");
			return;
		}

		console.log(email, password, codeforces, leetcode, codechef);

		try {
			const response = await axios.post(
				"http://localhost:5000/api/user/signup",
				{
					email,
					password,
					codeforces,
					leetcode,
					codechef,
				}
			);
			if (response.status === 200) {
		

			} else {
				toast.error("User registration failed");
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="login-screen">
			<div className="left"></div>
			<div className="right">
				<div className="back">
					<Link to="/">Back</Link>
				</div>
				<div className="login-hero-page">
					<div className="login-container">
						<div className="login-title">SignUp</div>
						{/*<div className="login-p">If you are a Admin you can login with your email address and password.</div>*/}
						<div className="login-form">
							<form onSubmit={handleSignup}>
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
