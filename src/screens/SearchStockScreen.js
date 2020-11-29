import React, { useState } from "react";
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  LogBox,
} from "react-native";
import LoaderComponent from "../components/LoaderComponent";
import SearchComponent from "../components/SearchComponent";
import useResult from "../hooks/useResult";
import * as Font from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import TrendingStockComponent from "../components/TrendingStockComponent";
LogBox.ignoreAllLogs();

const SearchStockScreen = (props) => {
  const [scrollYValue, setScrollYValue] = useState(new Animated.Value(0));
  const [searchTerm, setSearchTerm] = useState("");
  const [searchApi, results, error] = useResult();
  const trending = [
    {
      unique: Math.floor(Math.random() * 999999),
      name: "Apple Inc",
      symbol: "AAPL",
    },
    {
      unique: Math.floor(Math.random() * 999999),
      name: "Aplhabet Inc",
      symbol: "GOOG",
    },

    {
      unique: Math.floor(Math.random() * 999999),
      name: "Tesco PLC",
      symbol: "TSCO",
    },

    {
      unique: Math.floor(Math.random() * 999999),
      name: "Walmart",
      symbol: "WMT",
    },
  ];
  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollYValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: "clamp",
      }),
      new Animated.Value(0)
    ),
    0,
    50
  );
  const [loaded] = Font.useFonts({
    roboto: require("../../assets/Roboto-Regular.ttf"),
    robotothin: require("../../assets/Roboto-Thin.ttf"),
    robotolight: require("../../assets/Roboto-Light.ttf"),
  });
  if (!loaded) {
    return null;
  } else {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
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
              <AntDesign
                name="search1"
                size={35}
                color="black"
                style={{ paddingTop: 10, alignSelf: "center" }}
              />
            </View>
          </View>
          <ScrollView scrollEventThrottle={16}>
            <Animated.View
              style={{
                flex: 1,
                backgroundColor: "white",
              }}
            >
              <SafeAreaView style={{ backgroundColor: "white" }}>
                <SearchComponent
                  clampedScroll={clampedScroll}
                  term={searchTerm}
                  onTermChange={(term) => {
                    setSearchTerm(term);
                    searchApi(searchTerm);
                  }}
                  onTermSubmit={() => {
                    //searchApi(searchTerm);
                    //console.log("term submitted");
                    //console.log(results);
                  }}
                />
                <Animated.ScrollView
                  showsVerticalScrollIndicator={false}
                  style={styles.scrollview}
                  contentContainerStyle={styles.content}
                  onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollYValue } } }],
                    { useNativeDriver: true },
                    () => {} // Optional async listener
                  )}
                  contentInsetAdjustmentBehavior="automatic"
                >
                  {searchTerm.length > 1
                    ? results != null
                      ? results.map((item) => (
                          <LoaderComponent
                            data={item}
                            unique={Math.floor(Math.random() * 999999)}
                            onPress={() => {
                              props.navigation.navigate("ViewStock", {
                                symbol: item["1. symbol"],
                              });
                            }}
                          />
                        ))
                      : null
                    : trending.map((item) => (
                        <TrendingStockComponent
                          unique={item.unique}
                          name={item.name}
                          symbol={item.symbol}
                          onPress={() => {
                            props.navigation.navigate("ViewStock", {
                              symbol: item.symbol,
                            });
                          }}
                        />
                      ))}
                </Animated.ScrollView>
              </SafeAreaView>
            </Animated.View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
};

SearchStockScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  scrollview: {
    margin: 20,
    backgroundColor: "white",
    paddingTop: 55,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});

export default SearchStockScreen;
