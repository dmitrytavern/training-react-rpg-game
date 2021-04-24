import { CraftBlueprintItem } from '../../CraftBlueprint'

const data: CraftBlueprintItem[] = [
  {
    id: '1',
    category: 'smithing',
    materials: ['101:1', '102:1'],
    tools: [],
    result: ['1:1'],
  },
  {
    id: '2',
    category: 'smithing',
    materials: ['101:1', '102:1', '1:1'],
    tools: ['301'],
    result: ['11:1'],
  },
  {
    id: '3',
    category: 'alchemy',
    materials: ['103:1', '104:1'],
    tools: [],
    result: ['201:1'],
  },
]

export default data
