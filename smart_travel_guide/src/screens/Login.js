import React, { useState, useContext } from "react";
import { TouchableOpacity, StyleSheet, Text, View, Alert } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
// import BackButton from '../components/BackButton';
import { theme } from "../core/theme";
import { emailValidator, passwordValidator } from "../core/utils";
import { AppContext } from "../context/AppContext";
import { Config } from "../config/config";
import { AsyncStorage } from "react-native";

const LoginScreen = (props) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);
  const { onLogin, state, dispatch } = useContext(AppContext);

  const _onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    setLoading(true);
    fetch(`${Config.localhost}/signin`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password.value,
        email: email.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          setEmail({ ...email, error: data.error });
          setPassword({ ...password, error: data.error });
          setLoading(false);
        } else {
          AsyncStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          dispatch({
            type: "set_notification",
            payload: {
              notification: {
                message: `Welcome ${data.user.firstname} !`,
                icon: "check-circle-outline",
                duration: 3000,
              },
            },
          });
          onLogin();
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <Background
      backgroundImage={require("../assets/img/login_background.png")}
      resizeMode="cover"
      imageStyle={{ opacity: 0.6 }}
    >
      <View style={styles.loginContainer}>
        <Logo />

        <Header>Welcome ...</Header>

        <TextInput
          mode="flat"
          label="EMAIL ADDRESS"
          returnKeyType="next"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: "" })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />

        <TextInput
          mode="flat"
          label="PASSWORD"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: "" })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />

        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("Reset Password", {
                reset: true,
                height: "60%",
              })
            }
          >
            <Text style={styles.label}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
        {!loading ? (
          <Button mode="contained" onPress={_onLoginPressed}>
            Login
          </Button>
        ) : (
          <ActivityIndicator
            animating={loading}
            size="large"
            color={theme.colors.primary}
          />
        )}

        <View style={styles.row}>
          <Text style={styles.label}>Don’t have an account? </Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Register")}
          >
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
    fontSize: 15,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  loginContainer: {
    width: "100%",
    maxWidth: 340,
    // padding: 20,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
});

export default LoginScreen;
