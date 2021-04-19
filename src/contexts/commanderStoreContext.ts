import { createContext, useContext } from 'react'
import CommanderStore from '../store/Commander'

export const CommanderContext = createContext<CommanderStore | undefined>(undefined)

export const useCommander = () => {
  const context = useContext(CommanderContext)

  if (context === undefined) {
    throw new Error('useCommander must be used within a CommanderContext.Provider')
  }

  return context
}
