import { Weapon } from './Weapon'
import { Armor } from './Armor'
import { Potion } from './Potion'
import { CraftTool } from './CraftTool'
import { CraftMaterial } from './CraftMaterial'

export interface Items {
  Weapon: Weapon
  Armor: Armor
  Potion: Potion
  CraftTool: CraftTool
  CraftMaterial: CraftMaterial
}

export type ItemsTypes = keyof Items
