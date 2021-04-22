import { Controllers } from '../controllers/types'

import PlayerLevel from '../models/PlayerLevel'
import PlayerHealth from '../models/PlayerHealth'
import PlayerDamage from '../models/PlayerDamage'
import PlayerDefense from '../models/PlayerDefense'
import PlayerEnergy from '../models/PlayerEnergy'
import PlayerInventory from '../models/PlayerInventory'
import PlayerEquipment from '../models/PlayerEquipment'
import PlayerBalance from '../models/PlayerBalance'
import PlayerCharacteristic from '../models/PlayerCharacteristic'
import PlayerFavorites from '../models/PlayerFavorites'
import Craft from '../models/Craft'
import Quests from '../models/Quests'
import ItemsFactory from '../models/ItemsFactory'

export interface StoreContext {
  playerLevel: PlayerLevel
  playerHealth: PlayerHealth
  playerDamage: PlayerDamage
  playerDefense: PlayerDefense
  playerEnergy: PlayerEnergy
  playerInventory: PlayerInventory
  playerEquipment: PlayerEquipment
  playerBalance: PlayerBalance
  playerCharacteristic: PlayerCharacteristic
  playerFavorites: PlayerFavorites
  craft: Craft
  quests: Quests
  itemsFactor: ItemsFactory
}

export type StoreControllers = Controllers
