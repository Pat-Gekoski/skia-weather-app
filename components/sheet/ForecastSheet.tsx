import BottomSheet from '@gorhom/bottom-sheet';
import ForecaseSheetBackground from './ForecaseSheetBackground';
import useApplicationDimensions from '../../hooks/useApplicationDimensions';

const ForecastSheet = () => {
	const snapPoints = ['38.5', '83%'];
	const { width, height } = useApplicationDimensions()
	const firstSnapPoint = height * (parseFloat(snapPoints[0]) / 100)
	const cornerRadius = 44

	return (
		<BottomSheet
			snapPoints={snapPoints}
			handleIndicatorStyle={{
				width: 48,
				height: 5,
				backgroundColor: 'rgba(0,0,0,0.3)'
			}}
			backgroundComponent={() => <ForecaseSheetBackground width={width} height={firstSnapPoint} cornerRadius={cornerRadius} />}
		>

		</BottomSheet>
	)
}

export default ForecastSheet