import React, { Component, useEffect, useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";

const FingerPrintScreen = (props) => {
  const [compatible, setCompatible] = useState(true);
  const [fingerprints, setFingerprints] = useState(true);
  const [result, setResult] = useState("");

  useEffect(() => {
    checkDeviceForHardware();
    checkForFingerprints();
    if (compatible && fingerprints) {
      scanFingerprint();
    }
  }, []);

  const checkDeviceForHardware = async () => {
    let compatible = await LocalAuthentication.hasHardwareAsync();
    setCompatible(compatible);
  };

  const checkForFingerprints = async () => {
    let fingerprints = await LocalAuthentication.isEnrolledAsync();
    setFingerprints(fingerprints);
  };

  const scanFingerprint = async () => {
    let result = await LocalAuthentication.authenticateAsync(
      "Unlock Hypersonix App"
    );
    if (result.success) {
      props.navigation.navigate("Login");
    }
    setResult(JSON.stringify(result));
  };

  return <></>;
};

export default FingerPrintScreen;
