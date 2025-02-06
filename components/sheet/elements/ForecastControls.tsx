import { LayoutChangeEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Canvas, Line, LinearGradient, vec } from '@shopify/react-native-skia'
import { ForecastType } from '../../../models/Weather'

interface ForecastControlsProps {
	onPress: (forecastType: ForecastType) => void
}

const ForecastControls = ({ onPress }: ForecastControlsProps) => {
	const [textWidth, setTextWidth] = React.useState(0)
	const spacingX = 32
	const strokeWidth = 3

	const onTextLayout = (event: LayoutChangeEvent) => {
		setTextWidth(event.nativeEvent.layout.width)
	}

	return (
		<>
			<View style={styles.flexRow}>
				<TouchableOpacity onPress={() => onPress(ForecastType.Hourly)}>
					<Text onLayout={onTextLayout} style={styles.forecastText}>
						Hourly Forecast
					</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => onPress(ForecastType.Weekly)}>
					<Text style={styles.forecastText}>Weekly Forecast</Text>
				</TouchableOpacity>
			</View>
			<Canvas style={{ width: textWidth, height: strokeWidth, marginLeft: spacingX }}>
				<Line p1={vec(0, 0)} p2={vec(textWidth, 0)} strokeWidth={strokeWidth}>
					<LinearGradient
						start={vec(0, 0)}
						end={vec(textWidth, 0)}
						colors={['rgba(147, 112, 177, 0)', 'rgba(147, 112, 177, 1)', 'rgba(147, 112, 177, 0)']}
					/>
				</Line>
			</Canvas>
		</>
	)
}

export default ForecastControls

const styles = StyleSheet.create({
	flexRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 32,
	},
	forecastText: {
		fontFamily: 'SF-Semibold',
		fontSize: 15,
		lineHeight: 20,
		color: 'rgba(235, 235, 245, 0.6)',
	},
})
