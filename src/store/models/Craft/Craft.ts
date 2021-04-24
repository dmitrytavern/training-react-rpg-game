import { makeAutoObservable } from 'mobx'

import CraftBlueprint from '../CraftBlueprint'

import data from './data'

class Craft {
  private readonly blueprints: CraftBlueprint[]

  constructor() {
    this.blueprints = []

    this.initBlueprints()

    makeAutoObservable(this)
  }

  private initBlueprints() {
    for (let item of data) {
      const blueprint = new CraftBlueprint({
        item: item,
      })
      this.blueprints.push(blueprint)
    }
  }

  public getBlueprints(category?: string): CraftBlueprint[] {
    if (category && category !== 'all') {
      return this.blueprints.filter((x) => x.category === category)
    }
    return this.blueprints
  }

  public getBlueprint(blueprintId: string): CraftBlueprint | undefined {
    return this.blueprints.find((item) => item.id === blueprintId)
  }
}

export default Craft
