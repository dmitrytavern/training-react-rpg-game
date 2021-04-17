import PlayerInventory from '../../../PlayerInventory'
import { checkItem } from './checkItem'

it('Checking checker function', () => {
  const inventory = new PlayerInventory()
  const data = { itemId: 1, quantity: 1 }

  expect(checkItem({ inventory }, data)).toBeFalsy()

  inventory.addItem(1, 1)

  expect(checkItem({ inventory }, data)).toBeTruthy()

  inventory.addItem(1, 1)

  expect(checkItem({ inventory }, data)).toBeTruthy()
})
