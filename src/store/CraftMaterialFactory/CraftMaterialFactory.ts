import PlayerInventory from "../PlayerInventory"
import CraftMaterial from "../CraftMaterial"

class CraftMaterialFactory {
	private readonly inventory: PlayerInventory
	private readonly materials: Map<number, CraftMaterial>

	constructor(inventory: PlayerInventory) {
		this.materials = new Map()
		this.inventory = inventory
	}

	public getMaterial(id: number): CraftMaterial {
		const material = this.materials.get(id)
		if (!material) {
			const newMaterial = new CraftMaterial(this.inventory, id)
			this.materials.set(id, newMaterial)
			return newMaterial
		}
		return material
	}
}

export default CraftMaterialFactory
