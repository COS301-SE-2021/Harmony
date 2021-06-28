import React, { useEffect, useState } from "react";

import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { Layout, Text } from "@ui-kitten/components";

const SettingsScreen = (props) => {
  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text category="h1">Settings</Text>
    </Layout>
  );
};

export default SettingsScreen;
