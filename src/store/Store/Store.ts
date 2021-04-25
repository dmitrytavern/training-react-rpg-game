import { reaction } from 'mobx'

class Store {
  private readonly controllers: any[]
  private readonly models: any[]

  constructor() {
    this.models = []
    this.controllers = []
  }

  public getController(Controller: any) {
    const obj = this.controllers.find((x) => x instanceof Controller)

    if (obj) return obj

    const depends = Controller.prototype.provides

    const arg = []
    for (const depend of depends) {
      arg.push(this.getModel(depend))
    }

    const newController = new Controller(...arg)

    this.controllers.push(newController)

    console.log(this.controllers)
    return newController
  }

  private getModel(Model: any) {
    const obj = this.models.find((x) => x instanceof Model)

    if (obj) return obj

    const newModel = new Model()

    this.models.push(newModel)

    console.log(this.models)
    return newModel
  }

  public execute(name: string, payload?: any): any {
    return null
  }

  public subscribe(name: string, payload: any, callback: Function): void {
    const fn = () => this.execute(name, payload)

    const reactionDisposer = reaction(fn, (isExists) => {
      callback(isExists, reactionDisposer)
    })

    callback(fn(), reactionDisposer)
  }
}

export default Store
