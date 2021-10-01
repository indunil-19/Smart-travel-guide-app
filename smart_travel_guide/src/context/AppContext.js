import React, { createContext, useEffect, useReducer, useState } from "react";
import { initialState, reducer as AppReducer } from "../reducer/AppReducer";
import { Config } from "../config/config";
import { AsyncStorage } from "react-native";
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const alreadyLogged = JSON.parse(await AsyncStorage.getItem("user"));
      if (alreadyLogged) {
        dispatch({ type: "USER", payload: alreadyLogged });
        setUser(true);
      }
    }
    fetchData();
  }, ["user"]);

  const onLogin = () => {
    setUser(true);
  };

  const onLogout = () => {
    fetch(`${Config.localhost}/logout`)
      .then((res) => res.json())
      .then((result) => console.log(result))
      .catch((e) => {
        console.log(e);
      });
    AsyncStorage.clear();
    dispatch({ type: "CLEAR" });
    setUser(false);
  };

  return (
    <AppContext.Provider
      value={{ isAuthenticated: user, state, dispatch, onLogout, onLogin }}
    >
      {children}
    </AppContext.Provider>
  );
};
