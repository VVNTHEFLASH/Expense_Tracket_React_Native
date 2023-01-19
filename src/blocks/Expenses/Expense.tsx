import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'

export default class Expense extends Component {
  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text>No Data Available</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({})