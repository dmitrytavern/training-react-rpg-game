import Commander from '../../Store'
import { commandTypes, commandAction } from '../../Store/types'

class QuestsRewards {
  private commands: Commander | undefined

  public init(commander: Commander) {
    this.commands = commander
  }

  public getRewards<T extends commandTypes>(rewards: commandAction<T>[]) {
    if (!this.commands) throw new Error('Commander not found!')

    for (let { action, payload } of rewards) {
      this.commands.execute(action, payload)
    }
  }
}

export default QuestsRewards
