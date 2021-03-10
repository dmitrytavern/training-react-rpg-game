import {Item} from "../../../../types/Item"

const data: Item[] = [
	{
		id: 1,
		type: 'Weapon',
		name: 'Sword',
		effects: [
			{ name: 'Damage', type: 'damage', operator: '+', value: 50 },
		]
	},
	{
		id: 2,
		type: 'Food',
		name: 'Apple',
		effects: [
			{ name: 'Health', type: 'health', operator: '+', value: 50 },
			{ name: 'Energy', type: 'energy', operator: '+', value: 50 }
		]
	},
	{
		id: 4,
		type: 'Armor',
		name: 'Super legendary Helmet',
		effects: [
			{ name: 'Health', type: 'health', operator: '+', value: 100 }
		]
	},

	{
		id: 5,
		type: 'Armor',
		name: 'Super legendary Armor',
		effects: [
			{ name: 'Health', type: 'health', operator: '+', value: 10 },
			{ name: 'Defense', type: 'defense', operator: '+', value: 50 }
		]
	},

	{
		id: 6,
		type: 'Armor',
		name: 'Super legendary Boots',
		effects: [
			{ name: 'Health', type: 'health', operator: '+', value: 10 },
			{ name: 'Defense', type: 'defense', operator: '+', value: 40 }
		]
	},
]

export default data
