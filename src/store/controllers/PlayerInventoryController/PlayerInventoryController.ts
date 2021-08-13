import Controller from '../Controller'

import PlayerInventory from '../../models/PlayerInventory'
import ItemsFactory from '../../models/ItemFactory'
import Item from '../../models/Item'
import { Inventory } from '../../models/PlayerInventory/PlayerInventory'

@Controller([PlayerInventory, ItemsFactory])
class PlayerInventoryController {
  constructor(private playerInventory: PlayerInventory, private itemsFactory: ItemsFactory) {
    this.playerInventory.setItemsFactory(this.itemsFactory)
  }

  public getInventory(): Inventory<any>[] {
    return this.playerInventory.getInventory()
  }

  public getItem(uuid: string): Inventory<any> | undefined {
    return this.playerInventory.getItem(uuid)
  }

  public addItem(id: number, quantity?: number): Item<any> {
    return this.playerInventory.addItem(id, quantity)
  }

  public removeItem(uuid: string, quantity?: number) {
    this.playerInventory.removeItem(uuid, quantity)
  }

  public existsItem(uuid: string): boolean {
    return this.playerInventory.existsItem(uuid)
  }
}

export default PlayerInventoryController
