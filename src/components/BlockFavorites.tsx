import { observer } from 'mobx-react-lite'
import { useCommander } from '../contexts/commanderStoreContext'

const Item = observer(({ id }: { id: number }) => {
  const app = useCommander()

  const item = app.execute('player_inventory:get_item', id)

  if (!item) return null

  return (
    <li>
      {item.item.name} x{item.getQuantity()}
    </li>
  )
})

const BlockFavorites = () => {
  const app = useCommander()

  const items = app.execute('player_favorites:get_all_items')

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
