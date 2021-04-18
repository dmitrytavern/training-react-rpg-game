import { reaction } from 'mobx'
import { CommanderContext, commandTypes, commandTypePayload, commandTypeReturn } from './types'

import commands from './commands'

class Commander {
  private readonly context: CommanderContext
  private readonly actions

  constructor(props: CommanderContext) {
    this.context = props
    this.actions = commands
  }

  public execute<T extends commandTypes>(
    name: T,
    payload?: commandTypePayload<T>
  ): commandTypeReturn<T> {
    this.checkFunction(name)

    // @ts-ignore
    return this.actions[name](this.context, payload)
  }

  public subscribe<T extends commandTypes>(
    name: T,
    payload: commandTypePayload<T>,
    callback: Function
  ) {
    this.checkFunction(name)

    const fn = () => this.execute(name, payload)

    const reactionDisposer = reaction(fn, (isExists) => {
      callback(isExists, reactionDisposer)
    })

    callback(fn(), reactionDisposer)
  }

  private checkFunction(name: string) {
    if (!this.actions.hasOwnProperty(name)) {
      throw new Error('Not found action: ' + name)
    }
  }
}

export default Commander
