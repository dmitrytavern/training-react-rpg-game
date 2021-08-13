import CraftController from './CraftController'
import PlayerInventory from '../../models/PlayerInventory'
import ItemFactory from '../../models/ItemFactory'
import Craft from '../../models/Craft'

describe('Check available material', () => {
  const craft = new Craft()
  const playerInventory = new PlayerInventory()
  const itemFactor = new ItemFactory()

  playerInventory.setItemsFactory(itemFactor)

  const controller = new CraftController({
    context: {
      craft,
      playerInventory,
    },
  })

  it('Inventory have not materials', () => {
    expect(controller.checkMaterialAvailable(-1, 1)).toBeFalsy()

    expect(controller.checkMaterialAvailable(-1, 12)).toBeFalsy()
  })

  it('Inventory have materials', () => {
    const _item = playerInventory.addItem(101)

    expect(controller.checkMaterialAvailable(_item.id, 1)).toBeTruthy()

    expect(controller.checkMaterialAvailable(_item.id, 2)).toBeFalsy()
  })
})

describe('Check available tool', () => {
  const craft = new Craft()
  const playerInventory = new PlayerInventory()
  const itemFactor = new ItemFactory()

  playerInventory.setItemsFactory(itemFactor)

  const controller = new CraftController({
    context: {
      craft,
      playerInventory,
    },
  })

  it('Inventory have not tool', () => {
    expect(controller.checkToolAvailable(-1)).toBeFalsy()
  })

  it('Inventory have tool', () => {
    const _item = playerInventory.addItem(301)

    expect(controller.checkToolAvailable(_item.id)).toBeTruthy()
  })
})

describe('Check crafting', () => {
  const createId = '2'
  const craft = new Craft()
  const playerInventory = new PlayerInventory()
  const itemFactor = new ItemFactory()

  playerInventory.setItemsFactory(itemFactor)

  const controller = new CraftController({
    context: {
      craft,
      playerInventory,
    },
  })

  it('Craft without materials and tools', () => {
    expect(() => controller.create(createId)).toThrow()
  })

  it('Craft without materials', () => {
    const _item = playerInventory.addItem(301, 1)

    expect(() => controller.create(createId)).toThrow()

    playerInventory.removeItem(_item.uuid, 1)
  })

  it('Craft', () => {
    const _tool = playerInventory.addItem(301, 1)
    const _material1 = playerInventory.addItem(101, 1)
    const _material2 = playerInventory.addItem(102, 1)
    const _material3 = playerInventory.addItem(1, 1)

    const _result = controller.create(createId)[0]

    expect(playerInventory.existsItem(_material1.uuid)).toBeFalsy()
    expect(playerInventory.existsItem(_material2.uuid)).toBeFalsy()
    expect(playerInventory.existsItem(_material3.uuid)).toBeFalsy()
    expect(playerInventory.existsItem(_tool.uuid)).toBeTruthy()
    expect(playerInventory.existsItem(_result.uuid)).toBeTruthy()
  })
})
