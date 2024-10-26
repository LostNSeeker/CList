// Desc: Login Page
import { useState } from "react";
import RememberMe from "../Components/RememberMe";
import './Login.css';

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
            <div className="left"></div>
            <div className="right">
                <div className='back'>
                    <a href="/">Back</a>
                </div>
                <div className="login-hero-page">
                    <div className="login-container">
                        <div className="login-title">
                            Login
                        </div>
                        <div className="login-p">If you are already a Admin you can login with your email address and password.</div>
                        <div className="login-form">
                            <form>
                                <div className={`form-group ${isEmailAnimating ? 'animate' : ''}`}>
                                    <label htmlFor="email">Email address</label>
                                    <input type="email" id="email" name="email" onClick={handleEmailClick} />
                                </div>
                                <div className={`form-group ${isPasswordAnimating ? 'animate' : ''}`}>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id="password" name="password" onClick={handlePasswordClick}/>
                                </div>
                                <RememberMe />
                                <div className="form-group">
                                    <button type="submit"><p>Register Account</p></button>
                                </div>
                                <p>Dont have an account ? <a href="/signup" className="right-span">Sign up here</a></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
