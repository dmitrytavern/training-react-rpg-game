import { observer } from 'mobx-react-lite'
import ItemsFactory from "./store/ItemsFactory"
import CraftBlueprint from "./store/CraftBlueprint"
import {useCraftStore} from "./contexts/craftStoreContext"
import {usePlayerStore} from "./contexts/playerStoreContext";


const itemsFactory = new ItemsFactory()


const AppCraftBlueprintMaterial = (props: {id: number, quantity: number, available: boolean}) => {
	const {id, quantity, available} = props

	const data = itemsFactory.getItemData(id)

	const opacity = available ? 1 : 0.5
	return (
		<span style={{opacity}}>{data.name} x{quantity}</span>
	)
}

interface BlueprintProps {
	id: CraftBlueprint["id"]
	materials: CraftBlueprint["materials"]
	result: CraftBlueprint["result"]
	available: boolean
}

const AppCraftBlueprint = (props: BlueprintProps) => {
	const craft = useCraftStore()
	const {id, materials, result, available} = props

	const resultData = itemsFactory.getItemData(result.id)

	const onCraft = () => {
		craft.craftBlueprint(id)
	}

	const opacity = available ? 1 : 0.5
	return (
		<li>
			{materials.map((item, i) => (
				<span key={i}>
					{i > 0 && " X "}
					<AppCraftBlueprintMaterial id={item.material.id} quantity={item.quantity} available={item.material.isAvailable()} />
				</span>
			))}

			<span> = </span>
			<span style={{opacity}}>{resultData.name} x{result.quantity}</span>

			|

			<button onClick={onCraft} disabled={!available}>Craft this shit!</button>
		</li>
	)
}

const AppCraft = () => {
	const player = usePlayerStore()
	const craft = useCraftStore()

	const addCommonWood = () => {
		player.inventory.addItem(itemsFactory.create(101), 1)
	}

	const addCommonIron = () => {
		player.inventory.addItem(itemsFactory.create(102), 1)
	}

	return (
		<div>
			<h2>Craft</h2>

			<div>
				<button onClick={addCommonWood}>Add 1 Common Wood</button>
				<button onClick={addCommonIron}>Add 1 Common Iron</button>
			</div>

			<ul>
				{craft.getBlueprints().map((item, i) => (
					<AppCraftBlueprint
						key={i}
						id={item.id}
						materials={item.materials}
						result={item.result}
						available={item.isAvailable()}
					/>
				))}
			</ul>
		</div>
	)
}

export default observer(AppCraft)
