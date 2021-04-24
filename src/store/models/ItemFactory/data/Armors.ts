import { ItemProps } from '../../Item/types'

const armors: ItemProps<'Armor'>[] = [
  {
    id: 4,
    type: 'Armor',
    category: 'Armor:Helmet',
    meta: {
      name: 'Super legendary Helmet',
      quality: 'common',
    },
    parameters: {
      effects: [
        { name: 'Health', type: 'maxHealth', operator: '+', value: 100 },
        { name: 'Energy', type: 'maxEnergy', operator: '+', value: 40 },
      ],
    },
    settings: {
      canSell: true,
      unique: true,
    },
  },
  {
    id: 5,
    type: 'Armor',
    category: 'Armor:Armor',
    meta: {
      name: 'Super legendary Armor',
      quality: 'common',
    },
    parameters: {
      effects: [
        { name: 'Health', type: 'maxHealth', operator: '+', value: 10 },
        { name: 'Defense', type: 'defense', operator: '+', value: 50 },
      ],
    },
    settings: {
      canSell: true,
      unique: true,
    },
  },
  {
    id: 7,
    type: 'Armor',
    category: 'Armor:Arms',
    meta: {
      name: 'Super legendary Arms',
      quality: 'common',
    },
    parameters: {
      effects: [
        { name: 'Health', type: 'maxHealth', operator: '+', value: 10 },
        { name: 'Defense', type: 'defense', operator: '+', value: 40 },
      ],
    },
    settings: {
      canSell: true,
      unique: true,
    },
  },
  {
    id: 6,
    type: 'Armor',
    category: 'Armor:Feet',
    meta: {
      name: 'Super legendary Feet',
      quality: 'common',
    },
    parameters: {
      effects: [
        { name: 'Health', type: 'maxHealth', operator: '+', value: 10 },
        { name: 'Defense', type: 'defense', operator: '+', value: 40 },
      ],
    },
    settings: {
      canSell: true,
      unique: true,
    },
  },
  {
    id: 8,
    type: 'Armor',
    category: 'Armor:Ring',
    meta: {
      name: 'Super legendary Left Ring',
      quality: 'common',
    },
    parameters: {
      effects: [
        { name: 'Health', type: 'maxHealth', operator: '+', value: 10 },
        { name: 'Defense', type: 'defense', operator: '+', value: 40 },
      ],
    },
    settings: {
      canSell: true,
      unique: true,
    },
  },
  {
    id: 9,
    type: 'Armor',
    category: 'Armor:Ring',
    meta: {
      name: 'Super legendary Right Ring',
      quality: 'common',
    },
    parameters: {
      effects: [
        { name: 'Health', type: 'maxHealth', operator: '+', value: 10 },
        { name: 'Defense', type: 'defense', operator: '+', value: 40 },
      ],
    },
    settings: {
      canSell: true,
      unique: true,
    },
  },
  {
    id: 10,
    type: 'Armor',
    category: 'Armor:Waist',

    meta: {
      name: 'Super legendary Waist',
      quality: 'common',
    },
    parameters: {
      effects: [
        { name: 'Health', type: 'maxHealth', operator: '+', value: 10 },
        { name: 'Defense', type: 'defense', operator: '+', value: 40 },
      ],
    },
    settings: {
      canSell: true,
      unique: true,
    },
  },
]

export default armors
