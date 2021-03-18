import PlayerInventory from "../PlayerInventory"
import CraftTool from "../CraftTool"

class CraftToolFactory {
	private readonly inventory: PlayerInventory
	private readonly tools: Map<number, CraftTool>

	constructor(inventory: PlayerInventory) {
		this.tools = new Map()
		this.inventory = inventory
	}

	public getTool(id: number): CraftTool {
		const material = this.tools.get(id)
		if (!material) {
			const newMaterial = new CraftTool(this.inventory, id)
			this.tools.set(id, newMaterial)
			return newMaterial
		}
		return material
	}
}

export default CraftToolFactory
