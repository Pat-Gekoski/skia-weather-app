import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Forecast } from '../../models/Weather'
import { ScrollView } from 'react-native-gesture-handler'
import ForecastCapsule from './ForecastCapsule'

interface ForecastScrollProps {
	forecasts: Array<Forecast>
	capsuleWidth: number
	capsuleHeight: number
	capsuleRadius: number
}

const ForecastScroll = ({ forecasts, capsuleWidth, capsuleHeight, capsuleRadius }: ForecastScrollProps) => {
	return (
		<ScrollView
			horizontal
			style={{ paddingLeft: 20, paddingTop: 20, paddingBottom: 10, flexGrow: 0 }}
			showsHorizontalScrollIndicator={false}
		>
			<View style={{ flex: 1, flexDirection: 'row', gap: 12 }}>
				{forecasts.map((forecast, index) => (
					<ForecastCapsule key={index} forecast={forecast} width={capsuleWidth} height={capsuleHeight} radius={capsuleRadius} />
				))}
			</View>
		</ScrollView>
	)
}

export default ForecastScroll

const styles = StyleSheet.create({})
