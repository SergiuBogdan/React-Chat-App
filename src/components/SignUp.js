import { useState } from "react";
import { auth, db, storage } from "../firebase-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import classes from "./SignUp.module.css";

const SignUp = () => {
  const [loading, setLoading] = useState(false);

  const signUpHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
          } catch (err) {
            console.log(err);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={signUpHandler} className={classes.modal__container}>
        <input
          required
          type="text"
          placeholder="Display name"
          className={classes.input__name__modal}
        />
        <input
          required
          type="email"
          placeholder="Email"
          className={classes.input__email__modal}
        />
        <input
          required
          type="password"
          placeholder="Password"
          className={classes.input__password__modal}
        />
        <button className={classes.button__signup}>Sign up</button>
        {loading && (
          <span className={classes.span__signup}>
            Account created sucessfully
          </span>
        )}
      </form>
    </div>
  );
};

export default SignUp;
