import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'

export default class Notifications extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No Notification at this moment!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 24,
    textAlign: "justify",
    fontWeight: "800",
    color: '#ffffffff'
  }
})