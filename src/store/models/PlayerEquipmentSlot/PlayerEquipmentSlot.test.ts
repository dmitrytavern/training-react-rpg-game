import PlayerEquipmentSlot from './PlayerEquipmentSlot'
import ItemsFactory from '../ItemsFactory'

const itemsFactory = ItemsFactory.newInstance()

describe('Check base functions', () => {
  it('Getting name', () => {
    const equipmentSlot = new PlayerEquipmentSlot('weapon')
    const item = itemsFactory.create(1, 'weapon')

    equipmentSlot.setEquipment(item)

    expect(equipmentSlot.getName()).toBe(item.name)
  })

  it('Getting name of not existing item', () => {
    const equipmentSlot = new PlayerEquipmentSlot('weapon')

    expect(equipmentSlot.getName()).toHaveLength(0)
  })

  it('Existing item', () => {
    const equipmentSlot = new PlayerEquipmentSlot('weapon')
    const item = itemsFactory.create(1, 'weapon')

    equipmentSlot.setEquipment(item)

    expect(equipmentSlot.existsEquipment()).toBeTruthy()
  })

  it('Getting item', () => {
    const equipmentSlot = new PlayerEquipmentSlot('weapon')
    const item = itemsFactory.create(1, 'weapon')

    equipmentSlot.setEquipment(item)

    expect(equipmentSlot.getEquipment()).toEqual(item)
  })

  it('Getting not existing item', () => {
    const equipmentSlot = new PlayerEquipmentSlot('weapon')

    expect(equipmentSlot.getEquipment()).toBeUndefined()
  })

  it('Getting effects', () => {
    const equipmentSlot = new PlayerEquipmentSlot('weapon')
    const item = itemsFactory.create(1, 'weapon')

    equipmentSlot.setEquipment(item)

    expect(equipmentSlot.getEffects()).toEqual(item.effects)
  })

  it('Getting effects of not exists item', () => {
    const equipmentSlot = new PlayerEquipmentSlot('weapon')

    expect(equipmentSlot.getEffects()).toEqual([])
  })
})

describe('Check change equip', () => {
  it('Changing item1 on item2', () => {
    const equipmentSlot = new PlayerEquipmentSlot('armor', 'Armor:Ring')
    const item1 = itemsFactory.create(8, 'armor')
    const item2 = itemsFactory.create(9, 'armor')

    equipmentSlot.setEquipment(item1)

    expect(equipmentSlot.getEquipment()).toEqual(item1)

    equipmentSlot.setEquipment(item2)

    expect(equipmentSlot.getEquipment()).toEqual(item2)
  })

  it('Unsetting item', () => {
    const equipmentSlot = new PlayerEquipmentSlot('weapon')
    const item = itemsFactory.create(1, 'weapon')

    equipmentSlot.setEquipment(item)

    expect(equipmentSlot.getEquipment()).toEqual(item)

    equipmentSlot.unsetEquipment()

    expect(equipmentSlot.getEquipment()).toBeUndefined()
  })

  it('Setting item with other type', () => {
    const equipmentSlot = new PlayerEquipmentSlot('weapon')
    const item = itemsFactory.create(9, 'armor')

    expect(() => equipmentSlot.setEquipment(item)).toThrow()
  })

  it('Setting item with other category', () => {
    const equipmentSlot = new PlayerEquipmentSlot('armor', 'ring')
    const item = itemsFactory.create(9, 'armor')

    expect(() => equipmentSlot.setEquipment(item)).toThrow()
  })

  it('Setting not armor item', () => {
    const equipmentSlot = new PlayerEquipmentSlot('armor', 'ring')
    const item = itemsFactory.create(101)

    // @ts-ignore
    expect(() => equipmentSlot.setEquipment(item)).toThrow()
  })
})
