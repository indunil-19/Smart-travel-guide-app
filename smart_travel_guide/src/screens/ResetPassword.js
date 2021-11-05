import React, { useContext, useState, useEffect } from "react";
import { Text, Alert, View, Pressable, StyleSheet } from "react-native";
import { ActivityIndicator, Title, Subheading } from "react-native-paper";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import Logo from "../components/Logo";
import { emailValidator, passwordValidator } from "../core/utils";
import { theme } from "../core/theme";
import { Config } from "../config/config";
import { AppContext } from "../context/AppContext";

export const ResetPassword = ({ route, navigation }) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [previousPass, setPreviousPass] = useState({ value: "", error: "" });
  const [newPass, setNewPass] = useState({ value: "", error: "" });
  const [isLoading, setLoading] = useState(false);
  const { reset, height } = route.params;
  const { dispatch } = useContext(AppContext);

  const updatepassword = () => {
    const prevPassError = passwordValidator(previousPass.value);
    const newPassError = passwordValidator(newPass.value);

    if (newPass.value && previousPass.value) {
      if (prevPassError || newPassError) {
        setNewPass({ ...newPass, error: newPassError });
        setPreviousPass({
          ...previousPass,
          error: prevPassError,
        });

        return;
      } else {
        setLoading(true);
        fetch(`${Config.localhost}/user/updatepassword`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prevoiusPassowrd: previousPass.value,
            newPassword: newPass.value,
          }),
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.error) {
              Alert.alert(`Change Password`, `${result.error}`);
              setLoading(false);
            } else {
              dispatch({
                type: "set_notification",
                payload: {
                  notification: {
                    message: "Password Successfully Changed",
                    icon: "check-circle-outline",
                    duration: 4000,
                  },
                },
              });
              navigation.goBack();
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      setNewPass({ ...newPass, error: "Password cannot be empty" });
      setPreviousPass({ ...previousPass, error: "Password cannot be empty" });
      return;
    }
  };

  const postData = () => {
    const emailError = emailValidator(email.value);

    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }
    setLoading(true);
    fetch(`${Config.localhost}/reset-password`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          Alert.alert(`Reset Password`, `${data.error}`);
        } else {
          Alert.alert(
            `Reset Password`,
            "Check email for the verification link to reset password."
          );

          navigation.navigate("Login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <Pressable
        style={[StyleSheet.absoluteFill]}
        onPress={navigation.goBack}
      />
      <View
        style={{
          width: "100%",
          backgroundColor: "#fff",
          justifyContent: "space-evenly",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingTop: 10,
          height: height,
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
        }}
      >
        {!reset && (
          <View style={{ alignItems: "center", width: "80%" }}>
            <Logo />
            <Title>Change Password</Title>

            <TextInput
              label="PREVIOUS PASSWORD"
              returnKeyType="done"
              value={previousPass.value}
              onChangeText={(text) =>
                setPreviousPass({ value: text, error: "" })
              }
              error={!!previousPass.error}
              errorText={previousPass.error}
              secureTextEntry
            />
            <TextInput
              label="NEW PASSWORD"
              returnKeyType="done"
              value={newPass.value}
              onChangeText={(text) => setNewPass({ value: text, error: "" })}
              error={!!newPass.error}
              errorText={newPass.error}
              secureTextEntry
            />
            {!isLoading ? (
              <Button
                mode="contained"
                onPress={() => {
                  updatepassword();
                }}
              >
                Confirm Change
              </Button>
            ) : (
              <ActivityIndicator
                animating={isLoading}
                size="large"
                color={theme.colors.primary}
              />
            )}
          </View>
        )}
        {reset && (
          <View style={{ alignItems: "center", width: "80%" }}>
            <Logo />
            <Title>Reset Password</Title>
            <Subheading style={{ textAlign: "center" }}>
              A link will be sent to the email to reset the password.
            </Subheading>

            <TextInput
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
            {!isLoading ? (
              <Button
                mode="contained"
                onPress={() => {
                  postData();
                }}
              >
                Reset
              </Button>
            ) : (
              <ActivityIndicator
                animating={isLoading}
                size="large"
                color={theme.colors.primary}
              />
            )}
          </View>
        )}
      </View>
    </View>
  );
};
