import React from "react";
import { SafeAreaView } from "react-native";
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { SharedElement } from "react-navigation-shared-element";

const DrinkDetailsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text category="h1">DrinkDetailsScreen</Text>
      </Layout>
    </SafeAreaView>
  );
};
export default DrinkDetailsScreen;
