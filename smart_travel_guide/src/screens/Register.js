import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
// import BackButton from '../components/BackButton';
import { theme } from "../core/theme";
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from "../core/utils";
import DatePicker from "react-native-datepicker";
import { Picker } from "@react-native-picker/picker";
import { Config } from "../config/config";

const RegisterScreen = (props) => {
  const [firstName, setFirstName] = useState({ value: "", error: "" });
  const [lastName, setLastName] = useState({ value: "", error: "" });
  const [DOB, setDOB] = useState("");

  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [country, setCountry] = useState("");
  const [religion, setReligion] = useState("None");

  const findCountry = (text) => {
    setCountry(text);

    // fetch(`https://restcountries.eu/rest/v2/name/`+text,
    //  {
    //   "method": "GET",
    //   })
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(err => {
    //     // console.error(err);
    //   });
  };

  const _onSignUpPressed = () => {
    const firstNameError = nameValidator(firstName.value);
    const lastNameError = nameValidator(lastName.value);

    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || firstNameError || lastNameError) {
      setFirstName({ ...firstName, error: firstNameError });
      setLastName({ ...lastName, error: lastNameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    fetch(`${Config.localhost}/signup`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: firstName.value,
        lastname: lastName.value,
        dob: DOB,
        country: country,
        religion: religion,
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
          // dispatch({type:"USER",payload:data.user})
          // M.toast({html:"signedin success",classes:"#43a047 green darken-1"})
          // history.push('/')
          console.log("sign up sucess");
          Alert.alert(`Sign Up Sucessful`);
          props.navigation.navigate("Login");
        }
      })
      .catch((err) => {
        console.log(err);
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
          // dispatch({type:"USER",payload:data.user})
          // M.toast({html:"signedin success",classes:"#43a047 green darken-1"})
          // history.push('/')
          console.log("sign up sucess");
          Alert.alert(`Sign Up Sucessful`);
          props.navigation.navigate("Login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ScrollView>
      <Background>
        <View style={styles.registerContainer}>
          {/* <BackButton goBack={() => navigation.navigate("HomeScreen")} /> */}
          <Logo />

          <Header>Create Account</Header>

          <TextInput
            label="FIRST NAME"
            returnKeyType="next"
            value={firstName.value}
            onChangeText={(text) => setFirstName({ value: text, error: "" })}
            error={!!firstName.error}
            errorText={firstName.error}
          />
          <TextInput
            label="LAST NAME"
            returnKeyType="next"
            value={lastName.value}
            onChangeText={(text) => setLastName({ value: text, error: "" })}
            error={!!lastName.error}
            errorText={lastName.error}
          />
          <DatePicker
            style={{
              width: 300,
              marginTop: 15,
              marginBottom: 15,
              borderColor: "black",
              borderWidth: 1,
              borderRadius: 5,
            }}
            date={DOB}
            mode="date"
            placeholder="SELECT DATE OF BIRTH"
            format="YYYY-MM-DD"
            minDate="1970-05-01"
            // maxDate="2016-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {
              setDOB(date);
            }}
          />
          <View
            style={{
              marginTop: 15,
              marginBottom: 15,
              borderColor: "black",
              borderWidth: 1,
              borderRadius: 5,
            }}
          >
            <Text>RELIGION:</Text>
            <Picker
              selectedValue={religion}
              style={{ height: 50, width: 300 }}
              onValueChange={(itemValue, itemIndex) => setReligion(itemValue)}
            >
              <Picker.Item label="Buddhist" value="Buddhist" />
              <Picker.Item label="Catholic" value="Catholic" />
              <Picker.Item label="Hindu" value="Hindu" />
              <Picker.Item label="Islam" value="Islam" />
              <Picker.Item label="Another" value="Another" />
              <Picker.Item label="None" value="None" />
            </Picker>
          </View>
          <TextInput
            label="COUNTRY"
            returnKeyType="next"
            value={country}
            onChangeText={(text) => {
              findCountry(text);
            }}
          />

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

          <TextInput
            label="PASSWORD"
            returnKeyType="done"
            value={password.value}
            onChangeText={(text) => setPassword({ value: text, error: "" })}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
          />

          <Button
            mode="contained"
            onPress={_onSignUpPressed}
            style={styles.button}
          >
            Sign Up
          </Button>

          <View style={styles.row}>
            <Text style={styles.label}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Login")}
            >
              <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Background>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  registerContainer: {
    width: "80%",
    maxWidth: 340,
    // padding: 20,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
});

export default RegisterScreen;
