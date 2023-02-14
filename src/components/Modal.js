import React from "react";
import ReactDom from "react-dom";
import SignUp from "./SignUp";
import classes from "./Modal.module.css";

const Modal = ({ open, onClose }) => {
  if (!open) return null;

  return ReactDom.createPortal(
    <div>
      <div className={classes.overlay__styles} onClick={onClose} />
      <div className={classes.modal__styles}>
        <button onClick={onClose} className={classes.signup__close}>
          x
        </button>
        <SignUp />
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default Modal;
