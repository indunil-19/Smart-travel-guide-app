import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from "react-native-paper";
import LoginScreen from "./src/screens/Login";
import RegisterScreen from "./src/screens/Register";
import DashBoardScreen from "./src/screens/DashBoard";
import { ProfileScreen } from "./src/screens/Profile";
import { HomeScreen } from "./src/screens/Home";
import { FontAwesome } from "@expo/vector-icons";
import { UpdateProfile } from "./src/screens/updateProfile";
import { AppProvider } from "./src/context/AppContext";
import { theme } from "./src/core/theme";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
          }}
        >
          {/* <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          /> */}

          {/* <Stack.Screen name="Register" component={RegisterScreen} /> */}

          <Stack.Screen
            name="DashBoard"
            component={DashBoardScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <TouchableOpacity
                  style={{}}
                  onPress={() => navigation.navigate("Profile")}
                >
                  <FontAwesome name="user-circle-o" size={24} color="black" />
                </TouchableOpacity>
              ),
            })}
          />

          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <TouchableOpacity
                  style={{}}
                  onPress={() => navigation.navigate("Profile")}
                >
                  <FontAwesome name="sign-out" size={30} color="red" />
                </TouchableOpacity>
              ),
            })}
          />

          <Stack.Screen name="updateProfile" component={UpdateProfile} />

          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <TouchableOpacity
                  style={{}}
                  onPress={() => navigation.navigate("Profile")}
                >
                  <FontAwesome name="user-circle-o" size={24} color="black" />
                </TouchableOpacity>
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
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
