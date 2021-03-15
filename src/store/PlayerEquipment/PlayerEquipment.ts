import {Effect} from "../../../types/Effect"
import ItemWeapon from "../Items/ItemWeapon"
import ItemArmor from "../Items/ItemArmor"
import PlayerEquipmentSlot from "../PlayerEquipmentSlot"

class PlayerEquipment {
	public weapon: PlayerEquipmentSlot<ItemWeapon>
	public leftRingSlot: PlayerEquipmentSlot<ItemArmor>
	public rightRingSlot: PlayerEquipmentSlot<ItemArmor>
	public waistSlot: PlayerEquipmentSlot<ItemArmor>
	public helmetSlot: PlayerEquipmentSlot<ItemArmor>
	public armorSlot: PlayerEquipmentSlot<ItemArmor>
	public armsSlot: PlayerEquipmentSlot<ItemArmor>
	public feetSlot: PlayerEquipmentSlot<ItemArmor>

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
