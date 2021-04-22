import { API as PlayerLevel } from '../PlayerLevel'
import { API as PlayerHealth } from '../PlayerHealth'
import { API as PlayerDamage } from '../PlayerDamage'
import { API as PlayerDefense } from '../PlayerDefense'
import { API as PlayerEnergy } from '../PlayerEnergy'
import { API as PlayerInventory } from '../PlayerInventory'
import { API as PlayerEquipment } from '../PlayerEquipment'
import { API as PlayerBalance } from '../PlayerBalance'
import { API as PlayerCharacteristic } from '../PlayerCharacteristic'
import { API as PlayerFavorites } from '../PlayerFavorites'
import { API as Craft } from '../Craft'
import { API as Quests } from '../Quests'
import { API as ItemsFactory } from '../ItemsFactory'

const globalApi = {
  ...PlayerLevel,
  ...PlayerHealth,
  ...PlayerDamage,
  ...PlayerDefense,
  ...PlayerEnergy,
  ...PlayerInventory,
  ...PlayerEquipment,
  ...PlayerBalance,
  ...PlayerCharacteristic,
  ...PlayerFavorites,
  ...Craft,
  ...Quests,
  ...ItemsFactory,
}

export default globalApi
