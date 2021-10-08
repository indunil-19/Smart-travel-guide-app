import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import {
  Button,
  Card,
  Paragraph,
  Checkbox,
  IconButton,
} from "react-native-paper";
import { theme } from "../core/theme";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import { icon } from "../components/Icon";

const showAlert = () =>
  Alert.alert(
    "Preference not selected",
    "Select at least one preference.",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
    ],
    {
      cancelable: true,
    }
  );

const PreferenceCard = (props) => {
  const [buttonStyle, setButtonStyle] = useState("space-between");
  const [selectedValue, setSelectedValue] = useState();
  const [checkedState, setCheckedState] = useState(
    new Array(props.checkerOptions.length).fill(false)
  );

  useEffect(() => {
    if (props.firstPage && !props.lastPage) {
      setButtonStyle("flex-end");
    } else {
      setButtonStyle("space-between");
    }
  });
  const renderIcon = (option) => {
    return <IconButton icon={icon(option)} color="green" size={22} disabled />;
  };

  const checkHandler = (key, restriction) => {
    if (
      checkedState.reduce(function (acc, val) {
        return acc + val;
      }, 0) >= restriction
    ) {
      if (checkedState[key]) {
        const updatedCheckedState = checkedState.map((item, index) =>
          index === key ? !item : item
        );
        setCheckedState(updatedCheckedState);
      }
    } else {
      const updatedCheckedState = checkedState.map((item, index) =>
        index === key ? !item : item
      );
      setCheckedState(updatedCheckedState);
    }
  };

  const renderButtons = () => {
    // * Renders Buttons on the card according to the type of page
    if (!props.firstPage && !props.lastPage) {
      return (
        <>
          <Button
            icon="skip-previous"
            onPress={() => {
              onButtonPressHandler("prev");
            }}
          >
            Prev
          </Button>
          <Button
            icon="skip-next"
            contentStyle={{ flexDirection: "row-reverse" }}
            onPress={() => {
              onButtonPressHandler("next");
            }}
          >
            Next
          </Button>
        </>
      );
    } else if (props.firstPage && !props.lastPage) {
      return (
        <Button
          icon="skip-next"
          contentStyle={{ flexDirection: "row-reverse" }}
          onPress={() => {
            onButtonPressHandler("next");
          }}
        >
          Next
        </Button>
      );
    } else if (!props.firstPage && props.lastPage) {
      return (
        <>
          <Button
            icon="skip-previous"
            onPress={() => {
              onButtonPressHandler("prev");
            }}
          >
            Prev
          </Button>
          <Button
            icon="checkbox-marked-circle-outline"
            contentStyle={{ flexDirection: "row-reverse" }}
            onPress={() => {
              onButtonPressHandler("done");
            }}
          >
            Done
          </Button>
        </>
      );
    }
  };

  const renderOptions = () => {
    //* Renders a checkbox or dropdown picker according to the question type
    if (props.checkerOptions.length) {
      return props.checkerOptions.map((option, index) => (
        <View key={index} style={styles.optionContainer}>
          <Checkbox.Item
            status={checkedState[index] ? "checked" : "unchecked"}
            label={option}
            color={theme.colors.primary}
            position="leading"
            uncheckedColor={theme.colors.secondary}
            onPress={() => {
              checkHandler(index, props.restriction);
            }}
          />
          {renderIcon(option)}
        </View>
      ));
    } else {
      return (
        <Picker
          dropdownIconColor="#000000"
          selectedValue={selectedValue}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
        >
          {props.pickerOptions.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
          ))}
        </Picker>
      );
    }
  };
  const filterCheckOptions = () => {
    let selectedOptions = [];
    for (let i = 0; i < checkedState.length; i++) {
      if (checkedState[i]) {
        selectedOptions.push(props.checkerOptions[i]);
      }
    }
    return selectedOptions;
  };
  const onButtonPressHandler = (navigate) => {
    if (navigate === "prev") {
      props.navigation("prev");
    } else if (navigate === "next" || navigate === "done") {
      if (!selectedValue && checkedState.some((state) => state)) {
        props.navigation(filterCheckOptions());
      } else if (selectedValue && !checkedState.some((state) => state)) {
        props.navigation(selectedValue);
      } else {
        showAlert();
      }
    }
  };

  return (
    <Card mode="outlined" style={{ ...styles.card, display: props.display }}>
      <LinearGradient
        colors={["#8af4e5", "white"]}
        style={styles.linearGradient}
      >
        <Card.Content>
          <Paragraph style={styles.question}>{props.question}</Paragraph>

          {renderOptions()}
        </Card.Content>
      </LinearGradient>

      <Card.Actions
        style={{
          flexDirection: "row",
          justifyContent: buttonStyle,
        }}
      >
        {renderButtons()}
      </Card.Actions>
    </Card>
  );
};
const styles = StyleSheet.create({
  card: {
    // paddingVertical: 20,
    // paddingHorizontal: 10,
    width: "90%",
    alignSelf: "center",
    borderRadius: 20,
    elevation: 10,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  linearGradient: {
    borderRadius: 20,
    justifyContent: "center",
    paddingVertical: 10,
  },
  question: {
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
  },

  optionContainer: {
    width: "75%",
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",

    justifyContent: "space-between",
  },
});

PreferenceCard.defaultProps = {
  display: "none",
  question: "",
  restriction: "",
  checkerOptions: [],
  pickerOptions: [],
  firstPage: false,
  lastPage: false,
};
export default PreferenceCard;
