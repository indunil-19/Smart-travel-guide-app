import React, { useState, useContext } from "react";
import { TouchableOpacity, StyleSheet, Text, View, Alert } from "react-native";
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

const LoginScreen = (props) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const { state, dispatch } = useContext(AppContext);

  const _onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    fetch(`${Config.Localhost}/signin`, {
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
          // M.toast({html: data.error,classes:"#c62828 red darken-3"})
          console.log(data.error);
          Alert.alert(`${data.error}`);
        } else {
          // localStorage.setItem("jwt",data.token)
          // localStorage.setItem("user",JSON.stringify(data.user))
          dispatch({ type: "USER", payload: data.user });
          // M.toast({html:"signedin success",classes:"#43a047 green darken-1"})
          // history.push('/')
          console.log("sign in sucess");
          Alert.alert(`sign in sucessfull`);
          props.navigation.navigate("Home");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Background
      backgroundImage={require("../assets/img/login_background.png")}
      resizeMode="cover"
      imageStyle={{ opacity: 0.6 }}
    >
      {/* <BackButton goBack={() => navigation.navigate('HomeScreen')} /> */}

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
        //   onPress={() => navigation.navigate('ForgotPasswordScreen')}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate("Register")}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
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
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});

export default LoginScreen;
