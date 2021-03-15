import {ItemProps} from "../../Items/Item"

import Weapon from './Weapons'
import Armors from './Armors'
import Potions from './Potions'
import Trash from './Trash'

const data: ItemProps[] = [
	...Weapon,
	...Armors,
	...Potions,
	...Trash
]

export default data
