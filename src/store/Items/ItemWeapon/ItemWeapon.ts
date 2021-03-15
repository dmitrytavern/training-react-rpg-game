import Item, {ItemProps} from "../Item"
import {Effect} from "../../../../types/Effect"

export interface ItemWeaponProps extends ItemProps {
	effects: Effect[]
}

class ItemWeapon extends Item {
	public effects: Effect[]

	constructor(props: ItemWeaponProps) {
		super(props)

		this.effects = props.effects
	}
}

export default ItemWeapon
