import PlayerEquipmentSlot from './PlayerEquipmentSlot'
import ItemFactory from '../ItemFactory'

const itemFactory = new ItemFactory()

describe('Check base functions', () => {
  it('Getting not exists equipment', () => {
    const slot = new PlayerEquipmentSlot('Weapon')
    expect(slot.getEquipment()).toBeUndefined()
  })

  it('Getting equipment', () => {
    const slot = new PlayerEquipmentSlot('Weapon')
    const item = itemFactory.create({ id: 1, type: 'Weapon' })

    slot.setEquipment(item)

    expect(slot.getEquipment()).toBe(item)
  })

  it('Existing not exists item', () => {
    const slot = new PlayerEquipmentSlot('Weapon')
    expect(slot.existsEquipment()).toBeFalsy()
  })

  it('Existing item', () => {
    const slot = new PlayerEquipmentSlot('Weapon')
    const item = itemFactory.create({ id: 1, type: 'Weapon' })

    slot.setEquipment(item)

    expect(slot.existsEquipment()).toBeTruthy()
  })
})

describe('Check change equip', () => {
  it('Changing item1 on item2', () => {
    const slot = new PlayerEquipmentSlot('Armor', 'Armor:Ring')
    const _item1 = itemFactory.create({ id: 8, type: 'Armor' })
    const _item2 = itemFactory.create({ id: 9, type: 'Armor' })

    slot.setEquipment(_item1)

    expect(slot.getEquipment()).toEqual(_item1)

    slot.setEquipment(_item2)

    expect(slot.getEquipment()).toEqual(_item2)
  })

  it('Unsetting item', () => {
    const slot = new PlayerEquipmentSlot('Weapon')
    const _item = itemFactory.create({ id: 1, type: 'Weapon' })

    slot.setEquipment(_item)

    expect(slot.getEquipment()).toEqual(_item)

    slot.unsetEquipment()

    expect(slot.getEquipment()).toBeUndefined()
  })

  it('Setting item with other type', () => {
    const slot = new PlayerEquipmentSlot('Weapon')
    const item = itemFactory.create({ id: 9, type: 'Armor' })

    // @ts-ignore
    expect(() => slot.setEquipment(item)).toThrow()
  })

  it('Setting item with other category', () => {
    const slot = new PlayerEquipmentSlot('Armor', 'Armor:Helmet')
    const item = itemFactory.create({ id: 9, type: 'Armor' })

    expect(() => slot.setEquipment(item)).toThrow()
  })

  it('Setting not armor item', () => {
    const slot = new PlayerEquipmentSlot('Armor', 'Armor:Ring')
    const item = itemFactory.create({ id: 101, type: 'CraftMaterial' })

    // @ts-ignore
    expect(() => slot.setEquipment(item)).toThrow()
  })
})
