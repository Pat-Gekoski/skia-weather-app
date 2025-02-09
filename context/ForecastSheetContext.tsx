import { createContext, ReactNode, useContext } from 'react'
import { SharedValue, useSharedValue } from 'react-native-reanimated'

interface ForcastSheetProviderProps {
	children: ReactNode
}

export const ForecastSheetContext = createContext<SharedValue<number> | null>(null)

export const ForecastSheetProvider = ({ children }: ForcastSheetProviderProps) => {
	const animatedPosition = useSharedValue(0)

	return <ForecastSheetContext.Provider value={animatedPosition}>{children}</ForecastSheetContext.Provider>
}

export const useForcatSheetPosition = (): SharedValue<number> => {
	const context = useContext(ForecastSheetContext)

	if (context === null) {
		throw new Error('useForcatSheetPosition must be used within a ForecastSheetProvider')
	}

	return context
}
