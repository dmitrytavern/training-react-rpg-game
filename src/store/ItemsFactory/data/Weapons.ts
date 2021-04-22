import { ItemWeaponProps } from '../../Items/ItemWeapon/types'

const weapons: ItemWeaponProps[] = [
  {
    id: 1,
    type: 'Weapon',
    category: 'Weapon:Sword',
    meta: {
      name: 'Sword',
      quality: 'common',
    },
    effects: [{ name: 'Damage', type: 'damage', operator: '+', value: 50 }],
  },
  {
    id: 11,
    type: 'Weapon',
    category: 'Weapon:Sword',
    meta: {
      name: 'Super Sword',
      quality: 'common',
    },
    effects: [{ name: 'Damage', type: 'damage', operator: '+', value: 50 }],
  },
]

export default weapons
