import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, Button, Title, Card, Paragraph } from "react-native-paper";

const LocationCard = (props) => {
  // const [link, setLink] = useState("");
  // useEffect(() => {
  //   setLink(
  //     `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo}&key=AIzaSyCB9FiwGVeEmdfBAwxiQpPuz0fsDMiwPWY`
  //   );
  // }, [photo]);
  return (
    <Card>
      <Card.Title title={props.name} />
      {console.log(props)}
    </Card>
  );
};

const styles = StyleSheet.create({});
export default LocationCard;
