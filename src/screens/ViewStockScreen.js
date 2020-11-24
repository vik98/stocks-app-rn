import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Spacer from "../components/Spacer";
import { EvilIcons } from "@expo/vector-icons";
import api from "../api/api";
import {
  VictoryChart,
  VictoryAxis,
  VictoryCandlestick,
  VictoryTheme,
  VictoryLine,
} from "victory-native";
import { Text, Button } from "react-native-elements";

const ViewStockScreen = ({ navigation }) => {
  const API_KEY = "N0VVXF6Q5H4VAMZT";

  useEffect(() => {
    getData();
  }, []);

  const [data, setData] = useState([]);
  const [line, setLine] = useState([]);
  const [symbol, setSymbol] = useState({});

  const getData = async () => {
    const param = navigation.getParam("symbol");
    const response = await api.get(
      `/query?function=TIME_SERIES_DAILY&symbol=${param}&&apikey=${API_KEY}`
    );
    const quote = await api.get(
      `/query?function=GLOBAL_QUOTE&symbol=${param}&&apikey=${API_KEY}`
    );
    console.log(quote.data);
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
    const candleStick = Object.keys(response.data["Time Series (Daily)"]).map(
      (date) => {
        return {
          x: new Date(date.replace(/ /g, "T")),
          open: response.data["Time Series (Daily)"][date]["1. open"],
          close: response.data["Time Series (Daily)"][date]["4. close"],
          high: response.data["Time Series (Daily)"][date]["2. high"],
          low: response.data["Time Series (Daily)"][date]["3. low"],
        };
      }
    );
    candleStick.sort(function (a, b) {
      return b.x - a.x;
    });
    const lineChart = Object.keys(response.data["Time Series (Daily)"]).map(
      (date) => {
        return {
          x: new Date(date.replace(/ /g, "T")),
          y: Number(response.data["Time Series (Daily)"][date]["5. volume"]),
        };
      }
    );
    lineChart.sort(function (a, b) {
      return b.x - a.x;
    });
    setData(candleStick.slice(0, 5));
    setLine(lineChart.slice(0, 5));
  };
  const change = () => {
    if (symbol.change > 0) {
      return (
        <Text h6 style={{ color: "green" }}>
          <MaterialCommunityIcons name="arrow-up" size={13} color="green" />
          {symbol.change} %
        </Text>
      );
    } else {
      return (
        <Text h6 style={{ color: "red" }}>
          <MaterialCommunityIcons name="arrow-down" size={13} color="red" />
          {symbol.change} %
        </Text>
      );
    }
  };

  if (data.length > 0) {
    return (
      <ScrollView>
        <View style={styles.symbol}>
          <Text h4 style={{ color: "black" }}>
            {symbol.symbol}
          </Text>
          <MaterialIcons name="playlist-add" size={30} color="black" />
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
                width: 60,
                textAlign: "center",
                color: "gray",
                fontSize: 13,
              }}
            >
              Price
            </Text>
          </View>
          <View style={{ flex: 1, height: 0.5, backgroundColor: "gray" }} />
        </View>
        <View style={styles.price}>
          <Text h4 style={{ color: "gray" }}>
            $ {symbol.price}
          </Text>
          {change()}
        </View>
        <View style={styles.charts}>
          <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={{ x: 25 }}
            scale={{ x: "time", y: "log" }}
            width={400}
          >
            <VictoryAxis
              style={{
                axis: { stroke: "#413075" },
                axisLabel: { fontSize: 20, padding: 30 },
                ticks: { stroke: "black", size: 5 },
                tickLabels: { fontSize: 10, padding: 5 },
              }}
            />
            <VictoryAxis
              dependentAxis
              style={{
                axis: { stroke: "#413075" },
                axisLabel: { fontSize: 20, padding: 30 },
                ticks: { stroke: "black", size: 5 },
                tickLabels: { fontSize: 10, padding: 5 },
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
            title="D"
            type="outline"
          />
          <Button
            buttonStyle={{
              borderColor: "black",
            }}
            title="W"
            type="outline"
          />
          <Button
            buttonStyle={{
              borderColor: "black",
            }}
            title="M"
            type="outline"
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            paddingBottom: 10,
          }}
        >
          <View style={{ flex: 1, height: 0.5, backgroundColor: "gray" }} />
          <View>
            <Text
              style={{
                width: 100,
                textAlign: "center",
                color: "gray",
                fontSize: 13,
              }}
            >
              Performance
            </Text>
          </View>
          <View style={{ flex: 1, height: 0.5, backgroundColor: "gray" }} />
        </View>

        <View style={styles.performance}>
          <Text h4 style={{ color: "gray" }}>
            $ {symbol.low}
          </Text>
          <Text h4 style={{ color: "gray" }}>
            $ {symbol.high}
          </Text>
        </View>
        <View style={styles.performance}>
          <Text style={{ color: "gray", fontSize: 10 }}>Low</Text>
          <Text style={{ color: "gray", fontSize: 10 }}>High</Text>
        </View>
        <View style={styles.volume}>
          <Text h4 style={{ color: "gray" }}>
            {symbol.volume}
          </Text>
          <Text style={{ color: "gray", fontSize: 10 }}>Volume</Text>
        </View>
        <View style={styles.charts}>
          <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={{ x: 25 }}
            scale={{ x: "time" }}
            width={400}
          >
            <VictoryAxis
              style={{
                axis: { stroke: "#413075" },
                axisLabel: { fontSize: 20, padding: 30 },
                ticks: { stroke: "black", size: 5 },
                tickLabels: { fontSize: 10, padding: 5 },
              }}
            />
            <VictoryAxis
              dependentAxis
              style={{
                axis: { stroke: "#413075" },
                axisLabel: { fontSize: 20, padding: 30 },
                ticks: { stroke: "black", size: 5 },
                tickLabels: { fontSize: 10, padding: 5 },
              }}
            />
            <VictoryCandlestick
              candleColors={{ positive: "#ffff", negative: "#E43A19" }}
              style={{
                data: {
                  fillOpacity: 1,
                  stroke: "#413075",
                  strokeWidth: 1,
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
            title="D"
            type="outline"
          />
          <Button
            buttonStyle={{
              borderColor: "black",
            }}
            title="W"
            type="outline"
          />
          <Button
            buttonStyle={{
              borderColor: "black",
            }}
            title="M"
            type="outline"
          />
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#413075" />
      </View>
    );
  }
};

// ViewStockScreen.navigationOptions = ({ navigation }) => {
//   return {
//     headerLeft: (
//       <TouchableOpacity
//         onPress={() => {
//           navigation.pop();
//         }}
//       >
//         <EvilIcons name="pencil" size={35} />
//       </TouchableOpacity>
//     ),
//     title: "",
//   };
// };

ViewStockScreen.navigationOptions = {
  title: "",
  headerStyle: {
    elevation: 0,
    shadowOpacity: 0,
  },
};

const styles = StyleSheet.create({
  charts: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  symbol: {
    backgroundColor: "white",
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
    flexDirection: "column",
    paddingTop: 20,
    paddingHorizontal: 20,
    justifyContent: "center",
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
