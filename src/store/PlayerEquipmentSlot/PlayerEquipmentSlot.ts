import {makeAutoObservable} from 'mobx'
import ItemWeapon from "../Items/ItemWeapon"
import ItemArmor from "../Items/ItemArmor"

class PlayerEquipmentSlot<T extends ItemArmor | ItemWeapon> {
	private equipment: T | undefined

	constructor() {
		makeAutoObservable(this)
	}

	public getName(): string {
		return this.equipment?.name || ''
	}

	public getEquipment(): T | undefined {
		return this.equipment
	}

	public setEquipment(item: T): void {
		this.equipment = item
	}

	public unsetEquipment() {
		this.equipment = undefined
	}

	public getEffects(): Array<any> {
		return this.equipment?.effects || []
	}

	public existsEquipment(): boolean {
		return !!this.equipment
	}
}

export default PlayerEquipmentSlot
