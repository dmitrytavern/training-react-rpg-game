import PlayerInventory from '../PlayerInventory'
import QuestsRewards from './QuestsRewards'
import Commander from '../Commander'

it('Checking getRewards function', () => {
  const inventory = new PlayerInventory()
  const commander = new Commander({ playerInventory: inventory })
  const questsRewards = new QuestsRewards()
  questsRewards.init(commander)

  questsRewards.getRewards([
    { action: 'player_inventory:add_item', payload: { itemId: 1, quantity: 1 } },
  ])

  expect(inventory.existsItem(1)).toBeTruthy()
})
