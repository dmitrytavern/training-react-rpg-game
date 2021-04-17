import { createContext, useContext } from 'react'
import QuestsStore from "../store/Quests";

export const QuestsContext = createContext<QuestsStore | undefined>(undefined)

export const useQuestsStore = () => {
	const context = useContext(QuestsContext)

	if (context === undefined) {
		throw new Error('useQuestsStore must be used within a QuestsContext.Provider')
	}

	return context
}