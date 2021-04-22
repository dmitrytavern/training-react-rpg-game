import { makeAutoObservable } from 'mobx'
import PlayerInventory from '../PlayerInventory'

class CraftTool {
  private inventory: PlayerInventory
  public id: number

  constructor(inventory: PlayerInventory, id: number) {
    this.inventory = inventory
    this.id = id

    makeAutoObservable(this)
  }

  public isAvailable(): boolean {
    return this.inventory.existsItem(this.id)
  }
}

export default CraftTool
