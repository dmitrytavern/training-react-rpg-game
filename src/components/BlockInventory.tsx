import { observer } from 'mobx-react-lite'
import { useStore } from '../contexts/storeContext'
import PlayerInventoryItem from '../store/models/PlayerInventoryItem'

const Item = observer(({ item }: { item: PlayerInventoryItem }) => {
  const store = useStore()

  const favoriteExists = store.execute('player_favorites:has_item', item.id)

  const addItemToFavorite = () => {
    store.execute('player_favorites:set_item', item.id)
  }

  const unsetItemFromFavorite = () => {
    store.execute('player_favorites:unset_item', item.id)
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
  const store = useStore()
  const sword = { itemId: 1, quantity: 1 }

  const inventory = store.execute('player_inventory:get_inventory')

  const disableSwordBtn = store.execute('player_inventory:has_item', sword)

  const addItem = () => {
    store.execute('player_inventory:add_item', sword)
  }

  const removeItem = () => {
    store.execute('player_inventory:remove_item', sword)
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
