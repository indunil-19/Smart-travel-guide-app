import React, { useContext } from "react";
import { Avatar } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { AppContext } from "../context/AppContext";

import { theme } from "../core/theme";

export const HeaderAvatar = () => {
  const { state } = useContext(AppContext);
  const navigation = useNavigation();
  if (state.pic) {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Avatar.Image
          source={{ uri: state.pic }}
          size={30}
          onPress={() => navigation.navigate("Profile")}
        />
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Avatar.Icon
          icon="account"
          color={theme.colors.primary}
          size={30}
          style={{ backgroundColor: "white" }}
        />
      </TouchableOpacity>
    );
  }
};
