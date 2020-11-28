import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Voice from "@react-native-community/voice";

const VoiceSearchStockScreen = () => {
  //console.log(Voice);
  const [isRecord, setIsRecord] = useState(false);
  const [text, setText] = useState("");
  const [result, setResult] = useState([]);
  const buttonLabel = isRecord ? "Stop" : "Start";
  const voiceLabel = text
    ? text
    : isRecord
    ? "Say something..."
    : "press Start button";

  const _onSpeechStart = () => {
    console.log("onSpeechStart");
    setText("");
  };
  const _onSpeechEnd = () => {
    console.log("onSpeechEnd");
  };
  const _onSpeechResults = (event) => {
    console.log("onSpeechResults");
    setText(event.value[0]);
  };
  const _onSpeechError = (event) => {
    console.log("_onSpeechError");
    console.log(event.error);
  };

  const _onRecordVoice = async () => {
    if (isRecord) {
      Voice.stop();
    } else {
      await Voice.start("en-US");
    }
    setIsRecord(!isRecord);
  };

  useEffect(() => {
    Voice.onSpeechStart = () => {
      console.log("onSpeechStart");
      setText("");
    };
    Voice.onSpeechEnd = () => {
      console.log("onSpeechEnd");
    };
    Voice.onSpeechResults = (event) => {
      console.log("onSpeechResults");
      setText(event.value[0]);
    };
    Voice.onSpeechError = (event) => {
      console.log("_onSpeechError");
      console.log(event.error);
    };

    Voice._onSpeechResults = (event) => {
      setResult(event.value);
      console.log(result);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <View>
      <Text style={styles.transcript}>Transcript</Text>
      <Text>{voiceLabel}</Text>
      <Text>{text}</Text>
      <Button
        style={styles.transcript}
        onPress={_onRecordVoice}
        title={buttonLabel}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  transcript: {
    textAlign: "center",
    color: "#B0171F",
    marginBottom: 1,
    top: "400%",
  },
});

export default VoiceSearchStockScreen;
