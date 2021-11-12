import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import { LocationInfoCard } from "../../components/LocationInfoCard";

test("should match snapshot", () => {
  const tree = renderer
    .create(
      <LocationInfoCard
        photo={"imglink"}
        location={{
          name: "Galle Face Beach",
          formatted_address: "Galle Face,Colombo",
          icon: "iconLink",
          rating: 4,
        }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
