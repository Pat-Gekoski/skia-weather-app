import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Canvas, LinearGradient, RoundedRect, vec } from '@shopify/react-native-skia';
import { BlurView } from 'expo-blur';

interface ForecaseSheetBackgroundProps {
	width: number;
	height: number;
	cornerRadius: number;
}

const ForecaseSheetBackground = ({ width, height, cornerRadius }: ForecaseSheetBackgroundProps) => {
	return (
		<BlurView
			experimentalBlurMethod='dimezisBlurView'
			style={{
				...StyleSheet.absoluteFillObject,
				borderRadius: cornerRadius,
				overflow: 'hidden'
			}}
			intensity={50}
			tint='dark'>
			<Canvas style={{ flex: 1 }}>
				<RoundedRect x={0} y={0} width={width} height={height} r={cornerRadius}>
					<LinearGradient
						start={vec(0, 0)}
						end={vec(width, height)}
						colors={['rgba(46, 51, 90, 0.26)', 'rgba(28, 57, 51, 0.26)']}
						positions={[-0.04, .95]}
					/>
				</RoundedRect>
			</Canvas>
		</BlurView>
	)
}

export default ForecaseSheetBackground