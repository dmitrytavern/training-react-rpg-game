import { reaction } from 'mobx'
import * as QuestsCommands from '../QuestsCommands'

import { Actions, QuestsCommanderContext } from './types'

class QuestsCommander {
  private readonly context: QuestsCommanderContext
  private readonly actions: Actions<void>
  private readonly checkers: Actions<boolean>

  constructor(props: QuestsCommanderContext) {
    this.context = props
    this.actions = QuestsCommands.actions
    this.checkers = QuestsCommands.checkers
  }

  public action(name: string, payload?: any): void {
    const action = this.actions[name]

    if (!action) {
      throw new Error('Not found action: ' + name)
    }

    action.call(null, this.context, payload)
  }

  public subscribe(name: string, payload: any, callback: Function) {
    const checker = this.checkers[name]
    const fn = () => this.check(name, payload)

    if (!checker) {
      throw new Error('Not found checker: ' + name)
    }

    const reactionDisposer = reaction(
      () => fn(),
      (isExists) => {
        callback(isExists, reactionDisposer)
      }
    )

    callback(fn(), reactionDisposer)
  }

  public check(name: string, payload: any): boolean {
    const checker = this.checkers[name]

    if (!checker) {
      throw new Error('Not found checker: ' + name)
    }

    return checker.call(null, this.context, payload)
  }
}

export default QuestsCommander
