import { ItemProps } from '../../Items/Item'

import Weapon from './Weapons'
import Armors from './Armors'
import Potions from './Potions'
import Materials from './Materials'
import Tools from './Tools'
import Trash from './Trash'

const data: ItemProps[] = [...Weapon, ...Armors, ...Potions, ...Materials, ...Tools, ...Trash]

export default data
