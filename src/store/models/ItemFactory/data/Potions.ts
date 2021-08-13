import { ItemProps } from '../../Item/types'

const data: ItemProps<'Potion'>[] = [
  {
    id: 201,
    type: 'Potion',
    category: 'Potion:Health',
    meta: {
      name: 'Super Health Potion',
      quality: 'common',
    },
    parameters: {
      effects: [{ name: 'Health', type: 'health', operator: '+', value: 100 }],
    },
    settings: {
      unique: false,
    },
  },
]

export default data
