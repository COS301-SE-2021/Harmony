import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Layout, Tab, TabView, Text } from "@ui-kitten/components";

export const UserPairingsScreen = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <TabView
      selectedIndex={selectedIndex}
      onSelect={(index) => setSelectedIndex(index)}
    >
      <Tab
        style={[styles.tabHeader, styles.tabHeaderText]}
        title="My Favourites"
      >
        <Layout style={styles.tabContainer}>
          <Text>My Favourites</Text>
        </Layout>
      </Tab>
      <Tab style={styles.tabHeader} title="My Pairings">
        <Layout style={styles.tabContainer}>
          <Text>My Pairings</Text>
        </Layout>
      </Tab>
    </TabView>
  );
};

const styles = StyleSheet.create({
  tabHeader: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  tabContainer: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default UserPairingsScreen;
