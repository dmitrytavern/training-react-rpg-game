import Quest from '../Quest'

export type QuestsGroupStatus = 'unlocked' | 'active' | 'completed' | 'done'

export interface QuestsGroupMeta {
  title: string
  description: string
}

export interface QuestsGroupProps {
  id: number
  meta: QuestsGroupMeta
  quests: Quest[]
}
