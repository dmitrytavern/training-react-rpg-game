import CraftMaterial from '../CraftMaterial'
import CraftMaterialFactory from '../CraftMaterialFactory'
import CraftToolFactory from '../CraftToolFactory'

export interface CraftBlueprintDataMaterial {
  readonly id: number
  readonly quantity: number
}

export interface CraftBlueprintDataTool {
  readonly id: number
}

export interface CraftBlueprintResult {
  readonly id: number
  readonly quantity: number
}

export interface CraftBlueprintMaterial {
  readonly material: CraftMaterial
  readonly quantity: number
}

export interface CraftBlueprintItem {
  id: number
  category: string
  materials: CraftBlueprintDataMaterial[]
  tools: CraftBlueprintDataTool[]
  result: CraftBlueprintResult
}

export interface CraftBlueprintProps {
  materialFactory: CraftMaterialFactory
  toolFactory: CraftToolFactory
  item: CraftBlueprintItem
}
