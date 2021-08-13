import { ItemProps } from '../../Item/types'

const craftMaterial: ItemProps<'CraftMaterial'>[] = [
  {
    id: 101,
    type: 'CraftMaterial',
    category: 'CraftMaterial:Wood',
    meta: {
      name: 'Common Wood',
      quality: 'common',
    },
    settings: {
      unique: false,
    },
    parameters: {},
  },
  {
    id: 102,
    type: 'CraftMaterial',
    category: 'CraftMaterial:Iron',
    meta: {
      name: 'Common Iron',
      quality: 'common',
    },
    settings: {
      unique: false,
    },
    parameters: {},
  },
  {
    id: 103,
    type: 'CraftMaterial',
    category: 'CraftMaterial:Herb',
    meta: {
      name: 'Common Mandrake',
      quality: 'common',
    },
    settings: {
      unique: false,
    },
    parameters: {},
  },
  {
    id: 104,
    type: 'CraftMaterial',
    category: 'CraftMaterial:Herb',
    meta: {
      name: 'Common Celandine',
      quality: 'common',
    },
    settings: {
      unique: false,
    },
    parameters: {},
  },
]

export default craftMaterial
