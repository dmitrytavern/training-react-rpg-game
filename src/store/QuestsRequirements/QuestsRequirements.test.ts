import { commandAction } from '../Commander/types'
import Commander from '../Commander'
import PlayerInventory from '../PlayerInventory'
import QuestsCommander from '../QuestsCommander'
import QuestsRequirements from './QuestsRequirements'

const data: commandAction<'player_inventory:has_item'> = {
  action: 'player_inventory:has_item',
  payload: { itemId: 1, quantity: 1 },
}

it('Checking subscribe function', () => {
  const inventory = new PlayerInventory()
  const commander = new Commander({ playerInventory: inventory })
  const questRequirements = new QuestsRequirements()
  questRequirements.init(commander)

  questRequirements.subscribe('1:1', [data], (value: boolean) => {
    expect(value).toBeFalsy()
  })
})

it('Checking unsubscribe', () => {
  const inventory = new PlayerInventory()
  const commander = new Commander({ playerInventory: inventory })
  const questRequirements = new QuestsRequirements()
  questRequirements.init(commander)

  questRequirements.subscribe('1:1', [data], (value: boolean) => {
    expect(value).toBeFalsy()
  })

  questRequirements.unsubscribe('1:1')

  inventory.addItem(1, 1)
})
