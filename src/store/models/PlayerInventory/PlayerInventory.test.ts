import ItemsFactory from '../ItemsFactory'
import PlayerInventory from './PlayerInventory'
import PlayerInventoryItem from '../PlayerInventoryItem'

describe('Check base function', () => {
  const itemsFactory = ItemsFactory.newInstance()

  const item = itemsFactory.create(1)
  const inventoryItem = new PlayerInventoryItem({
    item,
    quantity: 1,
  })

  it('Adding item', () => {
    const inventory = new PlayerInventory()

    inventory.addItem(1, 1)
    inventory.addItem(1, 1)
    inventory.addItem(1, 2)

    expect(inventory.getItem(1)?.getQuantity()).toBe(4)
  })

  it('Removing item', () => {
    const inventory = new PlayerInventory()

    inventory.addItem(1, 2)
    inventory.removeItem(1, 1)

    expect(inventory.getItem(1)).toStrictEqual(inventoryItem)
  })

  it('Getting inventory', () => {
    const inventory = new PlayerInventory()

    inventory.addItem(1, 1)

    const items = inventory.getInventory()

    expect(items).toStrictEqual([inventoryItem])
  })

  it('Remove last item', () => {
    const inventory = new PlayerInventory()

    inventory.addItem(1, 1)
    inventory.removeItem(1, 1)

    expect(inventory.getItem(1)).toBeUndefined()
  })

  it('Check exists item', () => {
    const inventory = new PlayerInventory()

    expect(inventory.existsItem(1)).toBeFalsy()
  })

  it('Check exists item when lacks items', () => {
    const inventory = new PlayerInventory()

    inventory.addItem(1, 1)

    expect(inventory.existsItem(1, 2)).toBeFalsy()
  })
})
