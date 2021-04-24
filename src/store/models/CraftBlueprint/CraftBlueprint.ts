import { CraftBlueprintProps } from './types'

class CraftBlueprint {
  public readonly id: string
  public readonly category: string
  public readonly materials: string[]
  public readonly tools: string[]
  public readonly result: string[]

  constructor(props: CraftBlueprintProps) {
    this.id = props.item.id
    this.category = props.item.category
    this.result = props.item.result
    this.materials = props.item.materials
    this.tools = props.item.tools
  }
}

export default CraftBlueprint
