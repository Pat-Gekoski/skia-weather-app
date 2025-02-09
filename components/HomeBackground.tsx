import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia'
import { ImageBackground, StyleSheet, Image, ScaledSize, View, Platform } from 'react-native'
import useApplicationDimensions from '../hooks/useApplicationDimensions'
import { useForcatSheetPosition } from '../context/ForecastSheetContext'
import Animated, {
	Extrapolation,
	interpolate,
	interpolateColor,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
} from 'react-native-reanimated'
import BackgroundGradient from './BackgroundGradient'

const HomeBackground = () => {
	const dimensions = useApplicationDimensions()
	const { width, height } = dimensions
	const myStyles = styles(dimensions)
	const smokeHeight = height * 0.6
	const smokeOffsetY = height * 0.4
	const animatedPosition = useForcatSheetPosition()
	const AnimatedImgBackground = Animated.createAnimatedComponent(ImageBackground)
	const AnimatedCanvas = Animated.createAnimatedComponent(Canvas)
	const leftBgColor = useSharedValue('#2e335a')
	const rightBgColor = useSharedValue('#1c1b33')

	const bgColor = useDerivedValue(() => {
		if (Platform.OS === 'ios') {
			leftBgColor.value = interpolateColor(animatedPosition.value, [0, 1], ['#2e335a', '#422e5a'])
		} else {
			leftBgColor.value = animatedPosition.value > 0.5 ? '#422e5a' : '#2e335a'
		}

		return [leftBgColor.value, rightBgColor.value]
	})

	const animiatedBackgroundStyles = useAnimatedStyle(() => {
		return {
			transform: [{ translateY: interpolate(animatedPosition.value, [0, 1], [0, -height], Extrapolation.CLAMP) }],
		}
	})

	const animatedSmokeStyles = useAnimatedStyle(() => {
		return {
			opacity: interpolate(animatedPosition.value, [0, 0.1], [1, 0], Extrapolation.CLAMP),
		}
	})

	return (
		<View style={{ ...StyleSheet.absoluteFillObject }}>
			<BackgroundGradient colors={bgColor} />
			<AnimatedImgBackground
				source={require('../assets/home/Background.png')}
				style={[{ height: height }, animiatedBackgroundStyles]}
				resizeMode='cover'
			>
				<AnimatedCanvas style={[{ height: smokeHeight, ...StyleSheet.absoluteFillObject, top: smokeOffsetY }, animatedSmokeStyles]}>
					<Rect x={0} y={0} width={width} height={smokeHeight}>
						<LinearGradient
							start={vec(width / 2, 0)}
							end={vec(width / 2, smokeHeight)}
							colors={['rgba(58, 63, 84, 0)', 'rgba(58, 63, 84, 1)']}
							positions={[-0.02, 0.54]}
						/>
					</Rect>
				</AnimatedCanvas>
				<Image source={require('../assets/home/House.png')} resizeMode='cover' style={myStyles.houseImage} />
			</AnimatedImgBackground>
		</View>
	)
}

export default HomeBackground

const styles = ({ width }: ScaledSize) =>
	StyleSheet.create({
		houseImage: { width: width, height: width, ...StyleSheet.absoluteFillObject, top: '36%' },
	})
