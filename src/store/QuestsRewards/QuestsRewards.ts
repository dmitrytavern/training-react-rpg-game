import QuestsCommander from '../QuestsCommander'
import { QuestAction } from './types'

class QuestsRewards {
  private readonly commands: QuestsCommander

  constructor(questsCommander: QuestsCommander) {
    this.commands = questsCommander
  }

  public getRewards(rewards: QuestAction[]) {
    for (let { action, payload } of rewards) {
      this.commands.action(action, payload)
    }
  }
}

export default QuestsRewards
