import {ItemArmorProps} from "../../Items/ItemArmor"

const armors: ItemArmorProps[] = [
	{
		id: 4,
		name: 'Super legendary Helmet',
		type: 'armor',
		category: 'Armor:Helmet',
		quality: 'common',
		effects: [
			{ name: 'Health', type: 'maxHealth', operator: '+', value: 100 },
			{ name: 'Energy', type: 'maxEnergy', operator: '+', value: 40 }
		]
	},
	{
		id: 5,
		name: 'Super legendary Armor',
		type: 'armor',
		category: 'Armor:Armor',
		quality: 'common',
		effects: [
			{ name: 'Health', type: 'maxHealth', operator: '+', value: 10 },
			{ name: 'Defense', type: 'defense', operator: '+', value: 50 }
		]
	},
	{
		id: 7,
		name: 'Super legendary Arms',
		type: 'armor',
		category: 'Armor:Arms',
		quality: 'common',
		effects: [
			{ name: 'Health', type: 'maxHealth', operator: '+', value: 10 },
			{ name: 'Defense', type: 'defense', operator: '+', value: 40 }
		]
	},
	{
		id: 6,
		name: 'Super legendary Feet',
		type: 'armor',
		category: 'Armor:Feet',
		quality: 'common',
		effects: [
			{ name: 'Health', type: 'maxHealth', operator: '+', value: 10 },
			{ name: 'Defense', type: 'defense', operator: '+', value: 40 }
		]
	},
	{
		id: 8,
		name: 'Super legendary Left Ring',
		type: 'armor',
		category: 'Armor:Ring',
		quality: 'common',
		effects: [
			{ name: 'Health', type: 'maxHealth', operator: '+', value: 10 },
			{ name: 'Defense', type: 'defense', operator: '+', value: 40 }
		]
	},
	{
		id: 9,
		name: 'Super legendary Right Ring',
		type: 'armor',
		category: 'Armor:Ring',
		quality: 'common',
		effects: [
			{ name: 'Health', type: 'maxHealth', operator: '+', value: 10 },
			{ name: 'Defense', type: 'defense', operator: '+', value: 40 }
		]
	},
	{
		id: 10,
		name: 'Super legendary Waist',
		type: 'armor',
		category: 'Armor:Waist',
		quality: 'common',
		effects: [
			{ name: 'Health', type: 'maxHealth', operator: '+', value: 10 },
			{ name: 'Defense', type: 'defense', operator: '+', value: 40 }
		]
	},
]

export default armors
