import React from "react";
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";

const Background = (props) => (
  <ImageBackground
    source={props.backgroundImage}
    resizeMode={props.resizeMode}
    style={{ ...styles.background, ...props.style }}
    {...props}
  >
    <KeyboardAvoidingView
      style={{ ...styles.container, ...props.style }}
      behavior="padding"
    >
      {props.children}
    </KeyboardAvoidingView>
  </ImageBackground>
);

Background.defaultProps = {
  // backgroundImage: require("../assets/background_dot.png"),
  // resizeMode: "repeat",
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
  container: {
    flexGrow: 1,
    // padding: 20,
    width: "100%",
    // maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

export default Background;
