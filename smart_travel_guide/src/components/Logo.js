import React from "react";
import { Image, StyleSheet } from "react-native";

const Logo = () => (
  <Image source={require("../assets/img/logo.png")} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    marginBottom: 20,
  },
});

export default Logo;
