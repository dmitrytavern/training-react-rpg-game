import Commander from '../../Store'
import PlayerInventory from '../PlayerInventory'
import QuestsRequirements from './QuestsRequirements'

const data: any = {
  action: 'player_inventory:has_item',
  payload: { itemId: 1, quantity: 1 },
}

it('Checking subscribe function', () => {
  const inventory = new PlayerInventory()
  const questRequirements = new QuestsRequirements()

  questRequirements.subscribe('1:1', [data], (value: boolean) => {
    expect(value).toBeFalsy()
  })
})

it('Checking unsubscribe', () => {
  const inventory = new PlayerInventory()
  const questRequirements = new QuestsRequirements()

  questRequirements.subscribe('1:1', [data], (value: boolean) => {
    expect(value).toBeFalsy()
  })

  questRequirements.unsubscribe('1:1')

  inventory.addItem(1, 1)
})
