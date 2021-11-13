import React from "react";
import { AppProvider } from "../../context/AppContext";
import { Provider as PaperProvider } from "react-native-paper";
import renderer from "react-test-renderer";
import PreferenceCard from "../../components/PreferenceCard";
test("should match snapshot", () => {
  const tree = renderer
    .create(
      <AppProvider>
        <PaperProvider>
          <PreferenceCard />
        </PaperProvider>
      </AppProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
