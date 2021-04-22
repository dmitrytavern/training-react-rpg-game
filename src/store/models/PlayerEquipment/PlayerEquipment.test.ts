import PlayerEquipment from './PlayerEquipment'
import ItemsFactory from '../ItemsFactory'

describe('Check effect getting', () => {
  const itemsFactory = ItemsFactory.newInstance()

  const helmet = itemsFactory.create(4, 'armor')
  const armor = itemsFactory.create(5, 'armor')
  const arms = itemsFactory.create(7, 'armor')
  const feet = itemsFactory.create(6, 'armor')
  const leftRing = itemsFactory.create(8, 'armor')
  const rightRing = itemsFactory.create(9, 'armor')
  const waist = itemsFactory.create(10, 'armor')

  it('Getting effects without equip', () => {
    const equipment = new PlayerEquipment()

    expect(equipment.getEffects()).toEqual([])
  })

  it('Getting effects with equip', () => {
    const equipment = new PlayerEquipment()

    equipment.helmetSlot.setEquipment(helmet)
    equipment.armorSlot.setEquipment(armor)
    equipment.armsSlot.setEquipment(arms)
    equipment.feetSlot.setEquipment(feet)
    equipment.leftRingSlot.setEquipment(leftRing)
    equipment.rightRingSlot.setEquipment(rightRing)
    equipment.waistSlot.setEquipment(waist)

    expect(equipment.getEffects()).toEqual([
      ...leftRing.effects,
      ...rightRing.effects,
      ...waist.effects,
      ...helmet.effects,
      ...armor.effects,
      ...arms.effects,
      ...feet.effects,
    ])
  })
})
