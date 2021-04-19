import { observer } from 'mobx-react-lite'
import { useCommander } from '../contexts/commanderStoreContext'
import PlayerInventoryItem from '../store/PlayerInventoryItem'

const Item = observer(({ item }: { item: PlayerInventoryItem }) => {
  const app = useCommander()

  const favoriteExists = app.execute('player_favorites:has_item', item.id)

  const addItemToFavorite = () => {
    app.execute('player_favorites:set_item', item.id)
  }

  const unsetItemFromFavorite = () => {
    app.execute('player_favorites:unset_item', item.id)
  }

  return (
    <li>
      <span>
        {item.item.name} x{item.getQuantity()}
      </span>
      |
      <button onClick={addItemToFavorite} disabled={favoriteExists}>
        Add to favorite
      </button>
      <button onClick={unsetItemFromFavorite} disabled={!favoriteExists}>
        Unset from favorite
      </button>
    </li>
  )
})

const BlockInventory = () => {
  const app = useCommander()
  const sword = { itemId: 1, quantity: 1 }

  const inventory = app.execute('player_inventory:get_inventory')

  const disableSwordBtn = app.execute('player_inventory:has_item', sword)

  const addItem = () => {
    app.execute('player_inventory:add_item', sword)
  }

  const removeItem = () => {
    app.execute('player_inventory:remove_item', sword)
  }

  return (
    <div>
      <div>Your inventory: </div>
      <ul>
        {inventory.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </ul>

      <button onClick={addItem}>Add 1 Sword</button>
      <button onClick={removeItem} disabled={!disableSwordBtn}>
        Remove 1 Sword
      </button>
    </div>
  )
}

export default observer(BlockInventory)
