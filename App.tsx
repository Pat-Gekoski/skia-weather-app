import 'react-native-gesture-handler'
import React, { useCallback } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import RootNavigator from './navigators/RootNavigator'
import { WeatherDataProvider } from './context/WeatherDataContext'

SplashScreen.preventAutoHideAsync()

export default function App() {
	const [fontsLoaded] = useFonts({
		'SF-Thin': require('./assets/fonts/SF-Pro-Display-Thin.otf'),
		'SF-Regular': require('./assets/fonts/SF-Pro-Display-Regular.otf'),
		'SF-Semibold': require('./assets/fonts/SF-Pro-Display-Semibold.otf'),
	})

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync()
		}
	}, [fontsLoaded])

	if (!fontsLoaded) return null

	return (
		<SafeAreaProvider onLayout={onLayoutRootView}>
			<WeatherDataProvider>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<NavigationContainer>
						<RootNavigator />
					</NavigationContainer>
					<StatusBar style='light' />
				</GestureHandlerRootView>
			</WeatherDataProvider>
		</SafeAreaProvider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
