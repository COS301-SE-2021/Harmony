// import React, { useEffect, useState } from "react";

// import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
// import { Layout, Text } from "@ui-kitten/components";

// const SettingsScreen = (props) => {
//   return (
//     <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text category="h1">Settings</Text>
//     </Layout>
//   );
// };

// export default SettingsScreen;

import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Auth } from "aws-amplify";

export default function SettingsScreen({ updateAuthState }) {
  async function signOut() {
    try {
      await Auth.signOut();
      updateAuthState("loggedOut");
    } catch (error) {
      console.log("Error signing out: ", error);
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Sign Out" color="tomato" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
});
