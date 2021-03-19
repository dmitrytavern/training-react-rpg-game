interface QuestStepWatcher {
	target: 'level' | 'inventory',
	value: any
}

interface QuestStep {
	name: string
	title: string
	watcher?: QuestStepWatcher
}

interface Quest {
	id: number,
	name: string,
	title: string
	steps: QuestStep[]
}


const data: Quest[] = [
	{
		id: 1,
		name: "QUEST_ACT1_INVENTORY_TUTORIAL",
		title: "Inventory tutorial",
		steps: [
			{
				name: "QUEST_ACT1_INVENTORY_TUTORIAL:STEP1",
				title: 'Get sword',
				watcher: {
					target: 'inventory',
					value: {
						itemId: 1,
						quantity: 1
					}
				}
			}
		]
	}
]

export default data