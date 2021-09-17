import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { AppContext } from "../context/AppContext";
import Background from "../components/Background";
import PreferenceCard from "../components/PreferenceCard";

// import Button from "../components/Button";

const AddPlan = (props) => {
  const [climate, setClimate] = useState("dry");
  const [provinces, setProvinces] = useState([]);
  const [days, setDays] = useState("1");
  const [religion, setReligion] = useState("");
  const [placesLike, setPlacesLike] = useState([]);
  const [thingsLike, setThingsLike] = useState([]);

  const { state, dispatch } = useContext(AppContext);

  return (
    <Background>
      <View style={styles.preferenceContainer}>
        <PreferenceCard
          question="What Climate Condition would you expect while travelling?"
          checkOptions={["Dry", "Intermediate", "Wet"]}
          display="flex"
        />
        {/* <PreferenceCard display="None" /> */}
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  preferenceContainer: {},
});
export default AddPlan;
