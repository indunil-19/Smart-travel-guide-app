import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Carousel from "react-native-snap-carousel";
import { Avatar, Card, Paragraph } from "react-native-paper";
import { AirbnbRating } from "react-native-ratings";
import { theme } from "../core/theme";

export const ReviewSlider = (props) => {
  const [reviews, setReviews] = useState([]);

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setReviews((cur) => props.reviews);
    setLoading(false);
  }, [props.reviews]);

  const renderItem = ({ item, index }) => {
    if (!item.text) {
      console.log("null");
      return;
    }
    return (
      <Card style={styles.card} elevation={8}>
        <Card.Title
          style={{ backgroundColor: theme.colors.primary, borderRadius: 20 }}
          title={item.author_name}
          rightStyle={{ paddingRight: 10 }}
          right={() => (
            <Avatar.Image size={30} source={{ uri: item.profile_photo_url }} />
          )}
        />
        <Card.Content>
          <AirbnbRating
            count={5}
            defaultRating={item.rating}
            selectedColor={theme.colors.primary}
            showRating={false}
            size={20}
            isDisabled
          />
          <Paragraph numberOfLines={5} ellipsizeMode="tail">
            {item.text}
          </Paragraph>
        </Card.Content>
      </Card>
    );
  };
  return (
    <>
      {!isLoading && (
        <Carousel
          layout={"tinder"}
          layoutCardOffset={`9`}
          data={props.reviews}
          sliderWidth={300}
          itemWidth={300}
          renderItem={renderItem}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "90%",
    minHeight: 200,
    maxHeight: 200,
    alignSelf: "center",
    marginVertical: 12,
    borderRadius: 20,
  },
});
