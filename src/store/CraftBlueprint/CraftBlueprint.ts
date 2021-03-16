import CraftMaterial from "../CraftMaterial"
import CraftMaterialFactory from "../CraftMaterialFactory"

interface CraftBlueprintData {
	id: number
	quantity: number
}

interface CraftBlueprintItem {
	readonly material: CraftMaterial
	readonly quantity: number
}

export interface CraftBlueprintProps {
	id: number
	category: string
	materials: CraftBlueprintData[]
	result: CraftBlueprintData
}

class CraftBlueprint {
	public readonly id: number
	public readonly category: string
	public readonly materials: CraftBlueprintItem[]
	public readonly result: CraftBlueprintData

	private materialFactory: CraftMaterialFactory

	constructor(materialFactory: CraftMaterialFactory, props: CraftBlueprintProps) {
		this.id = props.id
		this.category = props.category
		this.result = props.result
		this.materials = []
		this.materialFactory = materialFactory

		this.initMaterials(props.materials)
	}

	private initMaterials(materials: CraftBlueprintData[]) {
		for (let {id, quantity} of materials) {
			const material = this.materialFactory.getMaterial(id)
			this.materials.push({material, quantity})
		}
	}

	public isAvailable(): boolean {
		let available = true

		for (let {material, quantity} of this.materials) {
			if (!material.isAvailable(quantity)) available = false
		}

		return available
	}
}

export default CraftBlueprint
