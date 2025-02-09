import { View, StyleSheet } from 'react-native'
import ArcComponent from './elements/ArcComponent'
import useApplicationDimensions from '../../hooks/useApplicationDimensions'
import TabBarItems from './elements/TabBarItems'
import { BlurView } from 'expo-blur'
import { useForcatSheetPosition } from '../../context/ForecastSheetContext'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'

const WeatherTabBar = () => {
	const tabBarHeight = 88
	const { width, height } = useApplicationDimensions()
	const animatedPosition = useForcatSheetPosition()

	const animatedStyles = useAnimatedStyle(() => {
		return {
			transform: [{ translateY: interpolate(animatedPosition.value, [0, 1], [0, tabBarHeight + 20]) }],
		}
	})

	return (
		<Animated.View style={[{ ...StyleSheet.absoluteFillObject, top: height - tabBarHeight }, animatedStyles]}>
			<BlurView intensity={50} tint='dark' style={{ height: tabBarHeight, ...StyleSheet.absoluteFillObject }}>
				<ArcComponent height={tabBarHeight} width={width} />
				<TabBarItems />
			</BlurView>
		</Animated.View>
	)
}

export default WeatherTabBar
