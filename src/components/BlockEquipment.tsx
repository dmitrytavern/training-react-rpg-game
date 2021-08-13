import { observer } from 'mobx-react-lite'
import { useStore } from '../contexts/storeContext'

import PlayerEquipmentController from '../store/controllers/PlayerEquipmentController'
import { Slots } from '../store/models/PlayerEquipment/PlayerEquipment'

const BlockEquipmentItem = observer(({ name }: { name: Slots }) => {
  const store = useStore()
  const controller: PlayerEquipmentController = store.getController(PlayerEquipmentController)

  const item = controller.getSlot(name)

  const unsetSlot = () => {
    controller.unsetSlot(name)
  }

  if (!item) {
    return <div>{name}: not</div>
  }

  return (
    <div>
      {name}: {item.meta.name}|<button onClick={unsetSlot}>Unset {name}</button>
    </div>
  )
})

const BlockEquipment = () => {
  return (
    <div>
      <div>Your equipment: </div>
      <BlockEquipmentItem name="weapon" />
      <BlockEquipmentItem name="helmet" />
      <BlockEquipmentItem name="armor" />
      <BlockEquipmentItem name="feet" />
      <BlockEquipmentItem name="arms" />
      <BlockEquipmentItem name="leftRing" />
      <BlockEquipmentItem name="rightRing" />
      <BlockEquipmentItem name="waist" />
    </div>
  )
}

export default observer(BlockEquipment)
