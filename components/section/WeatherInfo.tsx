import { Text, StyleSheet } from 'react-native'
import Animated, { Extrapolation, interpolate, interpolateColor, useAnimatedStyle } from 'react-native-reanimated'
import { Weather } from '../../models/Weather'
import { DEGREE_SYMBOL } from '../../utils/Constants'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useForcatSheetPosition } from '../../context/ForecastSheetContext'

interface WeatherInfoProps {
	weather: Weather
}

const WeatherInfo = ({ weather }: WeatherInfoProps) => {
	const { city, temperature, condition, high, low } = weather
	const topMargin = 51
	const { top } = useSafeAreaInsets()
	const weatherInfoMargin = top + topMargin
	const animatedPosition = useForcatSheetPosition()
	const animatedViewStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateY: interpolate(animatedPosition.value, [0, 1], [0, -topMargin], Extrapolation.CLAMP) }],
		}
	})

	const animatedTempTextStyle = useAnimatedStyle(() => {
		const fontFamily = animatedPosition.value > 0.5 ? 'SF-Semibold' : 'SF-Thin'
		return {
			fontFamily,
			opacity: interpolate(animatedPosition.value, [0, 0.5, 1], [1, 0, 1]),
			fontSize: interpolate(animatedPosition.value, [0, 1], [96, 20]),
			lineHeight: interpolate(animatedPosition.value, [0, 1], [96, 20]),
			color: interpolateColor(animatedPosition.value, [0, 1], ['white', 'rgba(235, 235, 246, 0.6)']),
		}
	})

	const animiatedMinMaxTextStyle = useAnimatedStyle(() => {
		return {
			opacity: interpolate(animatedPosition.value, [0, 0.5], [1, 0]),
		}
	})

	const animatedSeparatorTextStyle = useAnimatedStyle(() => {
		const display = animatedPosition.value > 0.5 ? 'flex' : 'none'
		return {
			display,
			opacity: interpolate(animatedPosition.value, [0, 0.5, 1], [0, 0, 1]),
		}
	})

	const animatedTempConditionStyles = useAnimatedStyle(() => {
		const flexDirection = animatedPosition.value > 0.5 ? 'row' : 'column'
		return {
			flexDirection,
		}
	})

	const animatedConditionTextStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateY: interpolate(animatedPosition.value, [0, 0.5, 1], [0, -20, 0], Extrapolation.CLAMP) }],
		}
	})

	return (
		<Animated.View style={[{ marginTop: weatherInfoMargin, alignItems: 'center' }, animatedViewStyle]}>
			<Animated.Text style={styles.cityText}>{city}</Animated.Text>

			<Animated.View style={[{ alignItems: 'center' }, animatedTempConditionStyles]}>
				<Animated.View style={[{ flexDirection: 'row' }]}>
					<Animated.Text style={[styles.temperatureText, animatedTempTextStyle]}>
						{temperature}
						{DEGREE_SYMBOL}
					</Animated.Text>
					<Animated.Text style={[styles.separatorText, animatedSeparatorTextStyle]}>|</Animated.Text>
				</Animated.View>
				<Animated.Text style={[styles.conditionText, animatedConditionTextStyle]}>{condition}</Animated.Text>
			</Animated.View>

			<Animated.Text style={[styles.minMaxText, animiatedMinMaxTextStyle]}>
				H: {high}
				{DEGREE_SYMBOL} L: {low}
				{DEGREE_SYMBOL}
			</Animated.Text>
		</Animated.View>
	)
}

export default WeatherInfo

const styles = StyleSheet.create({
	cityText: {
		fontFamily: 'SF-Regular',
		color: 'white',
		fontSize: 34,
		lineHeight: 41,
	},
	temperatureText: {
		fontFamily: 'SF-Thin',
		color: 'white',
		fontSize: 96,
		lineHeight: 96,
	},
	conditionText: {
		fontFamily: 'SF-Semibold',
		color: 'rgba(235, 235, 246, 0.6)',
		fontSize: 20,
		lineHeight: 20,
	},
	separatorText: {
		fontFamily: 'SF-Semibold',
		color: 'rgba(235, 235, 246, 0.6)',
		fontSize: 20,
		lineHeight: 20,
		marginHorizontal: 2,
		display: 'none',
	},
	minMaxText: {
		fontFamily: 'SF-Semibold',
		color: 'white',
		fontSize: 20,
		lineHeight: 20,
	},
})
