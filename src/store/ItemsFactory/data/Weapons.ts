import {ItemWeaponProps} from "../../Items/ItemWeapon"

const weapons: ItemWeaponProps[] = [
	{
		id: 1,
		name: 'Sword',
		type: 'weapon',
		category: 'swords',
		quality: 'common',
		effects: [
			{ name: 'Damage', type: 'damage', operator: '+', value: 50 },
		]
	},
	{
		id: 11,
		name: 'Super Sword',
		type: 'weapon',
		category: 'swords',
		quality: 'common',
		effects: [
			{ name: 'Damage', type: 'damage', operator: '+', value: 50 },
		]
	},
]

export default weapons
