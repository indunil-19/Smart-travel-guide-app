import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import TextInput from "../../components/TextInput";

test("should match snapshot", () => {
  const tree = renderer.create(<TextInput />).toJSON();
  expect(tree).toMatchSnapshot();
});

// const inputText = "Chris Haynes";
// const errorText = "Invalid email address";

// it("should render without crashing", () => {
//   const { getByTestId } = render(
//     <TextInput value={inputText} error={true} errorText={errorText} />
//   );
//   expect(getByTestId("text-input")).toHaveTextContent("Chirs Haynes");
// });
