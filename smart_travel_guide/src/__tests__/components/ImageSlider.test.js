import React from "react";
import { AppProvider } from "../../context/AppContext";
import { Provider as PaperProvider } from "react-native-paper";
import renderer from "react-test-renderer";
import { ImageSlider } from "../../components/ImageSlider";
test("should match snapshot", () => {
  const tree = renderer
    .create(
      <AppProvider>
        <PaperProvider>
          <ImageSlider />
        </PaperProvider>
      </AppProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
