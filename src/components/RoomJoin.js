import React, { useState } from "react";
import Auth from "./Auth";
import Chat from "./Chat";
import AppWrapper from "./AppWrapper";
import SignInWithGoogle from "./SignInWithGoogle.js";
import SignInWithFacebook from "./SignInWithFacebook.js";
import SignInWithEmail from "./SignInWithEmail.js";
import classes from "./RoomJoin.module.css";

import Cookies from "universal-cookie";
import "../App.css";

const cookies = new Cookies();

const RoomJoin = () => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [isInChat, setIsInChat] = useState(null);
  const [room, setRoom] = useState("");

  if (!isAuth) {
    return (
      <div>
        <AppWrapper
          isAuth={isAuth}
          setIsAuth={setIsAuth}
          setIsInChat={setIsInChat}
        >
          <SignInWithFacebook setIsAuth={setIsAuth} />
          <SignInWithGoogle setIsAuth={setIsAuth} />
          <SignInWithEmail setIsAuth={setIsAuth} />

          <Auth setIsAuth={setIsAuth} />
        </AppWrapper>
      </div>
    );
  }

  const inputValueHandler = (e) => {
    setRoom(e.target.value);
  };

  const buttonHandler = () => {
    setIsInChat(true);
  };

  return (
    <AppWrapper isAuth={isAuth} setIsAuth={setIsAuth} setIsInChat={setIsInChat}>
      {!isInChat ? (
        <div className={classes.input__container}>
          <form onChange={inputValueHandler}>
            <label> Room name: &nbsp; </label>
            <input className={classes.input__data} />
            <button className={classes.enter__chat} onClick={buttonHandler}>
              Enter Chat
            </button>
          </form>
        </div>
      ) : (
        <Chat room={room} />
      )}
    </AppWrapper>
  );
};

export default RoomJoin;
