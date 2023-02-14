import { useState } from "react";
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import classes from "./Auth.module.css";

import Cookies from "universal-cookie";

const cookies = new Cookies();

const SignInWithEmail = ({ setIsAuth }) => {
  const [loginError, setLoginError] = useState(false);

  const signInHandler = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      cookies.set("auth-token", result.user.refreshToken);
      console.log(result);
      setIsAuth(true);
    } catch (err) {
      setLoginError(true);
    }
  };

  return (
    <div>
      <div className={classes.input__container}>
        <h1 className={classes.log__in}>Log in with your email adrress</h1>
        <div className={classes.input}>
          <div className={classes.auth}>
            <form
              onSubmit={signInHandler}
              className={classes.input__data__values}
            >
              <input
                required
                className={classes.input__data__email}
                type={"email"}
                placeholder="Enter your email address"
              />
              <input
                required
                className={classes.input__data__password}
                type={"password"}
                placeholder="Enter your password"
              />
              {loginError && <span>Incorrect Email or Password</span>}
              <button className={classes.button__login}>Log In</button>
            </form>

            <div className={classes.line}></div>
            <div className={classes.sign__in__buttons}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInWithEmail;
