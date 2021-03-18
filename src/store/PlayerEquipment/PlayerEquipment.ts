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
		this.weapon = new PlayerEquipmentSlot('weapon')
		this.leftRingSlot = new PlayerEquipmentSlot('armor', 'Armor:Ring')
		this.rightRingSlot = new PlayerEquipmentSlot('armor', 'Armor:Ring')
		this.waistSlot = new PlayerEquipmentSlot('armor', 'Armor:Waist')
		this.helmetSlot = new PlayerEquipmentSlot('armor', 'Armor:Helmet')
		this.armorSlot = new PlayerEquipmentSlot('armor', 'Armor:Armor')
		this.armsSlot = new PlayerEquipmentSlot('armor', 'Armor:Arms')
		this.feetSlot = new PlayerEquipmentSlot('armor', 'Armor:Feet')
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
