import Controller from '../Controller'
import PlayerInventory from '../../models/PlayerInventory'
import Craft from '../../models/Craft'

import CraftBlueprint from '../../models/CraftBlueprint'
import Item from '../../models/Item'

@Controller([PlayerInventory, Craft])
class CraftController {
  constructor(private playerInventory: PlayerInventory, private craft: Craft) {}

  public getBlueprints(category?: string): CraftBlueprint[] {
    return this.craft.getBlueprints(category)
  }

  public checkBlueprintAvailable(id: number): boolean {
    const blueprint = this.craft.getBlueprint(id + '')

    if (!blueprint) {
      throw new Error('Blueprint not found')
    }

    for (const item of blueprint.materials) {
      const [id, quantity] = item.split(':')
      if (!this.checkMaterialAvailable(+id, +quantity)) return false
    }

    for (const toolId of blueprint.tools) {
      if (!this.checkToolAvailable(+toolId)) return false
    }

    return true
  }

  public checkMaterialAvailable(id: number, quantity: number): boolean {
    return this.playerInventory.existsItemById(id, quantity)
  }

  public checkToolAvailable(id: number): boolean {
    return this.playerInventory.existsItemById(id)
  }

  public create(blueprintId: string): Item<any>[] {
    const blueprint = this.craft.getBlueprint(blueprintId)

    if (blueprint === undefined) {
      throw new Error('Blueprint not defined!')
    }

    let material = true
    for (const item of blueprint.materials) {
      const [id, quantity] = item.split(':')
      if (!this.checkMaterialAvailable(+id, +quantity)) material = false
    }

    let tool = true
    for (const toolId of blueprint.tools) {
      if (!this.checkToolAvailable(+toolId)) tool = false
    }

    if (material && tool) {
      const arr = []

      for (const item of blueprint.materials) {
        const [id, quantity] = item.split(':')
        this.playerInventory.removeItemById(+id, +quantity)
      }

      for (const item of blueprint.result) {
        const [id, quantity] = item.split(':')

        const _item = this.playerInventory.addItem(+id, +quantity)

        arr.push(_item)
      }

      return arr
    } else {
      throw new Error(`Material or tool is not available. Materials: ${material}, tools: ${tool}`)
    }
  }
}

export default CraftController
