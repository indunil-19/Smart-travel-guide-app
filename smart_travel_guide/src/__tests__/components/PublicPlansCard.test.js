import React from "react";
import { AppProvider } from "../../context/AppContext";
import { Provider as PaperProvider } from "react-native-paper";
import renderer from "react-test-renderer";
import { PublicPlanCard } from "../../components/PublicPlansCard";
test("should match snapshot", () => {
  const tree = renderer
    .create(
      <AppProvider>
        <PaperProvider>
          <PublicPlanCard />
        </PaperProvider>
      </AppProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
