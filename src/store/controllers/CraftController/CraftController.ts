import Controller from '../Controller'
import CraftBlueprint from '../../models/CraftBlueprint'
import Item from '../../models/Item'

type CraftControllerContext = 'playerInventory' | 'craft'

class CraftController extends Controller<CraftControllerContext> {
  public getBlueprints(category?: string): CraftBlueprint[] {
    return this.context.craft.getBlueprints(category)
  }

  public checkMaterialAvailable(id: number, quantity: number): boolean {
    return this.context.playerInventory.existsItemById(id, quantity)
  }

  public checkToolAvailable(id: number): boolean {
    return this.context.playerInventory.existsItemById(id)
  }

  public create(blueprintId: string): Item<any>[] {
    const context = this.context

    const blueprint = context.craft.getBlueprint(blueprintId)

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
        context.playerInventory.removeItemById(+id, +quantity)
      }

      for (const item of blueprint.result) {
        const [id, quantity] = item.split(':')

        const _item = context.playerInventory.addItem(+id, +quantity)

        arr.push(_item)
      }

      return arr
    } else {
      throw new Error(`Material or tool is not available. Materials: ${material}, tools: ${tool}`)
    }
  }
}

export default CraftController
