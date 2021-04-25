import PlayerInventory from '../PlayerInventory'
import QuestsRewards from './QuestsRewards'

it('Checking getRewards function', () => {
  const inventory = new PlayerInventory()
  const questsRewards = new QuestsRewards()

  questsRewards.getRewards([
    { action: 'player_inventory:add_item', payload: { itemId: 1, quantity: 1 } },
  ])

  expect(inventory.existsItem('0')).toBeTruthy()
})
