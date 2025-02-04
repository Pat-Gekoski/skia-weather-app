import { View, StyleSheet } from 'react-native'
import ArcComponent from './elements/ArcComponent'
import useApplicationDimensions from '../../hooks/useApplicationDimensions';
import TabBarItems from './elements/TabBarItems';
import { BlurView } from 'expo-blur';

const WeatherTabBar = () => {
	const tabBarHeight = 88
	const { width, height } = useApplicationDimensions()

	return (
		<BlurView intensity={50} tint='dark' style={{ height: tabBarHeight, ...StyleSheet.absoluteFillObject, top: height - tabBarHeight }}>
			<ArcComponent height={tabBarHeight} width={width} />
			<TabBarItems />
		</BlurView>
	)
}

export default WeatherTabBar