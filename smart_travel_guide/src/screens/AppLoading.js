import React, { useEffect } from "react";
import { View, Text } from "react-native";

const AppLoading = (props) => {
  useEffect(() => {
    props.navigation.navigate("Travel Plan");
  }, []);
  return (
    <View>
      <Text>Loading....</Text>
    </View>
  );
};

export default AppLoading;
