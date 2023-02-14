import React from "react";
import { auth } from "../firebase-config.js";
import facebookimg from "../assets/facebook.png";
import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import classes from "./Auth.module.css";

import Cookies from "universal-cookie";

const cookies = new Cookies();

const SignInWithFacebook = ({ setIsAuth }) => {
  const signInWithFacebook = async () => {
    try {
      const result = new FacebookAuthProvider();
      console.log(result);
      await signInWithPopup(auth, result);
      cookies.set("auth-token", result.user);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button className={classes.button__fb} onClick={signInWithFacebook}>
        <img className={classes.facebook__img} src={facebookimg} alt="fblogo" />
        Sign In With Facebook
      </button>
    </div>
  );
};

export default SignInWithFacebook;
