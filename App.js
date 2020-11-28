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
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import NewsScreen from "./src/screens/NewsScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
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

const bottomNavigatorConfigs = {
  initialRouteName: "exploreFlow",
  tabBarOptions: {
    style: {
      height: 60,
      backgroundColor: "white",
      borderTopWidth: 0,
      elevation: 5,
    },
    activeTintColor: "black",
    inactiveTintColor: "grey",
  },
};

const exploreFlow = createStackNavigator({
  Explore: ExploreScreen,
  ViewStock: ViewStockScreen,
});

const searchFlow = createStackNavigator({
  Search: SearchStockScreen,
  ViewStock: ViewStockScreen,
});

const voiceSearchFlow = createStackNavigator({
  VoiceSearch: NewsScreen,
  ViewStock: ViewStockScreen,
});

exploreFlow.navigationOptions = {
  title: "",
  tabBarIcon: ({ tintColor }) => (
    <MaterialIcons
      name="explore"
      size={24}
      color={tintColor}
      style={{ paddingTop: 10 }}
    />
  ),
};

searchFlow.navigationOptions = {
  title: "",
  tabBarIcon: ({ tintColor }) => (
    <AntDesign
      name="search1"
      size={24}
      color={tintColor}
      style={{ paddingTop: 10 }}
    />
  ),
};

voiceSearchFlow.navigationOptions = {
  title: "",
  tabBarIcon: ({ tintColor }) => (
    <Ionicons
      name="ios-paper"
      size={24}
      color={tintColor}
      style={{ paddingTop: 10 }}
    />
  ),
};

const switchNavigator = createSwitchNavigator({
  // fingerPrintFlow: createStackNavigator({
  //   FingerPrint: FingerPrintScreen,
  // }),
  // loginFlow: createStackNavigator({
  //   Login: LoginScreen,
  //   ResolveAuth: ResolveAuthScreen,
  // }),
  mainFlow: createBottomTabNavigator(
    {
      exploreFlow,
      searchFlow,
      voiceSearchFlow,
      Account: AccountScreen,
    },
    bottomNavigatorConfigs
  ),
});

export default createAppContainer(switchNavigator);
