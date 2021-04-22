import Item from '../Items/Item'
import ItemWeapon from '../Items/ItemWeapon'
import ItemArmor from '../Items/ItemArmor'
import ItemPotion from '../Items/ItemPotion'
import ItemCraftMaterial from '../Items/ItemCraftMaterial'
import ItemCraftTool from '../Items/ItemCraftTool'

export interface itemTypes {
  Weapon: ItemWeapon
  Armor: ItemArmor
  Potion: ItemPotion
  Material: ItemCraftMaterial
  Tool: ItemCraftTool

  [key: string]: Item
}

export type ReturnItem<T extends keyof itemTypes> = itemTypes[T]
