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
		group: 'QUEST_GROUP_INVENTORY_TUTORIAL',
		name: 'QUEST_GROUP_INVENTORY_TUTORIAL:QUEST1',
		next: 'QUEST_GROUP_INVENTORY_TUTORIAL:QUEST2',
		meta: {
			title: 'Get sword',
			description: 'You can buy sword in shop'
		},
		requirements: [],
		completionRequirements: [
			{
				action: 'inventory:check_item',
				payload: {itemId: 1, quantity: 1}
			}
		],
		rewards: [
			{
				action: 'inventory:remove_item',
				payload: {itemId: 1, quantity: 1}
			}
		]
	},

	{
		group: 'QUEST_GROUP_INVENTORY_TUTORIAL',
		name: 'QUEST_GROUP_INVENTORY_TUTORIAL:QUEST2',
		next: null,
		meta: {
			title: 'End quest',
			description: 'You got sword. Now you need to end quest and get your rewards.'
		},
		requirements: [],
		completionRequirements: [],
		rewards: [
			{
				action: 'level:add_experience',
				payload: 15000
			},
			{
				action: 'inventory:add_item',
				payload: {itemId: 201, quantity: 10}
			}
		]
	}
]