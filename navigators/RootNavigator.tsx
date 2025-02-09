import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Home from '../screens/Home'
import WeatherList from '../screens/WeatherList'
import { eventEmitter } from '../utils/EventEmitter'
import { getLocationData } from '../services/LocationService'
import { useWeatherData } from '../context/WeatherDataContext'
import { WeatherService } from '../services/WeatherService'

const Stack = createStackNavigator()

const RootNavigator = () => {
	const { setWeatherData } = useWeatherData()

	const handleLocationEvent = async () => {
		const locationData = await getLocationData()
		if (locationData) {
			const { latitude, longitude } = locationData
			const weatherData = new WeatherService(latitude, longitude)
			console.log('Handle', weatherData)
			const data = await weatherData.FetchAll()
			// console.log('data: ', data)
			setWeatherData(data)
		}
	}
	useEffect(() => {
		const listener = eventEmitter.addListener('locationEvent', async () => {
			await handleLocationEvent()
		})

		return () => listener.remove()
	}, [])

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name='Home' component={Home} />
			<Stack.Screen name='List' component={WeatherList} />
		</Stack.Navigator>
	)
}

export default RootNavigator

const styles = StyleSheet.create({})
