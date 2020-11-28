import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import * as Font from "expo-font";
import StockCardComponent from "../components/StockCardComponent";
import { MaterialIcons } from "@expo/vector-icons";
import Spacer from "../components/Spacer";
import { SimpleLineIcons } from "@expo/vector-icons";
import IndexCardComponent from "../components/IndexCardComponent";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const ExploreScreen = (props) => {
  const [loaded] = Font.useFonts({
    roboto: require("../../assets/Roboto-Regular.ttf"),
    robotothin: require("../../assets/Roboto-Thin.ttf"),
    robotolight: require("../../assets/Roboto-Light.ttf"),
  });
  if (!loaded) {
    return null;
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              height: 80,
              backgroundColor: "white",
              //borderBottomWidth: 1,
              //borderBottomColor: "#dddddd",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                //padding: 10,
                backgroundColor: "white",
                marginHorizontal: 20,
                // shadowOffset: { width: 0, height: 0 },
                // shadowColor: "black",
                // shadowOpacity: 0.2,
                // elevation: 1,
                marginTop: Platform.OS == "android" ? 30 : null,
              }}
            >
              <MaterialIcons
                name="explore"
                size={35}
                color="black"
                style={{ paddingTop: 10, alignSelf: "center" }}
              />
            </View>
          </View>
          <ScrollView scrollEventThrottle={16}>
            <View
              style={{
                flex: 1,
                backgroundColor: "#fff",
                alignItems: "center",
                justifyContent: "center",
                borderColor: "red",
                borderRadius: 2,
              }}
            >
              <Spacer />
              <Spacer />
              {/* <Image
                source={require("../../assets/hypersonix.png")}
                style={styles.image}
              /> */}
              <Text
                style={{
                  fontFamily: "robotothin",
                  fontSize: 60,
                  alignSelf: "center",
                }}
              >
                Buy Stocks
              </Text>
              <Text
                style={{
                  fontFamily: "roboto",
                  fontSize: 40,
                  alignSelf: "center",
                  color: "black",
                }}
              >
                right now.
              </Text>
              <Spacer />
              {/* <Button
        title="Login "
        onPress={() => props.navigation.navigate("ResolveAuth")}
      /> */}
              <SimpleLineIcons name="arrow-down" size={24} color="black" />
              <Spacer />
            </View>
            <View style={{ backgroundColor: "white", flex: 1, paddingTop: 20 }}>
              <Text
                style={{
                  fontSize: 24,
                  paddingHorizontal: 20,
                  fontFamily: "robotolight",
                }}
              >
                Market Indices
              </Text>
              <View style={{ height: 130, marginTop: 20 }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <IndexCardComponent
                    value="12,458.11"
                    name="NIFTY 50"
                    index="NSE"
                    change={18.12}
                  />
                  <IndexCardComponent
                    value="112,545.56"
                    name="SENSEX"
                    index="BSE"
                    change={110.4}
                  />
                </ScrollView>
              </View>
              <Text
                style={{
                  fontSize: 24,
                  paddingHorizontal: 20,
                  fontFamily: "robotolight",
                  paddingTop: 20,
                }}
              >
                Top Gainers{"  "}
                <Ionicons name="ios-trending-up" size={24} color="black" />
              </Text>
              <View style={{ height: 130, marginTop: 20 }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate("ViewStock", { symbol: "AAPL" })
                    }
                  >
                    <StockCardComponent
                      value={1245.12}
                      name="Apple Inc."
                      change={23.5}
                    />
                  </TouchableOpacity>
                  <StockCardComponent
                    value={75.44}
                    name="Alphabet Inc"
                    change={45.15}
                  />
                  <StockCardComponent
                    value={561.15}
                    name="Tesla Co."
                    change={53.88}
                  />
                  <StockCardComponent
                    value={1269}
                    name="Pepsico "
                    change={2.66}
                  />
                  <StockCardComponent
                    value={2370.78}
                    name="Hypersonix LTD"
                    change={22.5}
                  />
                  <StockCardComponent value={545} name="IBM" change={0.5} />
                </ScrollView>
              </View>
              <Text
                style={{
                  fontSize: 24,
                  fontFamily: "robotolight",
                  paddingTop: 20,
                  paddingHorizontal: 20,
                }}
              >
                Top Losers{"  "}
                <Ionicons name="ios-trending-down" size={24} color="black" />
              </Text>
              <View style={{ height: 130, marginTop: 20 }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <StockCardComponent
                    value={1245.12}
                    name="Apple Inc."
                    change={-23.5}
                  />
                  <StockCardComponent
                    value={75.44}
                    name="Alphabet Inc"
                    change={-45.15}
                  />
                  <StockCardComponent
                    value={561.15}
                    name="Tesla Co."
                    change={-53.88}
                  />
                  <StockCardComponent
                    value={1269}
                    name="Pepsico "
                    change={-2.66}
                  />
                  <StockCardComponent
                    value={2370.78}
                    name="Hypersonix LTD"
                    change={-22.5}
                  />
                  <StockCardComponent value={545} name="IBM" change={-0.5} />
                </ScrollView>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* <Text h5 style={{ fontFamily: "robotothin" }}>
          Explore Screen
        </Text>
        <Button
          title="View Stock"
          onPress={() =>
            props.navigation.navigate("ViewStock", { symbol: "IBM" })
          }
        /> */}
      </SafeAreaView>
    );
  }
};

ExploreScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ExploreScreen;
