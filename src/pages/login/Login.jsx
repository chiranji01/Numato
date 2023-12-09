import React, { useState, useEffect } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Preloader from '../../components/preloader/Preloader'; 
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ReactSession } from 'react-client-session';
ReactSession.setStoreType("localStorage");

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [toggleEye, setToggleEye] = useState(false);
  const [inputType, setInputType] = useState("password");
  const [showPreloader, setShowPreloader] = useState(false); 

  const navigate = useNavigate();

  const handleToggle = () => {
    setToggleEye(!toggleEye);
    setInputType(inputType === "password" ? "text" : "password");
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password
      );
      localStorage.setItem('email', inputs.email);
      localStorage.setItem('isLogged', 'true'); // Added session information
      setInputType(true);
      ReactSession.set("isLogged", true);
      window.alert('Login Successful');
      setShowPreloader(true);
      const user = userCredential.user;
      console.log(user);

      setTimeout(() => {
        navigate("/levels");
      }, 5000);
    } catch (error) {
      setInputType(false);
      console.error('Error:', error.message);
      window.alert('Email or password is wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showPreloader) {
      const preloaderTimer = setTimeout(() => {
        setShowPreloader(true);
      }, 5000);
      return () => clearTimeout(preloaderTimer);
    }
  }, [showPreloader]);

  return (
    <div className="login">
      <div className="first" />
      <form>
        <h2>Login</h2>
        <div className="formInput">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="formInput">
          <input
            type={inputType}
            name="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <div className="eyeIcon" onClick={handleToggle}>
            {toggleEye ? <Visibility /> : <VisibilityOff />}
          </div>
        </div>
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
        <div className="formLink">
          <span>Don't have an account? </span>
          <Link
            to="/register"
            className="formSignup"
            style={{ textDecoration: "none" }}
          >
            {" "}
            Sign Up
          </Link>
        </div>
      </form>
      {showPreloader && (
        <Preloader />
      )}
    </div>
  );
};

export default Login;
