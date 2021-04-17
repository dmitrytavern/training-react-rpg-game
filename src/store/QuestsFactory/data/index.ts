import {QuestsGroupProps} from "../../QuestsGroup"
import {QuestProps} from "../../Quest"

interface QuestsGroup extends Omit<QuestsGroupProps, 'quests'> {
	quests: QuestProps[]
}

const groups: QuestsGroup[] = [
	{
		id: 1,
		meta: {
			title: 'Inventory tutorial',
			description: 'Learn working with inventory'
		},
		quests: [
			{
				id: 1,
				meta: {
					title: 'Get sword',
					description: 'You can buy sword in shop'
				},
				requirements: [],
				completionRequirements: [{action: 'inventory:check_item', payload: {itemId: 1, quantity: 1}}],
				rewards: [{action: 'inventory:remove_item', payload: {itemId: 1, quantity: 1}}]
			},
			{
				id: 2,
				meta: {
					title: 'End quest',
					description: 'You got sword. Now you need to end quest and get your rewards.'
				},
				requirements: [],
				completionRequirements: [],
				rewards: [
					{action: 'level:add_experience', payload: 15000},
					{action: 'inventory:add_item', payload: {itemId: 201, quantity: 10}}
				]
			},
		]
	},
	{
		id: 2,
		meta: {
			title: 'Player tutorial',
			description: 'Learn working with player'
		},
		quests: [
			{
				id: 1,
				meta: {
					title: 'Have 1 copper',
					description: 'You need have 1 copper. You should learn, how getting money'
				},
				requirements: [{action: 'level:check_level', payload: 51}],
				completionRequirements: [{action: 'balance:check_money_balance', payload: 1}],
				rewards: []
			}
		]
	}
]

export default groups