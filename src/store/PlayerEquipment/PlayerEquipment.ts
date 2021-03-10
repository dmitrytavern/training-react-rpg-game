import {Effect} from "../../../types/Effect"
import PlayerEquipmentSlot from "../PlayerEquipmentSlot"

class PlayerEquipment {
	public weapon: PlayerEquipmentSlot
	public helmetSlot: PlayerEquipmentSlot
	public armorSlot: PlayerEquipmentSlot
	public bootsSlot: PlayerEquipmentSlot

	constructor() {
		this.weapon = new PlayerEquipmentSlot()
		this.helmetSlot = new PlayerEquipmentSlot()
		this.armorSlot = new PlayerEquipmentSlot()
		this.bootsSlot = new PlayerEquipmentSlot()
	}

	public getEffects(): Effect[] {
		return [
			...this.weapon.getEffects(),
			...this.helmetSlot.getEffects(),
			...this.armorSlot.getEffects(),
			...this.bootsSlot.getEffects(),
		]
	}
}

export default PlayerEquipment
