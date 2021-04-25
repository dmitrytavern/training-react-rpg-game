import { observer } from 'mobx-react-lite'
import { useStore } from '../contexts/storeContext'

import PlayerInventoryController from '../store/controllers/PlayerInventoryController'
import PlayerFavoritesController from '../store/controllers/PlayerFavoritesController'

const Item = observer(({ uuid }: { uuid: string }) => {
  const store = useStore()
  const controller: PlayerInventoryController = store.getController(PlayerInventoryController)

  const exp = controller.getItem(uuid)

  if (!exp) return null

  const [item, quantity] = exp

  return (
    <li>
      {item.meta.name} x{quantity}
    </li>
  )
})

const BlockFavorites = () => {
  const store = useStore()
  const controller: PlayerFavoritesController = store.getController(PlayerFavoritesController)

  const items = controller.getAll()

  return (
    <div>
      <div>Your favorite items: </div>
      <ul>
        {items.map((uuid, i) => (
          <Item key={i} uuid={uuid} />
        ))}
      </ul>
    </div>
  )
}

export default observer(BlockFavorites)
