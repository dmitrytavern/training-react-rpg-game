import PlayerLevelController from '../controllers/PlayerLevelController'
import PlayerHealthController from '../controllers/PlayerHealthController'
import PlayerDamageController from '../controllers/PlayerDamageController'
import PlayerDefenseController from '../controllers/PlayerDefenseController'
import PlayerEnergyController from '../controllers/PlayerEnergyController'
import PlayerInventoryController from '../controllers/PlayerInventoryController'
import PlayerEquipmentController from '../controllers/PlayerEquipmentController'
import PlayerBalanceController from '../controllers/PlayerBalanceController'
import PlayerCharacteristicController from '../controllers/PlayerCharacteristicController'
import PlayerFavoritesController from '../controllers/PlayerFavoritesController'
import CraftController from '../controllers/CraftController'
import QuestsController from '../controllers/QuestsController'

export interface Controllers {
  playerLevel: PlayerLevelController
  playerHealth: PlayerHealthController
  playerDamage: PlayerDamageController
  playerDefense: PlayerDefenseController
  playerEnergy: PlayerEnergyController
  playerInventory: PlayerInventoryController
  playerEquipment: PlayerEquipmentController
  playerBalance: PlayerBalanceController
  playerCharacteristic: PlayerCharacteristicController
  playerFavorites: PlayerFavoritesController
  craft: CraftController
  quests: QuestsController
}
