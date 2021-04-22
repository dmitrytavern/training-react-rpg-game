import ItemsFactory from '../ItemsFactory'
import PlayerInventory from './PlayerInventory'

describe('Check base function', () => {
  const itemsFactory = ItemsFactory.newInstance()

  const item = itemsFactory.create(1, 'Weapon')
  const itemId = item.uuid

  it('Adding item', () => {
    const inventory = new PlayerInventory()

    inventory.addItem(item, 1)
    inventory.addItem(item, 1)
    inventory.addItem(item, 2)

    const result = inventory.getItem(itemId) || []

    expect(result[1]).toBe(4)
  })

  it('Removing item', () => {
    const inventory = new PlayerInventory()

    inventory.addItem(item, 2)
    inventory.removeItem(itemId, 1)

    const result = inventory.getItem(itemId) || []

    expect(result[1]).toBe(1)
  })

  it('Getting inventory', () => {
    const inventory = new PlayerInventory()

    inventory.addItem(item, 1)

    const items = inventory.getInventory()

    expect(items).toStrictEqual([[item, 1]])
  })

  it('Remove last item', () => {
    const inventory = new PlayerInventory()

    inventory.addItem(item, 1)
    inventory.removeItem(itemId, 1)

    expect(inventory.getItem(itemId)).toBeUndefined()
  })

  it('Check exists item', () => {
    const inventory = new PlayerInventory()

    expect(inventory.existsItem(itemId)).toBeFalsy()
  })

  it('Check exists item when lacks items', () => {
    const inventory = new PlayerInventory()

    inventory.addItem(item, 1)

    expect(inventory.existsItem(itemId, 2)).toBeFalsy()
  })
})
