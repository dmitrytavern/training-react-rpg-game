import { createContext, useContext } from 'react'
import CraftStore from "../store/Craft"

export const CraftContext = createContext<CraftStore | undefined>(undefined)

export const useCraftStore = () => {
	const context = useContext(CraftContext)

	if (context === undefined) {
		throw new Error('useCraftStore must be used within a CraftContext.Provider')
	}

	return context
}