import { makeAutoObservable, IReactionDisposer } from 'mobx'

import Commander from '../Commander'

import { QuestsRequirementsData } from './types'
import { commandTypes, commandAction } from '../Commander/types'

class QuestsRequirements {
  private readonly data: QuestsRequirementsData
  private commands: Commander | undefined

  constructor() {
    this.data = {}

    makeAutoObservable(this)
  }

  public init(commander: Commander) {
    this.commands = commander
  }

  public subscribe<T extends commandTypes>(
    name: string,
    requirements: commandAction<T>[],
    callback: Function
  ) {
    if (!this.commands) throw new Error('Commander not found!')

    this.data[name] = {
      values: [],
      disposers: [],
    }

    const data = this.data[name]
    for (let i = 0; i < requirements.length; i++) {
      const { action, payload } = requirements[i]

      data.values.push(false)

      this.commands.subscribe(action, payload, (value: boolean, disposer: IReactionDisposer) => {
        data.values.splice(i, 1, value)
        data.disposers.splice(i, 1, disposer)
        callback(this.check(name))
      })
    }

    if (data.values.length === 0) callback(true)
  }

  public unsubscribe(name: string) {
    this.data[name].disposers.map((disposer) => disposer())
    delete this.data[name]
  }

  public checkRequirements<T extends commandTypes>(requirements: commandAction<T>[]): boolean {
    if (!this.commands) throw new Error('Commander not found!')

    for (let i = 0; i < requirements.length; i++) {
      const { action, payload } = requirements[i]
      const res = this.commands.execute(action, payload)
      if (!res) return false
    }
    return true
  }

  private check(name: string): boolean {
    const data = this.data[name]

    if (!data) {
      throw new Error('Data not found: ' + name)
    }

    const arr = data.values
    for (let i = 0; i < arr.length; i++) {
      if (!arr[i]) return false
    }
    return true
  }
}

export default QuestsRequirements
