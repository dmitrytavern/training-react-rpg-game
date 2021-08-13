import { createContext, useContext } from 'react'
import Store from '../store/Store'

export const StoreContext = createContext<Store | undefined>(undefined)

export const useStore = () => {
  const context = useContext(StoreContext)

  if (context === undefined) {
    throw new Error('useStore must be used within a StoreContext.Provider')
  }

  return context
}
