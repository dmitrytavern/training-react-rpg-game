import { Effect } from '../../../types/Effect'
import ItemWeapon from '../Items/ItemWeapon'
import ItemArmor from '../Items/ItemArmor'
import PlayerEquipmentSlot from '../PlayerEquipmentSlot'

class PlayerEquipment {
  public weapon: PlayerEquipmentSlot<ItemWeapon>
  public leftRing: PlayerEquipmentSlot<ItemArmor>
  public rightRing: PlayerEquipmentSlot<ItemArmor>
  public waist: PlayerEquipmentSlot<ItemArmor>
  public helmet: PlayerEquipmentSlot<ItemArmor>
  public armor: PlayerEquipmentSlot<ItemArmor>
  public arms: PlayerEquipmentSlot<ItemArmor>
  public feet: PlayerEquipmentSlot<ItemArmor>

  constructor() {
    this.weapon = new PlayerEquipmentSlot('weapon')
    this.leftRing = new PlayerEquipmentSlot('armor', 'Armor:Ring')
    this.rightRing = new PlayerEquipmentSlot('armor', 'Armor:Ring')
    this.waist = new PlayerEquipmentSlot('armor', 'Armor:Waist')
    this.helmet = new PlayerEquipmentSlot('armor', 'Armor:Helmet')
    this.armor = new PlayerEquipmentSlot('armor', 'Armor:Armor')
    this.arms = new PlayerEquipmentSlot('armor', 'Armor:Arms')
    this.feet = new PlayerEquipmentSlot('armor', 'Armor:Feet')
  }

  public getEffects(): Effect[] {
    return [
      ...this.weapon.getEffects(),
      ...this.leftRing.getEffects(),
      ...this.rightRing.getEffects(),
      ...this.waist.getEffects(),
      ...this.helmet.getEffects(),
      ...this.armor.getEffects(),
      ...this.arms.getEffects(),
      ...this.feet.getEffects(),
    ]
  }
}

export default PlayerEquipment
