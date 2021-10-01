import React, { useContext } from "react";
import { AppProvider } from "./src/context/AppContext";
import { Provider as PaperProvider } from "react-native-paper";
import { StatusBar } from "react-native";
import { theme } from "./src/core/theme";

import { Navigation } from "./src/routes";

function App() {
  return (
    <PaperProvider theme={theme}>
      {/* <StatusBar animated={true} backgroundColor="#61dafb" /> */}
      <Navigation />
    </PaperProvider>
  );
}

export default () => {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
};
