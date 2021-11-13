import React from "react";
import { cleanup, render } from "@testing-library/react-native/pure";
import { AppProvider } from "../../context/AppContext";
import { Provider as PaperProvider } from "react-native-paper";
import renderer from "react-test-renderer";
import LoginScreen from "../../screens/Login";

afterEach(cleanup);

it("renders correctly", () => {
  render(
    <AppProvider>
      <PaperProvider>
        <LoginScreen />
      </PaperProvider>
    </AppProvider>
  );
});

afterEach(cleanup);

test("should match snapshot", () => {
  const tree = renderer
    .create(
      <AppProvider>
        <PaperProvider>
          <LoginScreen />
        </PaperProvider>
      </AppProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

// it("shows invalid inputs messages",()=>{

// })
