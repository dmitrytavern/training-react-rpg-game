export type QuestStatus = 'unlocked' | 'active' | 'completed' | 'done'

export interface QuestAction {
	action: string
	payload: any
}

export interface QuestMeta {
	title: string
	description: string
}

export interface QuestProps {
	id: number
	meta: QuestMeta
	requirements: QuestAction[]
	completionRequirements: QuestAction[]
	rewards: QuestAction[]
}