import PlayerInventory from '../../../PlayerInventory'
import { removeItem } from './removeItem'

it('Checking execute function', () => {
  const inventory = new PlayerInventory()

  inventory.addItem(1, 2)

  removeItem({ inventory }, { itemId: 1, quantity: 1 })

  expect(inventory.existsItem(1, 1)).toBeTruthy()

  removeItem({ inventory }, { itemId: 1, quantity: 1 })

  expect(inventory.existsItem(1, 1)).toBeFalsy()
})
