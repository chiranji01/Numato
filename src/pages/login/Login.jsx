import React, { useState, useEffect } from 'react';
import "./login.css";
import { Link, useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ReactSession } from 'react-client-session';
ReactSession.setStoreType("localStorage");

const Login = () => {
  useEffect(() => {
    const onPageLoad = () => {
      var isLogged = ReactSession.get("isLogged");
      if(isLogged) {
        ReactSession.set("isLogged", false);
      }
    };
    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad, false);
      return () => window.removeEventListener('load', onPageLoad);
    }
  }, []);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [toggleEye, setToggleEye] = useState(false);
  const [inputType, setInputType] = useState("password");
  const navigate = useNavigate();

  const handleToggle = () => {
    setToggleEye(!toggleEye);
    setInputType(inputType === "password" ? "text" : "password");
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  const handleLogin = (e) => {
    e.preventDefault();

    try {
      // Sign in with email and password using Firebase authentication
      signInWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password
      ).then((userCredential) => {
        setInputType(true);
        ReactSession.set("isLogged", true);
        window.alert('Login Successful');
   
        const user = userCredential.user;
        console.log(user);
        navigate("/game");
      });
    } catch (error) {
      setInputType(false);
      window.alert('Email or password is wrong');
    }
  };

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
    </div>
  );
};

export default Login;
