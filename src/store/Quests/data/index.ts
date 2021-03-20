import { QuestPropsData } from "../../Quest"

const data: QuestPropsData[] = [
	{
		id: 1,
		name: "QUEST_ACT1_INVENTORY_TUTORIAL",
		title: "Inventory tutorial",
		content: 'Hello',
		steps: [
			{
				name: "QUEST_ACT1_INVENTORY_TUTORIAL:STEP1",
				title: 'Get sword',
				description: 'Check',
				rewards: null,
				requirements: [
					{
						action: 'inventory:check_item',
						payload: {
							itemId: 1,
							quantity: 1
						}
					}
				]
			},
			{
				name: "QUEST_ACT1_INVENTORY_TUTORIAL:STEP2",
				title: 'Cool player!',
				description: 'Get your rewards',
				rewards: [
					{
						action: 'inventory:add_item',
						payload: {
							itemId: 1,
							quantity: 1
						}
					},
					{
						action: 'level:add_experience',
						payload: 40
					}
				],
				requirements: null
			}
		]
	}
]

export default data