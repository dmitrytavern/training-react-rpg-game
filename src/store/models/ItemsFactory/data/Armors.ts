import { ItemArmorProps } from '../../Items/ItemArmor'

const armors: ItemArmorProps[] = [
  {
    id: 4,
    type: 'Armor',
    category: 'Armor:Helmet',
    meta: {
      name: 'Super legendary Helmet',
      quality: 'common',
    },
    effects: [
      { name: 'Health', type: 'maxHealth', operator: '+', value: 100 },
      { name: 'Energy', type: 'maxEnergy', operator: '+', value: 40 },
    ],
  },
  {
    id: 5,
    type: 'Armor',
    category: 'Armor:Armor',
    meta: {
      name: 'Super legendary Armor',
      quality: 'common',
    },
    effects: [
      { name: 'Health', type: 'maxHealth', operator: '+', value: 10 },
      { name: 'Defense', type: 'defense', operator: '+', value: 50 },
    ],
  },
  {
    id: 7,
    type: 'Armor',
    category: 'Armor:Arms',
    meta: {
      name: 'Super legendary Arms',
      quality: 'common',
    },
    effects: [
      { name: 'Health', type: 'maxHealth', operator: '+', value: 10 },
      { name: 'Defense', type: 'defense', operator: '+', value: 40 },
    ],
  },
  {
    id: 6,
    type: 'Armor',
    category: 'Armor:Feet',
    meta: {
      name: 'Super legendary Feet',
      quality: 'common',
    },
    effects: [
      { name: 'Health', type: 'maxHealth', operator: '+', value: 10 },
      { name: 'Defense', type: 'defense', operator: '+', value: 40 },
    ],
  },
  {
    id: 8,
    type: 'Armor',
    category: 'Armor:Ring',
    meta: {
      name: 'Super legendary Left Ring',
      quality: 'common',
    },
    effects: [
      { name: 'Health', type: 'maxHealth', operator: '+', value: 10 },
      { name: 'Defense', type: 'defense', operator: '+', value: 40 },
    ],
  },
  {
    id: 9,
    type: 'Armor',
    category: 'Armor:Ring',
    meta: {
      name: 'Super legendary Right Ring',
      quality: 'common',
    },
    effects: [
      { name: 'Health', type: 'maxHealth', operator: '+', value: 10 },
      { name: 'Defense', type: 'defense', operator: '+', value: 40 },
    ],
  },
  {
    id: 10,
    type: 'Armor',
    category: 'Armor:Waist',

    meta: {
      name: 'Super legendary Waist',
      quality: 'common',
    },
    effects: [
      { name: 'Health', type: 'maxHealth', operator: '+', value: 10 },
      { name: 'Defense', type: 'defense', operator: '+', value: 40 },
    ],
  },
]

export default armors
