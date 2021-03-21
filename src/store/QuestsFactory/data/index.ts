import {QuestsGroupData} from "../../QuestsGroup"
import {QuestPropsData} from "../../Quest"

interface QuestsGroup extends Omit<QuestsGroupData, 'quests'> {
	quests: string[]
}

export const groups: QuestsGroup[] = [
	{
		name: 'QUEST_GROUP_INVENTORY_TUTORIAL',
		meta: {
			title: 'Inventory tutorial',
			description: 'Learn working with inventory'
		},
		requirements: [],
		quests: [
			'QUEST_GROUP_INVENTORY_TUTORIAL:QUEST1',
			'QUEST_GROUP_INVENTORY_TUTORIAL:QUEST2',
		]
	}
]

export const quests: QuestPropsData[] = [
	{
		name: 'QUEST_GROUP_INVENTORY_TUTORIAL:QUEST1',
		meta: {
			title: 'Get sword',
			description: 'You can buy sword in shop'
		},
		requirements: [
			{action: 'quest:check_group_started', payload: 'QUEST_GROUP_INVENTORY_TUTORIAL'}
		],
		completionRequirements: [
			{
				action: 'inventory:check_item',
				payload: {itemId: 1, quantity: 1}
			}
		],
		rewards: [
			{
				action: 'inventory:add_item',
				payload: {itemId: 1, quantity: 1}
			}
		]
	},

	{
		name: 'QUEST_GROUP_INVENTORY_TUTORIAL:QUEST2',
		meta: {
			title: 'End quest',
			description: 'You got sword. Now you need to end quest and get your rewards.'
		},
		requirements: [
			{action: 'quest:check_quest_completed', payload: 'QUEST_GROUP_INVENTORY_TUTORIAL:QUEST1'}
		],
		completionRequirements: [],
		rewards: [
			{
				action: 'inventory:add_item',
				payload: {itemId: 1, quantity: 1}
			}
		]
	}
]