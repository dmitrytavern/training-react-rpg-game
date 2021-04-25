import { observer } from 'mobx-react-lite'
import { useStore } from '../contexts/storeContext'

import PlayerInventoryController from '../store/controllers/PlayerInventoryController'
import Item from '../store/models/Item'
import PlayerFavoritesController from '../store/controllers/PlayerFavoritesController'

const InventoryItem = observer(({ item, quantity }: { item: Item<any>, quantity: number }) => {
  const store = useStore()
  const controllerInventory: PlayerInventoryController = store.getController(PlayerInventoryController)
  const controllerFavorites: PlayerFavoritesController = store.getController(PlayerFavoritesController)

  const favoriteExists = controllerFavorites.exists(item.uuid)

  const addItemToFavorite = () => {
    controllerFavorites.set(item.uuid)
  }

  const unsetItemFromFavorite = () => {
    controllerFavorites.unset(item.uuid)
  }

  const deleteItem = () => {
    controllerInventory.removeItem(item.uuid)
  }

  return (
    <li>
      <span>
        {item.meta.name} x{quantity}
      </span>
      |
      <button onClick={addItemToFavorite} disabled={favoriteExists}>
        Add to favorite
      </button>
      <button onClick={unsetItemFromFavorite} disabled={!favoriteExists}>
        Unset from favorite
      </button>
      <button onClick={deleteItem}>
        Delete
      </button>
    </li>
  )
})

const BlockInventory = () => {
  const store = useStore()
  const controller: PlayerInventoryController = store.getController(PlayerInventoryController)

  const inventory = controller.getInventory()

  const addItem = () => {
    controller.addItem(1, 1)
  }

  return (
    <div>
      <div>Your inventory: </div>
      <ul>
        {inventory.map(([item, quantity], i) => (
          <InventoryItem key={i} item={item} quantity={quantity} />
        ))}
      </ul>

      <button onClick={addItem}>Add 1 Sword</button>
    </div>
  )
}

export default observer(BlockInventory)
