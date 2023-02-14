import { useState } from "react";
import Modal from "./Modal.js";

import classes from "./Auth.module.css";

const Auth = () => {
  const [isOpen, setIsOpen] = useState(false);

  const modalHandler = () => {
    setIsOpen(true);
  };

  const modalClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className={classes.button__wrapper__styles}>
        <Modal open={isOpen} onClose={modalClose} />
      </div>
      <p className={classes.account__creation}>Don't have an account yet?</p>
      <button onClick={modalHandler} className={classes.sign__up__a}>
        Sign Up
      </button>
    </div>
  );
};

export default Auth;
