import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import DeprecatedViewPropTypes from "react-native/Libraries/DeprecatedPropTypes/DeprecatedViewPropTypes";

const ExploreScreen = (props) => {
  return (
    <View>
      <Text>Explore Screen</Text>
      <Button
        title="View Stock"
        onPress={() => props.navigation.navigate("ViewStock")}
      />
    </View>
  );
};

ExploreScreen.navigationOptions = {
  tabBarVisible: false,
};

const styles = StyleSheet.create({});

export default ExploreScreen;
