import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase-config";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import classes from "./Chat.module.css";

const Chat = ({ room, children, isAuth, setIsAuth, setIsInChat }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({
          ...doc.data(),
          id: doc.id,
        });
      });

      console.log(messages);
      setMessages(messages);
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage("");
  };

  const newMessageHandler = (e) => {
    setNewMessage(e.target.value);
  };

  const date = new Date();

  return (
    <div>
      <div className={classes.chat_app}>
        <div className={classes.header}>
          <h1
            style={{
              padding: "5px",
            }}
          >
            Welcome to: {room.toUpperCase()}
          </h1>
        </div>
        <div className="messages">
          {messages.map((message) => (
            <div key={message.id} className={classes.message}>
              <span className={classes.user}>{message.user}:</span>
              {message.text}
              &nbsp; ----- on {date.toUTCString()}
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className={classes.new_message_form}>
        <input
          type="text"
          value={newMessage}
          onChange={newMessageHandler}
          className={classes.new_message_input}
          placeholder="Type your message here..."
        />
      </form>
    </div>
  );
};

export default Chat;
