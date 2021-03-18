import CraftMaterial from "../CraftMaterial"
import CraftMaterialFactory from "../CraftMaterialFactory"
import CraftTool from "../CraftTool"
import CraftToolFactory from "../CraftToolFactory"

interface CraftBlueprintDataMaterial {
	readonly id: number
	readonly quantity: number
}

interface CraftBlueprintDataTool {
	readonly id: number
}

interface CraftBlueprintResult {
	readonly id: number
	readonly quantity: number
}

interface CraftBlueprintMaterial {
	readonly material: CraftMaterial
	readonly quantity: number
}

export interface CraftBlueprintItem {
	id: number
	category: string
	materials: CraftBlueprintDataMaterial[]
	tools: CraftBlueprintDataTool[]
	result: CraftBlueprintResult
}

export interface CraftBlueprintProps {
	materialFactory: CraftMaterialFactory
	toolFactory: CraftToolFactory
	item: CraftBlueprintItem
}

class CraftBlueprint {
	public readonly id: number
	public readonly category: string
	public readonly materials: CraftBlueprintMaterial[]
	public readonly tools: CraftTool[]
	public readonly result: CraftBlueprintResult

	private materialFactory: CraftMaterialFactory
	private toolFactory: CraftToolFactory

	constructor(props: CraftBlueprintProps) {
		this.materialFactory = props.materialFactory
		this.toolFactory = props.toolFactory

		this.id = props.item.id
		this.category = props.item.category
		this.result = props.item.result
		this.materials = this.initMaterials(props.item.materials)
		this.tools = this.initTools(props.item.tools)
	}

	private initMaterials(materials: CraftBlueprintDataMaterial[]): CraftBlueprintMaterial[] {
		let arr = []
		for (let {id, quantity} of materials) {
			const material = this.materialFactory.getMaterial(id)
			arr.push({material, quantity})
		}
		return arr
	}

	private initTools(tools: CraftBlueprintDataTool[]): CraftTool[] {
		let arr = []
		for (let {id} of tools) {
			const tool = this.toolFactory.getTool(id)
			arr.push(tool)
		}
		return arr
	}

	public isAvailable(): boolean {
		let available = true

		for (let {material, quantity} of this.materials) {
			if (!material.isAvailable(quantity)) available = false
		}

		for (let tool of this.tools) {
			if (!tool.isAvailable()) available = false
		}

		return available
	}
}

export default CraftBlueprint