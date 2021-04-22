import { observer } from 'mobx-react-lite'
import { useStore } from '../contexts/storeContext'

const Item = observer(({ id }: { id: number }) => {
  const store = useStore()

  const item = store.execute('player_inventory:get_item', id)

  if (!item) return null

  return (
    <li>
      {item.item.name} x{item.getQuantity()}
    </li>
  )
})

const BlockFavorites = () => {
  const store = useStore()

  const items = store.execute('player_favorites:get_all_items')

  return (
    <div>
      <div>Your favorite items: </div>
      <ul>
        {items.map((id, i) => (
          <Item key={i} id={id} />
        ))}
      </ul>
    </div>
  )
}

export default observer(BlockFavorites)
