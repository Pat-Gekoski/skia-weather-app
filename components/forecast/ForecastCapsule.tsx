import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Forecast, ForecastType } from '../../models/Weather'
import { Canvas, RoundedRect, Shadow } from '@shopify/react-native-skia'
import { DEGREE_SYMBOL } from '../../utils/Constants'
import { convertDateTo12HrFormat, getDayOfWeek } from '../../utils/DateHelper'

interface ForecastCapsuleProps {
	forecast: Forecast
	width: number
	height: number
	radius: number
}

const ForecastCapsule = ({ forecast, width, height, radius }: ForecastCapsuleProps) => {
	const { date, temperature, icon, probability, type } = forecast
	// const timeToDisplay = type === ForecastType.Hourly ? convertDateTo12HrFormat(date) : dayOfWeek
	// const capsuleOpacity = timeToDisplay.toLowerCase() === 'now' || isToday ? 1 : 0.2
	const probabilityOpacity = probability > 0 ? 1 : 0

	const timeDateOpacityDisplay = () => {
		let timeOrDay = ''
		let opacity = 0
		if (type === ForecastType.Hourly) {
			timeOrDay = convertDateTo12HrFormat(date)
			opacity = timeOrDay.toLowerCase() === 'now' ? 1 : 0.2
		} else {
			const [dayOfWeek, isToday] = getDayOfWeek(date)
			timeOrDay = dayOfWeek
			opacity = isToday ? 1 : 0.2
		}
		return [timeOrDay, opacity]
	}

	const [timeToDisplay, capsuleOpacity] = timeDateOpacityDisplay()

	return (
		<View style={{ width, height }}>
			<Canvas style={{ ...StyleSheet.absoluteFillObject }}>
				<RoundedRect x={0} y={0} width={width} height={height} r={radius} color={`rgba(72, 49, 157, ${capsuleOpacity})`} />
				<Shadow dx={1} dy={1} blur={0} color={'rgba(255, 255, 255, 0.25)'} inner />
			</Canvas>
			<View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingVertical: 19 }}>
				<Text style={styles.time}>{timeToDisplay}</Text>
				<View>
					<Image source={icon} style={{ width: width / 2, height: width / 2 }} />
					<Text style={[styles.probability, { opacity: probabilityOpacity }]}>{probability}%</Text>
				</View>
				<Text style={styles.temperature}>
					{temperature}
					{DEGREE_SYMBOL}
				</Text>
			</View>
		</View>
	)
}

export default ForecastCapsule

const styles = StyleSheet.create({
	time: {
		fontFamily: 'SF-Semibold',
		fontSize: 15,
		lineHeight: 20,
		color: 'white',
		letterSpacing: -0.5,
	},
	probability: {
		fontFamily: 'SF-Semibold',
		fontSize: 13,
		lineHeight: 18,
		textAlign: 'center',
		color: '#40CBD8',
	},
	temperature: {
		fontFamily: 'SF-Regular',
		fontSize: 20,
		lineHeight: 24,
		color: 'white',
		letterSpacing: 0.38,
	},
})
