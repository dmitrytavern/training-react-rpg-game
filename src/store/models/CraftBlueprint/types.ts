export interface CraftBlueprintItem {
  id: string
  category: string
  materials: string[]
  tools: string[]
  result: string[]
}

export interface CraftBlueprintProps {
  item: CraftBlueprintItem
}
