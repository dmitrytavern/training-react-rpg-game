import Craft from './Craft'
import CraftBlueprint from '../CraftBlueprint'

interface Context {
  craft?: Craft
}

class Api {
  public static getBlueprints(context: Context, payload?: string): CraftBlueprint[] {
    const craft = context.craft

    if (!craft) {
      throw new Error('Craft is undefined')
    }

    return craft.getBlueprints(payload)
  }

  public static create(context: Context, payload: number) {
    const craft = context.craft

    if (!craft) {
      throw new Error('Craft is undefined')
    }

    craft.craftBlueprint(payload)
  }
}

const CraftApi = {
  'craft:get_blueprints': Api.getBlueprints,
  'craft:create': Api.create,
}

export default CraftApi
