import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppNavigator } from "./AppNavigator";
import { AccountNavigator } from "./AccountNavigator";
import { AsyncStorage } from "react-native";

import { AppContext } from "../context/AppContext";

export const Navigation = () => {
  const { isAuthenticated, state, dispatch } = useContext(AppContext);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};
