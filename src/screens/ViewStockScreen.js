import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  Button,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Spacer from "../components/Spacer";
import api from "../api/api";
import {
  VictoryChart,
  VictoryAxis,
  VictoryCandlestick,
  VictoryTheme,
  VictoryLine,
} from "victory-native";
import { Text } from "react-native-elements";
import * as Font from "expo-font";

const ViewStockScreen = ({ navigation }) => {
  const API_KEY = "VHYF2QV90AU1CXSU";
  //VHYF2QV90AU1CXSU;

  useEffect(() => {
    getData("DAILY");
  }, []);

  const [data, setData] = useState([]);
  const [line, setLine] = useState([]);
  const [symbol, setSymbol] = useState({});
  const [profile, setProfile] = useState([]);

  const getData = async (filter) => {
    const param = navigation.getParam("symbol");
    let filterVariable;
    if (filter === "DAILY") {
      filterVariable = "Time Series (Daily)";
    } else if (filter === "MONTHLY") {
      filterVariable = "Monthly Time Series";
    } else {
      filterVariable = "Weekly Time Series";
    }
    const response = await api.get(
      `/query?function=TIME_SERIES_${filter}&symbol=${param}&&apikey=${API_KEY}`
    );
    const quote = await api.get(
      `/query?function=GLOBAL_QUOTE&symbol=${param}&&apikey=${API_KEY}`
    );

    const profile = await api.get(
      `https://financialmodelingprep.com/api/v3/profile/${param}?apikey=8aeb3f79461fd5ce1ad1f26f07f16f09`
    );
    console.log(response.data);
    console.log(quote.data);
    setProfile(profile.data);

    const symbol = {
      symbol: quote.data["Global Quote"]["01. symbol"],
      low: quote.data["Global Quote"]["04. low"],
      high: quote.data["Global Quote"]["03. high"],
      volume: quote.data["Global Quote"]["06. volume"],
      price: quote.data["Global Quote"]["05. price"],
      change: Number(
        quote.data["Global Quote"]["10. change percent"].replace(/\%/g, "")
      ),
    };
    setSymbol(symbol);
    const candleStick = Object.keys(response.data[filterVariable]).map(
      (date) => {
        return {
          x: new Date(date.replace(/ /g, "T")),
          open: response.data[filterVariable][date]["1. open"],
          close: response.data[filterVariable][date]["4. close"],
          high: response.data[filterVariable][date]["2. high"],
          low: response.data[filterVariable][date]["3. low"],
        };
      }
    );
    candleStick.sort(function (a, b) {
      return b.x - a.x;
    });
    const lineChart = Object.keys(response.data[filterVariable]).map((date) => {
      return {
        x: new Date(date.replace(/ /g, "T")),
        y: Number(response.data[filterVariable][date]["5. volume"]),
      };
    });
    lineChart.sort(function (a, b) {
      return b.x - a.x;
    });
    setData(candleStick.slice(0, 5));
    setLine(lineChart.slice(0, 5));
  };

  const [loaded] = Font.useFonts({
    roboto: require("../../assets/Roboto-Regular.ttf"),
    robotothin: require("../../assets/Roboto-Thin.ttf"),
    robotolight: require("../../assets/Roboto-Light.ttf"),
  });
  if (!loaded) {
    return null;
  } else {
    const change = () => {
      if (symbol.change > 0) {
        return (
          <Text h6 style={{ color: "green", fontFamily: "robotolight" }}>
            <MaterialCommunityIcons name="arrow-up" size={13} color="green" />
            {symbol.change} %
          </Text>
        );
      } else {
        return (
          <Text h6 style={{ color: "red", fontFamily: "robotolight" }}>
            <MaterialCommunityIcons name="arrow-down" size={13} color="red" />
            {symbol.change} %
          </Text>
        );
      }
    };

    if (data.length > 0) {
      return (
        <ScrollView style={{ backgroundColor: "white" }}>
          <View style={styles.symbol}>
            <View style={{ paddingTop: 10 }}>
              <Image
                style={{
                  width: 40,
                  height: 30,
                  resizeMode: "contain",
                }}
                source={{
                  uri: profile[0]["image"],
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                marginLeft: 10,
                alignItems: "flex-start",
              }}
            >
              <Text
                style={{
                  color: "black",
                  alignItems: "flex-start",
                  fontSize: 25,
                  fontFamily: "robotolight",
                }}
              >
                {profile[0]["companyName"]}
              </Text>
              <Text style={{ color: "black", fontFamily: "robotolight" }}>
                {profile[0]["symbol"]}
              </Text>
            </View>
            <MaterialIcons
              name="playlist-add"
              size={30}
              color="black"
              style={{ paddingTop: 10 }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <View style={{ flex: 1, height: 0.5, backgroundColor: "gray" }} />
            <View>
              <Text
                style={{
                  width: 150,
                  textAlign: "center",
                  color: "gray",
                  fontSize: 13,
                  fontFamily: "roboto",
                }}
              >
                Price
              </Text>
            </View>
            <View style={{ flex: 1, height: 0.5, backgroundColor: "gray" }} />
          </View>
          <View style={styles.price}>
            <Text
              style={{
                color: "black",
                fontSize: 25,
                fontFamily: "robotolight",
              }}
            >
              $ {symbol.price}
            </Text>
            {change()}
          </View>
          <View style={styles.charts}>
            <VictoryChart
              theme={VictoryTheme.material}
              domainPadding={{ x: 25 }}
              scale={{ x: "time", y: "log" }}
              width={450}
            >
              <VictoryAxis
                style={{
                  axis: { stroke: "white" },
                  //axisLabel: { fontSize: 10, padding: 30 },
                  ticks: { stroke: "white", size: 5 },
                  tickLabels: { fontSize: 8, padding: 5 },
                }}
              />
              <VictoryAxis
                dependentAxis
                style={{
                  axis: { stroke: "white" },
                  //axisLabel: { fontSize: 10, padding: 30 },
                  ticks: { stroke: "white", size: 5 },
                  tickLabels: { fontSize: 7, padding: 5 },
                }}
              />
              <VictoryLine
                style={{
                  data: { stroke: "#E43A19" },
                }}
                data={line}
              />
            </VictoryChart>
          </View>
          <View style={styles.button}>
            <Button
              buttonStyle={{
                borderColor: "black",
              }}
              color="black"
              title="D"
              type="outline"
              onPress={() => {
                getData("DAILY");
              }}
            />
            <Button
              buttonStyle={{
                borderColor: "black",
              }}
              color="black"
              title="W"
              type="outline"
              onPress={() => {
                getData("WEEKLY");
              }}
            />
            <Button
              buttonStyle={{
                borderColor: "black",
              }}
              color="black"
              title="M"
              type="outline"
              onPress={() => {
                getData("MONTHLY");
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              paddingBottom: 10,
              paddingTop: 10,
            }}
          >
            <View style={{ flex: 1, height: 0.5, backgroundColor: "gray" }} />
            <View>
              <Text
                style={{
                  width: 150,
                  textAlign: "center",
                  color: "gray",
                  fontSize: 13,
                  fontFamily: "roboto",
                }}
              >
                Performance
              </Text>
            </View>
            <View style={{ flex: 1, height: 0.5, backgroundColor: "gray" }} />
          </View>

          <View style={styles.performance}>
            <Text
              style={{
                color: "black",
                fontSize: 25,
                fontFamily: "robotolight",
              }}
            >
              $ {symbol.low}
            </Text>
            <Text
              style={{
                color: "black",
                fontSize: 25,
                fontFamily: "robotolight",
              }}
            >
              $ {symbol.high}
            </Text>
          </View>
          <View style={styles.performance}>
            <Text style={{ color: "gray", fontSize: 10 }}>Low</Text>
            <Text style={{ color: "gray", fontSize: 10 }}>High</Text>
          </View>
          <View style={styles.volume}>
            <Text
              style={{
                color: "black",
                fontSize: 25,
                fontFamily: "robotolight",
              }}
            >
              {symbol.volume}
            </Text>
            <Text style={{ color: "gray", fontSize: 10 }}>Volume</Text>
          </View>
          <View style={styles.charts}>
            <VictoryChart
              theme={VictoryTheme.material}
              domainPadding={{ x: 25 }}
              scale={{ x: "time" }}
              width={450}
            >
              <VictoryAxis
                style={{
                  axis: { stroke: "white" },
                  //axisLabel: { fontSize: 20, padding: 30 },
                  ticks: { stroke: "white", size: 5 },
                  tickLabels: { fontSize: 8, padding: 5 },
                }}
              />
              <VictoryAxis
                dependentAxis
                style={{
                  axis: { stroke: "white" },
                  //axisLabel: { fontSize: 20, padding: 30 },
                  ticks: { stroke: "white", size: 5 },
                  tickLabels: { fontSize: 7, padding: 5 },
                }}
              />
              <VictoryCandlestick
                candleColors={{ positive: "white", negative: "red" }}
                style={{
                  data: {
                    fillOpacity: 1,
                    stroke: "black",
                    strokeWidth: 0.4,
                  },
                }}
                data={data}
              />
            </VictoryChart>
          </View>
          <View style={styles.button}>
            <Button
              buttonStyle={{
                borderColor: "black",
              }}
              color="black"
              title="D"
              type="outline"
              onPress={() => {
                getData("DAILY");
              }}
            />
            <Button
              buttonStyle={{
                borderColor: "black",
              }}
              color="black"
              title="W"
              type="outline"
              onPress={() => {
                getData("WEEKLY");
              }}
            />
            <Button
              buttonStyle={{
                borderColor: "black",
              }}
              color="black"
              title="M"
              type="outline"
              onPress={() => {
                getData("MONTHLY");
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              paddingBottom: 10,
              paddingTop: 10,
            }}
          >
            <View style={{ flex: 1, height: 0.5, backgroundColor: "gray" }} />
            <View>
              <Text
                style={{
                  width: 150,
                  textAlign: "center",
                  color: "gray",
                  fontSize: 13,
                }}
              >
                About Company
              </Text>
            </View>
            <View style={{ flex: 1, height: 0.5, backgroundColor: "gray" }} />
          </View>
          <View style={styles.performance}>
            <Text h5 style={{ color: "black", fontFamily: "robotolight" }}>
              {profile[0]["companyName"]}
            </Text>
            <Text h5 style={{ color: "black", fontFamily: "robotolight" }}>
              {profile[0]["exchangeShortName"]}
            </Text>
          </View>
          <View style={styles.performance}>
            <Text style={{ color: "gray", fontSize: 10, fontFamily: "roboto" }}>
              Company
            </Text>
            <Text style={{ color: "gray", fontSize: 10, fontFamily: "roboto" }}>
              Exchange
            </Text>
          </View>
          <View style={styles.volume}>
            <Text h6 style={{ color: "black", fontFamily: "robotolight" }}>
              {profile[0]["ceo"]}
            </Text>
            <Text style={{ color: "gray", fontSize: 10, fontFamily: "roboto" }}>
              CEO
            </Text>
          </View>
          <Spacer />
        </ScrollView>
      );
    } else {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="black" />
        </View>
      );
    }
  }
};

ViewStockScreen.navigationOptions = ({ navigation }) => {
  return {
    title: navigation.getParam("symbol"),
    headerTitleAlign: "center",
    headerTitleStyle: {
      fontFamily: "roboto",
      fontWeight: "normal",
    },
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
    },
  };
};

const styles = StyleSheet.create({
  charts: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  symbol: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "row",
    paddingBottom: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  performance: {
    backgroundColor: "white",
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-around",
    alignItems: "center",
  },
  volume: {
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 10,
  },
  price: {
    backgroundColor: "white",
    paddingTop: 20,
    paddingHorizontal: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    paddingBottom: 15,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default ViewStockScreen;
