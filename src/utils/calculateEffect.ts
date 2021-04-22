import { Effect } from '../../types/Effect'

export function calculateEffect(effectName: string, effects: Effect[]) {
  let effectDefense = 0
  effects.map((item: Effect) => {
    if (item.type === effectName) {
      switch (item.operator) {
        case '+':
          effectDefense += item.value
          break
        case '-':
          effectDefense -= item.value
          break
        default:
          throw new Error('Not found operator: ' + item.operator)
      }
    }
    return item
  })
  return effectDefense
}
