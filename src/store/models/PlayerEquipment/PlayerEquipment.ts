import { Effect } from '../../../../types/Effect'
import PlayerEquipmentSlot from '../PlayerEquipmentSlot'

export type Slots =
  | 'weapon'
  | 'leftRing'
  | 'rightRing'
  | 'waist'
  | 'helmet'
  | 'armor'
  | 'arms'
  | 'feet'

class PlayerEquipment {
  public weapon: PlayerEquipmentSlot<'Weapon'>
  public leftRing: PlayerEquipmentSlot<'Armor'>
  public rightRing: PlayerEquipmentSlot<'Armor'>
  public waist: PlayerEquipmentSlot<'Armor'>
  public helmet: PlayerEquipmentSlot<'Armor'>
  public armor: PlayerEquipmentSlot<'Armor'>
  public arms: PlayerEquipmentSlot<'Armor'>
  public feet: PlayerEquipmentSlot<'Armor'>

  constructor() {
    this.weapon = new PlayerEquipmentSlot('Weapon')
    this.leftRing = new PlayerEquipmentSlot('Armor', 'Armor:Ring')
    this.rightRing = new PlayerEquipmentSlot('Armor', 'Armor:Ring')
    this.waist = new PlayerEquipmentSlot('Armor', 'Armor:Waist')
    this.helmet = new PlayerEquipmentSlot('Armor', 'Armor:Helmet')
    this.armor = new PlayerEquipmentSlot('Armor', 'Armor:Armor')
    this.arms = new PlayerEquipmentSlot('Armor', 'Armor:Arms')
    this.feet = new PlayerEquipmentSlot('Armor', 'Armor:Feet')
  }

  public getEffects(): Effect[] {
    return [
      ...(this.weapon.getEquipment()?.getParameter('effects') || []),
      ...(this.leftRing.getEquipment()?.getParameter('effects') || []),
      ...(this.rightRing.getEquipment()?.getParameter('effects') || []),
      ...(this.waist.getEquipment()?.getParameter('effects') || []),
      ...(this.helmet.getEquipment()?.getParameter('effects') || []),
      ...(this.armor.getEquipment()?.getParameter('effects') || []),
      ...(this.arms.getEquipment()?.getParameter('effects') || []),
      ...(this.feet.getEquipment()?.getParameter('effects') || []),
    ]
  }
}

export default PlayerEquipment
