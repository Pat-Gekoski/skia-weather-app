import React, { useState } from 'react'
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

const ForecastSheet = () => {
	const [selectedForecastType, setSelectedForecastType] = useState<ForecastType>(ForecastType.Hourly)
	const snapPoints = ['38.5', '83%']
	const { width, height } = useApplicationDimensions()
	const firstSnapPoint = height * (parseFloat(snapPoints[0]) / 100)
	const cornerRadius = 44
	const capsuleRadius = 30
	const capsuleHeight = height * 0.17
	const capsuleWidth = width * 0.15
	const smallWidgetSize = width / 2 - 20

	return (
		<BottomSheet
			snapPoints={snapPoints}
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
					<ForecastScroll
						forecasts={selectedForecastType === ForecastType.Hourly ? hourly : weekly}
						capsuleWidth={capsuleWidth}
						capsuleHeight={capsuleHeight}
						capsuleRadius={capsuleRadius}
					/>
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
