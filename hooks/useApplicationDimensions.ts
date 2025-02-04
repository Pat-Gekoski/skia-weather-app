import { StatusBar, useWindowDimensions } from 'react-native'

const useApplicationDimensions = () => {
	const { width, height, scale, fontScale } = useWindowDimensions()
	return {
		width,
		// height: height + (StatusBar?.currentHeight || 0),
		height,
		scale,
		fontScale,
	}
}

export default useApplicationDimensions
