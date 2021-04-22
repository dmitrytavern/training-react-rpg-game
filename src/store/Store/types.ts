import PlayerLevel from '../PlayerLevel'
import PlayerHealth from '../PlayerHealth'
import PlayerDamage from '../PlayerDamage'
import PlayerDefense from '../PlayerDefense'
import PlayerEnergy from '../PlayerEnergy'
import PlayerInventory from '../PlayerInventory'
import PlayerBalance from '../PlayerBalance'
import PlayerCharacteristic from '../PlayerCharacteristic'
import PlayerFavorites from '../PlayerFavorites'
import Craft from '../Craft'
import Quests from '../Quests'
import ItemsFactory from '../ItemsFactory'
import commands from './commands'

export interface CommanderContext {
  playerLevel?: PlayerLevel
  playerHealth?: PlayerHealth
  playerDamage?: PlayerDamage
  playerDefense?: PlayerDefense
  playerEnergy?: PlayerEnergy
  playerInventory?: PlayerInventory
  playerBalance?: PlayerBalance
  playerCharacteristic?: PlayerCharacteristic
  playerFavorites?: PlayerFavorites
  craft?: Craft
  quests?: Quests
  itemsFactory?: ItemsFactory
}

export type commandTypes = keyof typeof commands
export type commandTypePayload<T extends commandTypes> = Parameters<typeof commands[T]>[1]
export type commandTypeReturn<T extends commandTypes> = ReturnType<typeof commands[T]>

export interface commandAction<T extends commandTypes> {
  action: T
  payload: commandTypePayload<T>
}
