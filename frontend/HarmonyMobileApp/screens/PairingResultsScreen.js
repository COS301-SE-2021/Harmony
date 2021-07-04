import React, { useEffect, useState } from "react";

import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { Layout, Text } from "@ui-kitten/components";

const PairingResultsScreen = (props) => {
  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text category="h1">Pairing results</Text>
    </Layout>
  );
};

export default PairingResultsScreen;
