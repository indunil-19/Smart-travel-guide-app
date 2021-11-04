import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Card, IconButton, Button } from "react-native-paper";
import { AirbnbRating } from "react-native-ratings";

import { theme } from "../core/theme";
import { Config } from "../config/config";

export const LocationInfoCard = ({ photo, location }) => {
  const [imgLink, setImgLink] = useState("");
  const [isLoading, setLoaded] = useState(true);

  useEffect(() => {
    if (photo) {
      setImgLink(
        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo}&key=${Config.apiKey}`
      );
      setLoaded(false);
    }
  }, [photo]);
  return (
    <Card elevation={6} style={styles.card}>
      {!isLoading && (
        <Card.Cover
          source={{ uri: photo ? imgLink : "" }}
          style={styles.cover}
        />
      )}
      {isLoading && (
        <Card.Cover
          source={require("../assets/img/load-loading.gif")}
          style={styles.cover}
        />
      )}

      <Card.Title
        title={location.name}
        subtitle={location.formatted_address}
        right={() => (
          <IconButton
            icon={{ uri: location.icon }}
            color={theme.colors.primary}
            size={15}
          />
        )}
        style={{ paddingHorizontal: 10 }}
      />
      <Card.Content
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingRight: 5,
        }}
      >
        <AirbnbRating
          count={5}
          defaultRating={location.rating}
          selectedColor={theme.colors.primary}
          showRating={false}
          size={20}
          isDisabled
        />
        <Button>Learn More</Button>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "90%",
    alignSelf: "center",
    marginVertical: 12,
    borderRadius: 10,
  },
  cover: {},
});
