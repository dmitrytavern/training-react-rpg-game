import Item, {ItemProps} from "../Item"
import {Effect} from "../../../../types/Effect"

export interface ItemWeaponProps extends ItemProps {
	readonly effects: Effect[]
}

class ItemWeapon extends Item {
	public readonly effects: Effect[]

	constructor(props: ItemWeaponProps) {
		super(props)

		this.effects = props.effects
	}
}

export default ItemWeapon
