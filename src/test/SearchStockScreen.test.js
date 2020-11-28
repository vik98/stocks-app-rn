import React from "react";
import renderer from "react-test-renderer";
import SearchStockScreen from "../screens/SearchStockScreen";

describe("<SearchStockScreen/>", () => {
  it("has 1 child", () => {
    const tree = renderer.create(<SearchStockScreen />).toJSON();
    expect(tree.children.length).toBe(1);
  });
  it("renders correctly across screens", () => {
    const tree = renderer.create().toJSON();
    expect(tree).toMatchSnapshot();
  });
});
