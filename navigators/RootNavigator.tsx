import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Home from '../screens/Home'
import WeatherList from '../screens/WeatherList'

const Stack = createStackNavigator()

const RootNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name='Home' component={Home} />
			<Stack.Screen name='List' component={WeatherList} />
		</Stack.Navigator>
	)
}

export default RootNavigator

const styles = StyleSheet.create({})
