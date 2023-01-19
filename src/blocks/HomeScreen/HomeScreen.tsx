import { Text, StyleSheet, View } from 'react-native'
import React from 'react'
import HomeScreenController, { Props } from './HomeScreenController'

export default class HomeScreen extends HomeScreenController {

    constructor(props: Props) {
        super(props)
    }
  render() {
    return (
      <View>
        <Text>HomeScreen</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({})