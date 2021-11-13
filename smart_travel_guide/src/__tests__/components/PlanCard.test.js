import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import { AppProvider } from "../../context/AppContext";
import { Provider as PaperProvider } from "react-native-paper";
import renderer from "react-test-renderer";
import { PlanCard } from "../../components/PlanCard";

test("should match snapshot", () => {
  const tree = renderer
    .create(
      <AppProvider>
        <PaperProvider>
          <PlanCard />
        </PaperProvider>
      </AppProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
