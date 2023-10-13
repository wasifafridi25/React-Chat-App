import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase";

export const AuthContext = createContext();

// create the Auth Provider
//children represents our components
// We used the AuthContextProvider in our index.js to wrap our App so everyone has access to the currentUser
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user)
    });

    // when listening to a real time operation use a clean up function to avoid memory leakage need to do this.
    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{currentUser}}>{children}</AuthContext.Provider>
  );
};
