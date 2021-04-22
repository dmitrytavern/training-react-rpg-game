import { ItemArmorType, ItemArmorCategories } from '../ItemArmor/types'
import { ItemCraftMaterialType, ItemCraftMaterialCategories } from '../ItemCraftMaterial/types'
import { ItemCraftToolType, ItemCraftToolCategories } from '../ItemCraftTool/types'
import { ItemPotionType, ItemPotionCategories } from '../ItemPotion/types'
import { ItemWeaponType, ItemWeaponCategories } from '../ItemWeapon/types'

export type ItemTypes =
  | ItemArmorType
  | ItemCraftMaterialType
  | ItemCraftToolType
  | ItemPotionType
  | ItemWeaponType

export type ItemTypeCategories =
  | ItemArmorCategories
  | ItemCraftMaterialCategories
  | ItemCraftToolCategories
  | ItemPotionCategories
  | ItemWeaponCategories

export interface ItemProps {
  readonly id: number
}
