import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Card, Paragraph, Checkbox } from "react-native-paper";
import { theme } from "../core/theme";
import { Picker } from "@react-native-picker/picker";

const PreferenceCard = (props) => {
  const [selectedValue, setSelectedValue] = useState();
  const [checkedState, setCheckedState] = useState(
    new Array(props.checkOptions.length).fill(false)
  );
  const checkHandler = (key) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === key ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };
  // const renderButtons = () =>{
  //   if(props.firstPage && !props.lastPage){

  //   }
  // }
  const renderOptions = () => {
    if (props.checkOptions.length) {
      return props.checkOptions.map((option, index) => (
        <View key={index} style={styles.optionContainer}>
          <Checkbox.Item
            status={checkedState[index] ? "checked" : "unchecked"}
            label={option}
            color={theme.colors.primary}
            uncheckedColor={theme.colors.secondary}
            onPress={() => {
              checkHandler(index);
            }}
          />
        </View>
      ));
    } else {
      return (
        <Picker
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

  return (
    <Card mode="outlined" style={styles.card}>
      <Card.Content>
        <Paragraph style={styles.question}>{props.question}</Paragraph>
        {renderOptions()}
      </Card.Content>

      <Card.Actions
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {/* {renderButtons()} */}
        <Button icon="skip-previous" onPress={() => {}}>
          Prev
        </Button>
        <Button
          icon="skip-next"
          contentStyle={{ flexDirection: "row-reverse" }}
          onPress={() => {}}
        >
          Next
        </Button>
      </Card.Actions>
    </Card>
  );
};
const styles = StyleSheet.create({
  card: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: "90%",

    alignSelf: "center",
    borderRadius: 20,
    elevation: 10,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  question: {
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  optionContainer: {
    width: "80%",
    alignSelf: "center",
  },
});

PreferenceCard.defaultProps = {
  question: "What kind of weather do you like ?",
  checkOptions: ["Sunny", "Cloudy", "Chilly", "Gloomy"],
  pickerOptions: ["Sunny", "Cloudy", "Chilly", "Gloomy"],
  firstPage: false,
  lastPage: false,
};
export default PreferenceCard;
