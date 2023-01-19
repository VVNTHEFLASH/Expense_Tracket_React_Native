import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from './src/blocks/HomeScreen/HomeScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Expense from './src/blocks/Expenses/Expense';
import Notifications from './src/blocks/Notification/Notifications';
import Forms from './src/blocks/Forms/Forms';
import { bell, chart, plus, wallet } from './src/assets';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faWallet, faAdd, faPieChart } from '@fortawesome/free-solid-svg-icons';
import { faBell as faBellRegular } from '@fortawesome/free-regular-svg-icons';
import { } from '@fortawesome/free-brands-svg-icons';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      sceneContainerStyle={{
        backgroundColor: '#21ce99'
      }}
      screenOptions = {({ route }) =>({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#efb810',
        tabBarInactiveTintColor: 'black',
        tabBarStyle: [
          {
            backgroundColor: '#01182D',
            height: 70,
            // borderTopStartRadius: 35,
            // borderTopEndRadius: 35,
            // borderBottomEndRadius: 35,
            // borderBottomStartRadius: 35
          },
          null
        ],
        })}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.tabIconView}>
                <FontAwesomeIcon size={30} color={focused ? 'white' : 'gray'} icon={faWallet} />
              </View>
            )
          },
        }}
      />
      <Tab.Screen
        name="History"
        component={Expense}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.tabIconView}>
                <FontAwesomeIcon size={30} icon={faPieChart} color={focused ? 'white' : 'gray'}/>
              </View>
            )
          },
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.tabIconView}>
                <FontAwesomeIcon size={30} icon={faBellRegular} color={focused ? 'white' : 'gray'} />
              </View>
            )
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Forms}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.tabIconView}>
                <FontAwesomeIcon size={30} icon={faAdd} color={focused ? 'white' : 'gray'}/>
              </View>
            )
          },
        }}
      />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <BottomTab />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  tabIconView: {
    // height: 35,
    // width: 35,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'white'
  },
  tabIconImage: {
  }
})