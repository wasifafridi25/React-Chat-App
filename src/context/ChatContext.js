import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { auth } from "../Firebase";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  //here we use this inside the function as ChatContextProvider is a component
  const { currentUser } = useContext(AuthContext);

  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };
        default:
            return state;
    }
  };

  //finally we are gonna get our state and dispatch
  //and then send it using ChatContext.Provider
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
