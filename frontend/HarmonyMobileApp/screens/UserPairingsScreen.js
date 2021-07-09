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
      <Tab title="My Favourites">
        <Layout style={styles.tabContainer}>
          <Text category="h5">My Favourites</Text>
        </Layout>
      </Tab>
      <Tab title="My Pairings">
        <Layout style={styles.tabContainer}>
          <Text category="h5">My Pairings</Text>
        </Layout>
      </Tab>
    </TabView>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default UserPairingsScreen;
