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
			{ name: 'Health', type: 'maxHealth', operator: '+', value: 100 },
			{ name: 'Energy', type: 'maxEnergy', operator: '+', value: 40 }
		]
	},
	{
		id: 5,
		type: 'Armor',
		name: 'Super legendary Armor',
		effects: [
			{ name: 'Health', type: 'maxHealth', operator: '+', value: 10 },
			{ name: 'Defense', type: 'defense', operator: '+', value: 50 }
		]
	},
	{
		id: 7,
		type: 'Armor',
		name: 'Super legendary Arms',
		effects: [
			{ name: 'Health', type: 'maxHealth', operator: '+', value: 10 },
			{ name: 'Defense', type: 'defense', operator: '+', value: 40 }
		]
	},
	{
		id: 6,
		type: 'Armor',
		name: 'Super legendary Feet',
		effects: [
			{ name: 'Health', type: 'maxHealth', operator: '+', value: 10 },
			{ name: 'Defense', type: 'defense', operator: '+', value: 40 }
		]
	},
	{
		id: 8,
		type: 'Armor',
		name: 'Super legendary Left Ring',
		effects: [
			{ name: 'Health', type: 'maxHealth', operator: '+', value: 10 },
			{ name: 'Defense', type: 'defense', operator: '+', value: 40 }
		]
	},
	{
		id: 9,
		type: 'Armor',
		name: 'Super legendary Right Ring',
		effects: [
			{ name: 'Health', type: 'maxHealth', operator: '+', value: 10 },
			{ name: 'Defense', type: 'defense', operator: '+', value: 40 }
		]
	},
	{
		id: 10,
		type: 'Armor',
		name: 'Super legendary Waist',
		effects: [
			{ name: 'Health', type: 'maxHealth', operator: '+', value: 10 },
			{ name: 'Defense', type: 'defense', operator: '+', value: 40 }
		]
	},
]

export default data