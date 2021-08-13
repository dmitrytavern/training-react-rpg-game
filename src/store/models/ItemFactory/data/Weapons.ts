import { ItemProps } from '../../Item/types'

const weapons: ItemProps<'Weapon'>[] = [
  {
    id: 1,
    type: 'Weapon',
    category: 'Weapon:Sword',
    meta: {
      name: 'Sword',
      quality: 'common',
    },
    parameters: {
      level: 1,
      effects: [{ name: 'Damage', type: 'damage', operator: '+', value: 50 }],
    },
    settings: {
      canSell: true,
      unique: true,
    },
  },
  {
    id: 11,
    type: 'Weapon',
    category: 'Weapon:Sword',
    meta: {
      name: 'Super Sword',
      quality: 'common',
    },
    parameters: {
      level: 1,
      effects: [{ name: 'Damage', type: 'damage', operator: '+', value: 50 }],
    },
    settings: {
      canSell: true,
      unique: true,
    },
  },
]

export default weapons
