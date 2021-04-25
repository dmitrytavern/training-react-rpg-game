import { makeAutoObservable } from 'mobx'

class PlayerFavorites {
  private readonly ids: string[]

  constructor() {
    this.ids = []

    makeAutoObservable(this)
  }

  public getItems(): string[] {
    return this.ids
  }

  public setItem(uuid: string): void {
    this.ids.push(uuid)
  }

  public unsetItem(uuid: string): void {
    const index = this.ids.findIndex((x) => x === uuid)
    if (index !== -1) {
      this.ids.splice(index, 1)
    }
  }

  public exists(uuid: string): boolean {
    return this.ids.includes(uuid)
  }
}

export default PlayerFavorites
