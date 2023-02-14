import React from "react";
import { auth, provider } from "../firebase-config.js";
import googleimg from "../assets/google.png";
import { signInWithPopup } from "firebase/auth";
import classes from "./Auth.module.css";

import Cookies from "universal-cookie";

const cookies = new Cookies();

const SignInWithGoogle = ({ setIsAuth }) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button className={classes.button__google} onClick={signInWithGoogle}>
        <img className={classes.google__img} src={googleimg} alt="logo" />
        Sign In With Google
      </button>
    </div>
  );
};

export default SignInWithGoogle;
