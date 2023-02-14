import { auth } from "../firebase-config.js";
import { signOut } from "firebase/auth";

import Cookies from "universal-cookie";
import classes from "./AppWrapper.module.css";

const cookies = new Cookies();

const AppWrapper = ({ children, isAuth, setIsAuth, setIsInChat }) => {
  
  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setIsInChat(false);
  };

  return (
    <div>
      <div>{children}</div>
      {isAuth && (
        <div>
          <button
            onClick={signUserOut}
            className={classes.sign__out__button__room}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default AppWrapper;
