import { createContext, useContext } from 'react'
import PlayerStore from "../store/Player"

export const PlayerContext = createContext<PlayerStore | undefined>(undefined)

export const usePlayerStore = () => {
	const context = useContext(PlayerContext)

	if (context === undefined) {
		throw new Error('usePlayerStore must be used within a PlayerContext.Provider')
	}

	return context
}