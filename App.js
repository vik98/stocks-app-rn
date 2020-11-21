import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./src/screens/LoginScreen";
import AccountScreen from "./src/screens/AccountScreen";
import ExploreScreen from "./src/screens/ExploreScreen";
import SearchStockScreen from "./src/screens/SearchStockScreen";
import ViewStockScreen from "./src/screens/ViewStockScreen";
import VoiceSearchStockScreen from "./src/screens/VoiceSearchStockScreen";
import FingerPrintScreen from "./src/screens/FingerPrintScreen";

// const navigator = createStackNavigator(
//   {
//     Index: IndexScreen,
//   },
//   {
//     initialRouteName: "Index",
//     defaultNavigationOptions: {
//       title: "Stocks",
//     },
//     headerMode: "none",
//   }
// );

// const MainNavigator = createSwitchNavigator({
//   Login: { screen: LoginScreen },
//   Profile: { screen: ProfileScreen },
// });

const switchNavigator = createSwitchNavigator({
  // fingerPrintFlow: createStackNavigator({
  //   FingerPrint: FingerPrintScreen,
  // }),
  // loginFlow: createStackNavigator({
  //   Login: LoginScreen,
  // }),
  mainFlow: createBottomTabNavigator({
    exploreFlow: createStackNavigator({
      Explore: ExploreScreen,
      ViewStock: ViewStockScreen,
    }),
    searchFlow: createStackNavigator({
      Search: SearchStockScreen,
      ViewStock: ViewStockScreen,
    }),
    voiceSearchFlow: createStackNavigator({
      VoiceSearch: VoiceSearchStockScreen,
      ViewStock: ViewStockScreen,
    }),
    Account: AccountScreen,
  }),
});

export default createAppContainer(switchNavigator);
