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
	},
	{
		name: 'QUEST_GROUP_PLAYER_TUTORIAL',
		meta: {
			title: 'Player tutorial',
			description: 'Learn working with player'
		},
		requirements: [
			{action: 'level:check_level', payload: 51}
		],
		quests: [
			'QUEST_GROUP_PLAYER_TUTORIAL:QUEST1',
			'QUEST_GROUP_PLAYER_TUTORIAL:QUEST2',
		]
	}
]

export const quests: QuestPropsData[] = [
	// QUEST_GROUP_INVENTORY_TUTORIAL
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
	},


	// QUEST_GROUP_PLAYER_TUTORIAL
	{
		group: 'QUEST_GROUP_PLAYER_TUTORIAL',
		name: 'QUEST_GROUP_PLAYER_TUTORIAL:QUEST1',
		next: 'QUEST_GROUP_PLAYER_TUTORIAL:QUEST2',
		meta: {
			title: 'Have 1 copper',
			description: 'You need have 1 copper. You should learn, how getting money'
		},
		requirements: [],
		completionRequirements: [
			{action: 'balance:check_money_balance', payload: 1}
		],
		rewards: []
	},
	{
		group: 'QUEST_GROUP_PLAYER_TUTORIAL',
		name: 'QUEST_GROUP_PLAYER_TUTORIAL:QUEST2',
		next: null,
		autocomplete: true,
		meta: {
			title: 'Get 1 copper',
			description: 'You need get copper. You should learn, how getting money'
		},
		requirements: [],
		completionRequirements: [
			{action: 'balance:check_money_getting', payload: 1}
		],
		rewards: []
	},
	{
		group: 'QUEST_GROUP_PLAYER_TUTORIAL',
		name: 'QUEST_GROUP_PLAYER_TUTORIAL:QUEST2',
		next: null,
		meta: {
			title: 'End quest',
			description: 'You are cool!'
		},
		requirements: [],
		completionRequirements: [],
		rewards: []
	}
]