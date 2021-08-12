import React from "react"
import { StyleSheet, Text, View } from "react-native"

class App extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.text}>Hello, world!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    fontSize: 30
  }
})

export default App