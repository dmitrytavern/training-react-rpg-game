import PlayerEquipment from './PlayerEquipment'

describe('Check effect getting', () => {
  it('Getting effects without equip', () => {
    const equipment = new PlayerEquipment()
    expect(equipment.getEffects()).toEqual([])
  })
})
