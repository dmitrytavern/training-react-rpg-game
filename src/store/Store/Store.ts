import { reaction } from 'mobx'
import { StoreContext, StoreControllers } from './types'

import Craft from '../models/Craft'
import Quests from '../models/Quests'
import PlayerLevel from '../models/PlayerLevel'
import PlayerHealth from '../models/PlayerHealth'
import PlayerEnergy from '../models/PlayerEnergy'
import PlayerDamage from '../models/PlayerDamage'
import PlayerDefense from '../models/PlayerDefense'
import PlayerInventory from '../models/PlayerInventory'
import PlayerEquipment from '../models/PlayerEquipment'
import PlayerFavorites from '../models/PlayerFavorites'
import PlayerCharacteristic from '../models/PlayerCharacteristic'
import PlayerBalance from '../models/PlayerBalance'
import ItemFactory from '../models/ItemFactory'

import PlayerLevelController from '../controllers/PlayerLevelController'
import PlayerHealthController from '../controllers/PlayerHealthController'
import PlayerEnergyController from '../controllers/PlayerEnergyController'
import PlayerDamageController from '../controllers/PlayerDamageController'
import PlayerDefenseController from '../controllers/PlayerDefenseController'
import PlayerInventoryController from '../controllers/PlayerInventoryController'
import PlayerEquipmentController from '../controllers/PlayerEquipmentController'
import PlayerFavoritesController from '../controllers/PlayerFavoritesController'
import PlayerCharacteristicController from '../controllers/PlayerCharacteristicController'
import PlayerBalanceController from '../controllers/PlayerBalanceController'
import CraftController from '../controllers/CraftController'
import QuestsController from '../controllers/QuestsController'

class Store {
  private readonly controllers: StoreControllers
  private readonly context: StoreContext

  constructor() {
    this.context = {
      playerLevel: new PlayerLevel(50, 10),
      playerHealth: new PlayerHealth(5000, 100),
      playerEnergy: new PlayerEnergy(50, 100),
      playerDamage: new PlayerDamage(30, 50),
      playerDefense: new PlayerDefense(),
      playerInventory: new PlayerInventory(),
      playerEquipment: new PlayerEquipment(),
      playerFavorites: new PlayerFavorites(),
      playerCharacteristic: new PlayerCharacteristic(),
      playerBalance: new PlayerBalance({ money: 0 }),
      craft: new Craft(),
      quests: new Quests(),
      itemFactor: new ItemFactory(),
    }

    const controllerContext = {
      context: this.context,
    }

    this.controllers = {
      playerLevel: new PlayerLevelController(controllerContext),
      playerHealth: new PlayerHealthController(controllerContext),
      playerEnergy: new PlayerEnergyController(controllerContext),
      playerDamage: new PlayerDamageController(controllerContext),
      playerDefense: new PlayerDefenseController(controllerContext),
      playerInventory: new PlayerInventoryController(controllerContext),
      playerEquipment: new PlayerEquipmentController(controllerContext),
      playerFavorites: new PlayerFavoritesController(controllerContext),
      playerCharacteristic: new PlayerCharacteristicController(controllerContext),
      playerBalance: new PlayerBalanceController(controllerContext),
      craft: new CraftController(controllerContext),
      quests: new QuestsController(controllerContext),
    }
  }

  public execute(name: string, payload?: any): any {
    return null
  }

  public subscribe(name: string, payload: any, callback: Function): void {
    const fn = () => this.execute(name, payload)

    const reactionDisposer = reaction(fn, (isExists) => {
      callback(isExists, reactionDisposer)
    })

    callback(fn(), reactionDisposer)
  }
}

export default Store
