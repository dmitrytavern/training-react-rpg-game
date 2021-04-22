import ItemWeapon from '../Items/ItemWeapon'
import ItemArmor from '../Items/ItemArmor'

export interface EquipmentTypes {
  weapon: ItemWeapon
  helmet: ItemArmor
  armor: ItemArmor
  arms: ItemArmor
  feet: ItemArmor
  leftRing: ItemArmor
  rightRing: ItemArmor
  waist: ItemArmor
}

export type EquipmentSlots = keyof EquipmentTypes
