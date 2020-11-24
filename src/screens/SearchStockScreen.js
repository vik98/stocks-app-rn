import React, { useState } from "react";
import {
  Animated,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import LoaderComponent from "../components/LoaderComponent";
import SearchComponent from "../components/SearchComponent";
import useResult from "../hooks/useResult";

const SearchStockScreen = (props) => {
  const [scrollYValue, setScrollYValue] = useState(new Animated.Value(0));
  const [searchTerm, setSearchTerm] = useState("");
  const [searchApi, results, error] = useResult();

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
  const array = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
  ];

  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ backgroundColor: "white" }}>
        <SearchComponent
          clampedScroll={clampedScroll}
          term={searchTerm}
          onTermChange={(term) => setSearchTerm(term)}
          onTermSubmit={() => {
            searchApi(searchTerm);
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
          {results != null
            ? results.map((item) => (
                <LoaderComponent
                  data={item}
                  onPress={() => {
                    props.navigation.navigate("ViewStock", {
                      symbol: item["1. symbol"],
                    });
                  }}
                />
              ))
            : null}
        </Animated.ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
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
