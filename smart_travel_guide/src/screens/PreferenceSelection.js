import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Snackbar } from "react-native-paper";
import { AppContext } from "../context/AppContext";
import Background from "../components/Background";
import PreferenceCard from "../components/PreferenceCard";

/* 
? Things do 
* Create a new alert component from scratch to inculde the theme of the app
* Under the provinces card the snackbar button to navigate to the provinces page doesnt work --fix it
! Fix the back from travel plan 
*/

const links = [
  require("../assets/img/1.jpg"),
  require("../assets/img/2.jpg"),
  require("../assets/img/3.jpg"),
  require("../assets/img/4.jpg"),
  require("../assets/img/5.jpg"),
  require("../assets/img/6.jpg"),
];
const PreferenceSelection = (props) => {
  const [cardState, setCardState] = useState([
    "flex",
    "none",
    "none",
    "none",
    "none",
    "none",
  ]);
  const [preference, setPreference] = useState([]);
  const [visible, setVisible] = useState(false);
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({ type: "set_travelPlan", payload: { travelPlan: null } });
    dispatch({ type: "set_planId", payload: { planId: null } });
    if (preference.length === 6) {
      dispatch({
        type: "USER_PREFERENCES",
        payload: {
          userPreferences: {
            climate: preference[0][0].toLowerCase(),
            provinces: preference[1],
            days: preference[2],
            religion: preference[3][0],
            placesLike: preference[4],
            thingsLike: preference[5],
          },
        },
      });
    }
  }, [preference]);
  const backgroundImageSelector = () => {
    return links[cardState.indexOf("flex")];
  };

  const confirmPrefernces = (value) => {
    Alert.alert("Confirm preferences", "Submit the selected prefernces.", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Confirm",
        onPress: () => {
          setPreference((curPreference) => [...curPreference, value]);
          // props.navigation.navigate("Travel Plan");

          props.navigation.navigate("Travel Plan", {
            permissions: "edit",
          });
        },
      },
    ]);
  };

  const snackBarHandler = () => {
    if (cardState[1] !== "flex") {
      return;
    } else {
      setVisible(true);
    }
  };

  const navigationHandler = (value) => {
    if (value != "prev") {
      setPreference((curPreference) => {
        if (curPreference.length < 5) {
          return [...curPreference, value];
        } else {
          return curPreference;
        }
      });
      if (cardState.slice(-1)[0] !== "flex") {
        setCardState((curCardState) => {
          for (let i = 0; i < curCardState.length; i++) {
            if (curCardState[i] === "flex") {
              curCardState[i] = "none";
              curCardState[i + 1] = "flex";
              break;
            }
          }
          snackBarHandler();
          return curCardState;
        });
      } else {
        confirmPrefernces(value);
      }
    } else {
      setPreference((curPreference) => {
        const temp = [...curPreference];
        temp.splice(preference.length - 1, 1);

        return temp;
      });
      setCardState((curCardState) => {
        for (let i = 0; i < curCardState.length; i++) {
          if (curCardState[i] === "flex" && i != 0) {
            curCardState[i] = "none";
            curCardState[i - 1] = "flex";
            break;
          }
        }

        return curCardState;
      });
    }
  };

  return (
    <Background backgroundImage={backgroundImageSelector()}>
      <View style={styles.preferenceContainer}>
        {/* <Snackbar
          visible={visible}
          style={styles.barContainer}
          onDismiss={() => {
            setVisible(false);
          }}
          action={{
            label: "Learn More",
            onPress: () => {
              props.navigation.navigate("Provinces");
            },
          }}
        >
          Do know about the provinces in Sri Lanka?
        </Snackbar> */}
        <PreferenceCard
          question="What Climate Condition would you expect while travelling?"
          checkerOptions={["Dry", "Intermediate", "Wet"]}
          firstPage={true}
          display={cardState[0]}
          restriction={1}
          navigation={navigationHandler}
        />
        <PreferenceCard
          question="Select at most 3 Provinces you like to visit in Sri Lanka?"
          checkerOptions={[
            "Northern",
            "North Western",
            "Western",
            "North Central",
            "Central",
            "Southern",
            "Uva",
            "Sabaragamuwa",
            "Eastern",
          ]}
          restriction={3}
          display={cardState[1]}
          navigation={navigationHandler}
        />
        <PreferenceCard
          question="Number of Days , you hope to travel?"
          checkerOptions={[]}
          pickerOptions={["Select Number of Days", "1 Day", "2 Days", "3 Days"]}
          display={cardState[2]}
          navigation={navigationHandler}
        />
        <PreferenceCard
          question="Any particular religious locations you would like to see in your travel?"
          checkerOptions={["Buddhism", "Hindu", "Islam", "Catholic", "None"]}
          display={cardState[3]}
          restriction={1}
          navigation={navigationHandler}
        />
        <PreferenceCard
          question="Select at most 3 places you like to visit in Sri Lanka?"
          checkerOptions={[
            "Natural",
            "Animal",
            "Botenical gardens",
            "Parks",
            "Beaches",
            "Ancient",
            "Reliogous",
          ]}
          display={cardState[4]}
          restriction={3}
          navigation={navigationHandler}
        />
        <PreferenceCard
          question="Select things you like to do during a trip?"
          checkerOptions={[
            "Hiking",
            "Surfing",
            "Camping",
            "Swimming",
            "Riding boats",
            "Ancient",
            "Reliogous",
          ]}
          lastPage={true}
          restriction={3}
          display={cardState[5]}
          navigation={navigationHandler}
        />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  preferenceContainer: {
    flex: 1,
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },
  barContainer: {
    borderRadius: 20,
    elevation: 20,
  },
});
PreferenceCard.defaultProps = {
  questions: 6,
};
export default PreferenceSelection;
