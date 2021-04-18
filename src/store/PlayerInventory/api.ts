import PlayerInventory from './PlayerInventory'
import PlayerInventoryItem from '../PlayerInventoryItem'

interface ItemProps {
  itemId: number
  quantity: number
}

interface Context {
  playerInventory?: PlayerInventory
}

class Api {
  public static getInventory(context: Context): PlayerInventoryItem[] {
    const inventory = context.playerInventory

    if (!inventory) {
      throw new Error('Inventory is undefined')
    }

    return inventory.getInventory()
  }

  public static getItem(context: Context, payload: number): PlayerInventoryItem | undefined {
    const inventory = context.playerInventory

    if (!inventory) {
      throw new Error('Inventory is undefined')
    }

    return inventory.getItem(payload)
  }

  public static addItem(context: Context, payload: ItemProps) {
    const inventory = context.playerInventory

    if (!inventory) {
      throw new Error('Inventory is undefined')
    }

    inventory.addItem(payload.itemId, payload.quantity)
  }

  public static removeItem(context: Context, payload: ItemProps) {
    const inventory = context.playerInventory

    if (!inventory) {
      throw new Error('Inventory is undefined')
    }

    inventory.removeItem(payload.itemId, payload.quantity)
  }

  public static hasItem(context: Context, payload: ItemProps): boolean {
    const inventory = context.playerInventory

    if (!inventory) {
      throw new Error('Inventory is undefined')
    }

    return inventory.existsItem(payload.itemId, payload.quantity)
  }
}

const PlayerInventoryApi = {
  'player_inventory:get_inventory': Api.getInventory,
  'player_inventory:get_item': Api.getItem,
  'player_inventory:add_item': Api.addItem,
  'player_inventory:remove_item': Api.removeItem,
  'player_inventory:has_item': Api.hasItem,
}

export default PlayerInventoryApi
