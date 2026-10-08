import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider, storage } from "../Firebase";



const AuthContext = createContext(null);

// Turn Firebase error codes into messages people understand
const getErrorMessage = (code) => {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Wrong email or password.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/email-already-in-use":
      return "An account with this email already exists. Sign in instead.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment and try again.";
    case "auth/popup-closed-by-user":
      return "Google sign-in was closed before it finished.";
    case "auth/network-request-failed":
      return "Network error. Check your internet connection.";
    default:
      return "Something went wrong. Please try again.";
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Firebase remembers the user, so this keeps you logged in after a refresh
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signup = async (name, email, password) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (name) {
        await updateProfile(cred.user, { displayName: name });
      }
      return { success: true };
    } catch (err) {
      return { success: false, error: getErrorMessage(err.code) };
    }
  };

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (err) {
      return { success: false, error: getErrorMessage(err.code) };
    }
  };

  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      return { success: true };
    } catch (err) {
      return { success: false, error: getErrorMessage(err.code) };
    }
  };

  const logout = () => signOut(auth);

  const value = {
    user,
    isAuthenticated: !!user,
    signup,
    login,
    googleLogin,
    logout,
  };

  // Wait for Firebase to check the saved login before showing anything,
  // so a logged-in user doesn't see the login page flash on refresh
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
}