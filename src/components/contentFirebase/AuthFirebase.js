import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config/configFirebase";

export const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
};