import Controller from '../Controller'
import PlayerInventory from '../../models/PlayerInventory'
import PlayerEquipment from '../../models/PlayerEquipment'
import { Slots } from '../../models/PlayerEquipment/PlayerEquipment'

@Controller([PlayerEquipment, PlayerInventory])
class PlayerEquipmentController {
  constructor(private playerEquipment: PlayerEquipment, private playerInventory: PlayerInventory) {}

  public getSlot(slot: Slots) {
    return this.playerEquipment[slot].getEquipment()
  }

  public setSlot(uuid: string, slot: Slots) {
    const inventoryItem = this.playerInventory.getItem(uuid)

    if (!inventoryItem) {
      throw new Error('You have not this item')
    }

    const [item] = inventoryItem

    // TODO: Remove ts-ignore. Fix this problem
    // @ts-ignore
    this.playerEquipment[slot].setEquipment(item)
  }

  public unsetSlot(slot: Slots) {
    this.playerEquipment[slot].unsetEquipment()
  }

  public existsSlot(slot: Slots): boolean {
    return this.playerEquipment[slot].existsEquipment()
  }
}

export default PlayerEquipmentController
