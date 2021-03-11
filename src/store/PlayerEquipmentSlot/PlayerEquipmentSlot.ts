import {makeAutoObservable} from 'mobx'
import {Item} from "../../../types/Item"

class PlayerEquipmentSlot {
	private equipment: Item | undefined

	constructor() {
		makeAutoObservable(this)
	}

	public getName(): string {
		return this.equipment?.name || ''
	}

	public getEquipment(): Item | undefined {
		return this.equipment
	}

	public setEquipment(item: Item): void {
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
