import PlayerInventory from './PlayerInventory'
import ItemsFactory from '../ItemFactory'

describe('Check base functions', () => {
  const inventory = new PlayerInventory()
  const factory = new ItemsFactory()

  inventory.setItemsFactory(factory)

  it('Get not exists item', () => {
    expect(inventory.getItem('0')).toBe(undefined)
  })

  it('Get exists item only in factory', () => {
    const _item = factory.create({ id: 1 })
    expect(inventory.getItem(_item.uuid)).toBe(undefined)
    factory.delete(_item.uuid)
  })

  it('Add item', () => {
    const _item = inventory.addItem(1)

    expect(inventory.getItem(_item.uuid)).toEqual(_item)
  })

  it('Get item with other type', () => {
    const _item = inventory.addItem(1)

    expect(() =>
      // @ts-ignore
      inventory.getItem(_item.uuid, 'none')
    ).toThrow()
  })

  it('Add and delete two simple item', () => {
    const _item1 = inventory.addItem(102)
    const _item2 = inventory.addItem(102)

    expect(inventory.getItem(_item1.uuid)).toEqual(_item2)
  })

  it('Add two simple item and delete one', () => {
    const _item = inventory.addItem(101)

    inventory.addItem(101)

    inventory.removeItem(_item.uuid, 1)

    expect(inventory.getItem(_item.uuid)).toEqual(_item)

    inventory.removeItem(_item.uuid, 1)
  })

  it('Add unique item in 2 quantity', () => {
    expect(() => inventory.addItem(1, 2)).toThrow()
  })

  it('Delete last item', () => {
    const _item = inventory.addItem(103, 2)

    inventory.removeItem(_item.uuid, 2)

    expect(inventory.getItem(_item.uuid)).toBe(undefined)
  })

  it('Delete 2 item when inventory have 1', () => {
    const _item = inventory.addItem(104)

    expect(() => inventory.removeItem(_item.uuid, 2)).toThrow()

    inventory.removeItem(_item.uuid)
  })

  it('Delete 1 item by id', () => {
    const _item = inventory.addItem(104)

    inventory.removeItemById(104)

    expect(inventory.existsItem(_item.uuid)).toBeFalsy()
  })

  it('Delete 1 item by id when inventory have 2 items', () => {
    const _item = inventory.addItem(104, 2)

    inventory.removeItemById(104)

    expect(inventory.existsItem(_item.uuid)).toBeTruthy()
  })
})

describe('Check exists function', () => {
  const inventory = new PlayerInventory()
  const factory = new ItemsFactory()

  inventory.setItemsFactory(factory)

  it('Item not exists', () => {
    expect(inventory.existsItem('0')).toBeFalsy()
    expect(inventory.existsItem('0', 2)).toBeFalsy()
  })

  it('Item exists', () => {
    const _item = inventory.addItem(101)

    expect(inventory.existsItem(_item.uuid)).toBeTruthy()
    expect(inventory.existsItem(_item.uuid, 2)).toBeFalsy()

    inventory.removeItem(_item.uuid)
  })

  it('Item exists by id', () => {
    const _item = inventory.addItem(101)

    expect(inventory.existsItemById(101)).toBeTruthy()
    expect(inventory.existsItemById(101, 2)).toBeFalsy()

    inventory.removeItem(_item.uuid)
  })
})

describe('Check getting inventory', () => {
  const inventory = new PlayerInventory()
  const factory = new ItemsFactory()

  inventory.setItemsFactory(factory)

  it('Inventory have not items', () => {
    expect(inventory.getInventory()).toEqual([])
  })

  it('Inventory have 1 item', () => {
    const _item = inventory.addItem(1, 1)
    expect(inventory.getInventory()).toEqual([[_item, 1]])
    inventory.removeItem(_item.uuid)
  })

  it('Inventory have 2 item', () => {
    const _item1 = inventory.addItem(1, 1)
    const _item2 = inventory.addItem(101, 1)

    expect(inventory.getInventory()).toEqual([
      [_item1, 1],
      [_item2, 1],
    ])

    inventory.removeItem(_item1.uuid)
    inventory.removeItem(_item2.uuid)
  })

  it('Inventory have simple and unique items', () => {
    const _item1 = inventory.addItem(1, 1)
    const _item2 = inventory.addItem(101, 1)

    inventory.addItem(101, 1)

    expect(inventory.getInventory()).toEqual([
      [_item1, 1],
      [_item2, 2],
    ])
  })
})
