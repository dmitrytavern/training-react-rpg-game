import { createContext, useContext } from 'react'
import ItemsFactory from "../store/ItemsFactory"

export const ItemsFactoryContext = createContext<ItemsFactory | undefined>(undefined)

export const useItemsFactoryStore = () => {
	const context = useContext(ItemsFactoryContext)

	if (context === undefined) {
		throw new Error('useItemsFactoryStore must be used within a ItemsFactoryContext.Provider')
	}

	return context
}