import { ItemPotionProps } from '../../Items/ItemPotion'

const data: ItemPotionProps[] = [
  {
    id: 201,
    name: 'Super Health Potion',
    type: 'potion',
    category: 'Potion:Health',
    quality: 'common',
    effects: [{ name: 'Health', type: 'health', operator: '+', value: 100 }],
  },
]

export default data
