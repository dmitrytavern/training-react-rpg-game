import React, {useState} from "react"
import ItemsFactory from "./store/ItemsFactory"
import CraftBlueprint from "./store/CraftBlueprint"
import { observer } from 'mobx-react-lite'
import { useCraftStore } from "./contexts/craftStoreContext"
import { usePlayerStore } from "./contexts/playerStoreContext"


const itemsFactory = new ItemsFactory()


const AppCraftBlueprintMaterial = observer((props: {id: number, quantity: number, available: boolean}) => {
	const {id, quantity, available} = props

	const data = itemsFactory.getItemData(id)

	const opacity = available ? 1 : 0.5
	return (
		<span style={{opacity}}>{data.name} x{quantity}</span>
	)
})

const AppCraftBlueprintTool = observer((props: {id: number, available: boolean}) => {
	const {id, available} = props

	const data = itemsFactory.getItemData(id)

	const opacity = available ? 1 : 0.5
	return (
		<span style={{opacity}}>{data.name}</span>
	)
})

interface BlueprintProps {
	id: CraftBlueprint["id"]
	materials: CraftBlueprint["materials"]
	tools: CraftBlueprint["tools"]
	result: CraftBlueprint["result"]
	available: boolean
}

const AppCraftBlueprint = observer((props: BlueprintProps) => {
	const craft = useCraftStore()
	const {id, materials, tools, result, available} = props

	const resultData = itemsFactory.getItemData(result.id)

	const onCraft = () => {
		craft.craftBlueprint(id)
	}

	const opacity = available ? 1 : 0.5
	return (
		<li>
			<span>
				<div>
					{materials.map((item, i) => (
						<span key={i}>
							{i > 0 && " X "}
							<AppCraftBlueprintMaterial id={item.material.id} quantity={item.quantity} available={item.material.isAvailable()} />
						</span>
					))}

					<span> = </span>

					<span style={{opacity}}>{resultData.name} x{result.quantity}</span>
				</div>
				{tools.length > 0 && <div>
					Tools:
					{tools.map((tool, i) => (
						<span key={i}>
							{i > 0 && ", "}
							<AppCraftBlueprintTool id={tool.id} available={tool.isAvailable()}/>
						</span>
					))}
				</div>}
			</span>


			|

			<button onClick={onCraft} disabled={!available}>Craft this shit!</button>
		</li>
	)
})

const AppCraft = () => {
	const player = usePlayerStore()
	const craft = useCraftStore()

	const [category, setCategory] = useState('all')

	const addCommonHammer = () => {
		player.inventory.addItem(itemsFactory.create(301), 1)
	}

	const addCommonWood = () => {
		player.inventory.addItem(itemsFactory.create(101), 1)
	}

	const addCommonIron = () => {
		player.inventory.addItem(itemsFactory.create(102), 1)
	}

	const addCommonMandrake = () => {
		player.inventory.addItem(itemsFactory.create(103), 1)
	}

	const addCommonCelandine = () => {
		player.inventory.addItem(itemsFactory.create(104), 1)
	}

	const changeHandler = (event: React.SyntheticEvent) => {
		let target = event.target as HTMLInputElement
		setCategory(target.value)
	}

	return (
		<div>
			<h2>Craft</h2>

			<div>
				<button onClick={addCommonHammer}>Add 1 Common Hammer</button>
				<button onClick={addCommonWood}>Add 1 Common Wood</button>
				<button onClick={addCommonIron}>Add 1 Common Iron</button>
				<button onClick={addCommonMandrake}>Add 1 Common Mandrake</button>
				<button onClick={addCommonCelandine}>Add 1 Common Celandine</button>
			</div>

			<div>
				<select value={category} onChange={changeHandler}>
					<option value="all">All</option>
					<option value="smithing">Smithing</option>
					<option value="alchemy">Alchemy</option>
				</select>
			</div>

			<ul>
				{craft.getBlueprints(category).map((item, i) => (
					<AppCraftBlueprint
						key={i}
						id={item.id}
						materials={item.materials}
						tools={item.tools}
						result={item.result}
						available={item.isAvailable()}
					/>
				))}
			</ul>
		</div>
	)
}

export default observer(AppCraft)
