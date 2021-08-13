import Controller from '../Controller'

import Quests from '../../models/Quests'
import { QuestsGroupStatus } from '../../models/QuestsGroup/types'

@Controller([Quests])
class QuestsController {
  constructor(private quests: Quests) {}

  public getQuestGroups(status: QuestsGroupStatus) {
    switch (status) {
      case 'active':
        return this.quests.getActiveQuestGroups()
      case 'completed':
        return this.quests.getCompletedQuestGroups()
      case 'done':
        return this.quests.getDoneQuestGroups()
    }
  }

  public getQuestGroup(id: number) {
    return this.quests.getQuestGroup(id)
  }
}

export default QuestsController
