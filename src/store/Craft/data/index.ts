import {CraftBlueprintProps} from "../../CraftBlueprint"

const data: CraftBlueprintProps[] = [
	{
		id: 1,
		category: 'smithing',
		materials: [
			{id: 101, quantity: 1},
			{id: 102, quantity: 1}
		],
		result: {
			id: 1,
			quantity: 1
		}
	},
	{
		id: 2,
		category: 'smithing',
		materials: [
			{id: 101, quantity: 1},
			{id: 102, quantity: 1},
			{id: 1, quantity: 1}
		],
		result: {
			id: 11,
			quantity: 1
		}
	},
	{
		id: 3,
		category: 'alchemy',
		materials: [
			{id: 103, quantity: 1},
			{id: 104, quantity: 1}
		],
		result: {
			id: 201,
			quantity: 1
		}
	},
]

export default data