import {Effect} from "../../../types/Effect"
import PlayerEquipmentSlot from "../PlayerEquipmentSlot"

class PlayerEquipment {
	public weapon: PlayerEquipmentSlot
	public leftRingSlot: PlayerEquipmentSlot
	public rightRingSlot: PlayerEquipmentSlot
	public waistSlot: PlayerEquipmentSlot
	public helmetSlot: PlayerEquipmentSlot
	public armorSlot: PlayerEquipmentSlot
	public armsSlot: PlayerEquipmentSlot
	public feetSlot: PlayerEquipmentSlot

	constructor() {
		this.weapon = new PlayerEquipmentSlot()
		this.leftRingSlot = new PlayerEquipmentSlot()
		this.rightRingSlot = new PlayerEquipmentSlot()
		this.waistSlot = new PlayerEquipmentSlot()
		this.helmetSlot = new PlayerEquipmentSlot()
		this.armorSlot = new PlayerEquipmentSlot()
		this.armsSlot = new PlayerEquipmentSlot()
		this.feetSlot = new PlayerEquipmentSlot()
	}

	public getEffects(): Effect[] {
		return [
			...this.weapon.getEffects(),
			...this.leftRingSlot.getEffects(),
			...this.rightRingSlot.getEffects(),
			...this.waistSlot.getEffects(),
			...this.helmetSlot.getEffects(),
			...this.armorSlot.getEffects(),
			...this.armsSlot.getEffects(),
			...this.feetSlot.getEffects(),
		]
	}
}

export default PlayerEquipment
