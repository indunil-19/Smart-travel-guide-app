import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppNavigator } from "./AppNavigator";
import { AccountNavigator } from "./AccountNavigator";

export const Navigation = () => {
  // * need to add real authentication sequence here for refernce look yummeals github
  const isAuthenticated = true;
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};
