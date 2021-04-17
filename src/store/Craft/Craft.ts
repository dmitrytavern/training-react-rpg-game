import { makeAutoObservable } from 'mobx'

import PlayerInventory from '../PlayerInventory'
import CraftBlueprint from '../CraftBlueprint'
import CraftMaterialFactory from '../CraftMaterialFactory'
import CraftToolFactory from '../CraftToolFactory'

import data from './data'

class Craft {
  private readonly inventory: PlayerInventory
  private readonly materialFactory: CraftMaterialFactory
  private readonly toolFactory: CraftToolFactory
  private readonly blueprints: CraftBlueprint[]

  constructor(inventory: PlayerInventory) {
    this.blueprints = []
    this.inventory = inventory
    this.materialFactory = new CraftMaterialFactory(this.inventory)
    this.toolFactory = new CraftToolFactory(this.inventory)

    this.initBlueprints()

    makeAutoObservable(this)
  }

  private initBlueprints() {
    for (let item of data) {
      const blueprint = new CraftBlueprint({
        materialFactory: this.materialFactory,
        toolFactory: this.toolFactory,
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

  public craftBlueprint(blueprintId: number) {
    const blueprint = this.blueprints.find((item) => item.id === blueprintId)

    if (blueprint === undefined) {
      throw new Error('Blueprint not defined!')
    }

    if (!blueprint.isAvailable()) {
      throw new Error('Blueprint not available!')
    }

    for (let { material, quantity } of blueprint.materials) {
      this.inventory.removeItem(material.id, quantity)
    }

    this.inventory.addItem(blueprint.result.id, blueprint.result.quantity)
  }
}

export default Craft
