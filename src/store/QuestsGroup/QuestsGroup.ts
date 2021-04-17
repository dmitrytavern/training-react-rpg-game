import { makeAutoObservable, reaction } from 'mobx'
import Quest from '../Quest'

import { QuestsGroupStatus, QuestsGroupMeta, QuestsGroupProps } from './types'

class QuestsGroup {
  public readonly id: number
  public readonly meta: QuestsGroupMeta
  public readonly quests: Quest[]
  private status: QuestsGroupStatus

  constructor(data: QuestsGroupProps) {
    this.id = data.id
    this.meta = data.meta
    this.quests = data.quests
    this.status = 'unlocked'

    this.initReactions()
    makeAutoObservable(this)
  }

  private initReactions() {
    const quests = this.quests

    const disposerFirstQuest = reaction(
      () => quests[0].getStatus() === 'active',
      (result) => {
        if (result) {
          this.setStatus('active')
          disposerFirstQuest()
        }
      }
    )

    const disposerLastQuest = reaction(
      () => quests[quests.length - 1].getStatus(),
      (result) => {
        if (result === 'active') this.setStatus('active')
        if (result === 'completed') this.setStatus('completed')
        if (result === 'done') {
          this.setStatus('done')
          disposerLastQuest()
        }
      }
    )
  }

  private setStatus(name: QuestsGroupStatus) {
    this.status = name
  }

  public getStatus(): string {
    return this.status
  }

  public getActiveQuest(): Quest | undefined {
    return this.quests.find((x) => x.getStatus() === 'active' || x.getStatus() === 'completed')
  }
}

export default QuestsGroup
