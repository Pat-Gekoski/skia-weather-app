import React, { useEffect, useState } from 'react'
import BottomSheet from '@gorhom/bottom-sheet'
import ForecastSheetBackground from './ForecastSheetBackground'
import useApplicationDimensions from '../../hooks/useApplicationDimensions'
import ForecastControls from './elements/ForecastControls'
import Seperator from './elements/Seperator'
import ForecastCapsule from '../forecast/ForecastCapsule'
import { hourly, weekly } from '../../data/ForecastData'
import ForecastScroll from '../forecast/ForecastScroll'
import { ForecastType } from '../../models/Weather'
import { ScrollView, View } from 'react-native'
import AirQualityWidget from '../forecast/widgets/AirQualityWidget'
import UvIndexWidget from '../forecast/widgets/UvIndexWidget'
import SunriseWidget from '../forecast/widgets/SunriseWidget'
import RainFallWidget from '../forecast/widgets/RainFallWidget'
import FeelsLikeWidget from '../forecast/widgets/FeelsLikeWidget'
import HumidityWidget from '../forecast/widgets/HumidityWidget'
import VisibilityWidget from '../forecast/widgets/VisibilityWidget'
import PressureWidget from '../forecast/widgets/PressureWidget'
import Animated, { useAnimatedReaction, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useForcatSheetPosition } from '../../context/ForecastSheetContext'

const ForecastSheet = () => {
	const [selectedForecastType, setSelectedForecastType] = useState<ForecastType>(ForecastType.Hourly)
	const snapPoints = ['38.5', '83%']
	const { width, height } = useApplicationDimensions()
	const firstSnapPoint = height * (parseFloat(snapPoints[0]) / 100)
	const secondSnapPoint = height * (parseFloat(snapPoints[1]) / 100)
	const minY = height - secondSnapPoint
	const maxY = height - firstSnapPoint
	const cornerRadius = 44
	const capsuleRadius = 30
	const capsuleHeight = height * 0.17
	const capsuleWidth = width * 0.15
	const smallWidgetSize = width / 2 - 20
	const currentPosition = useSharedValue(0)
	const animatedPosition = useForcatSheetPosition()
	const translateXHourly = useSharedValue(0)
	const translateXWeekly = useSharedValue(width)

	const animatedHourlyStyles = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: translateXHourly.value }],
		}
	})

	const animatedWeeklyStyles = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: translateXWeekly.value }],
		}
	})

	useEffect(() => {
		if (selectedForecastType === ForecastType.Weekly) {
			translateXHourly.value = withTiming(-width)
			translateXWeekly.value = withTiming(-width)
		} else {
			translateXHourly.value = withTiming(0)
			translateXWeekly.value = withTiming(width)
		}
	}, [selectedForecastType])

	const normalizePosition = (position: number) => {
		'worklet'
		return ((position - maxY) / (maxY - minY)) * -1
	}

	useAnimatedReaction(
		() => {
			return currentPosition.value
		},
		(currentValue) => {
			animatedPosition.value = normalizePosition(currentValue)
		},
	)

	return (
		<BottomSheet
			snapPoints={snapPoints}
			animatedPosition={currentPosition}
			animateOnMount={false}
			handleIndicatorStyle={{
				width: 48,
				height: 5,
				backgroundColor: 'rgba(0,0,0,0.3)',
			}}
			backgroundComponent={() => <ForecastSheetBackground width={width} height={firstSnapPoint} cornerRadius={cornerRadius} />}
		>
			<>
				<ForecastControls onPress={(type) => setSelectedForecastType(type)} />
				<Seperator width={width} height={3} />
				<ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 10 }}>
					<View style={{ flexDirection: 'row' }}>
						<Animated.View style={[animatedHourlyStyles]}>
							<ForecastScroll
								forecasts={hourly}
								capsuleWidth={capsuleWidth}
								capsuleHeight={capsuleHeight}
								capsuleRadius={capsuleRadius}
							/>
						</Animated.View>

						<Animated.View style={[animatedWeeklyStyles]}>
							<ForecastScroll
								forecasts={weekly}
								capsuleWidth={capsuleWidth}
								capsuleHeight={capsuleHeight}
								capsuleRadius={capsuleRadius}
							/>
						</Animated.View>
					</View>

					<View style={{ flex: 1, paddingTop: 30, paddingBottom: 50 }}>
						<AirQualityWidget width={width - 30} height={150} />
						<View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', padding: 15, gap: 10 }}>
							<UvIndexWidget width={smallWidgetSize} height={smallWidgetSize} />
							<SunriseWidget width={smallWidgetSize} height={smallWidgetSize} />
							<RainFallWidget width={smallWidgetSize} height={smallWidgetSize} />
							<FeelsLikeWidget width={smallWidgetSize} height={smallWidgetSize} />
							<HumidityWidget width={smallWidgetSize} height={smallWidgetSize} />
							<VisibilityWidget width={smallWidgetSize} height={smallWidgetSize} />
							<PressureWidget width={smallWidgetSize} height={smallWidgetSize} />
						</View>
					</View>
				</ScrollView>
			</>
		</BottomSheet>
	)
}

export default ForecastSheet
