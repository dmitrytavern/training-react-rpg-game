import { observer } from 'mobx-react-lite'
import { useItemsFactoryStore } from '../contexts/itemsFactoryStoreContext'
import { usePlayerStore } from '../contexts/playerStoreContext'

const BlockEquipment = () => {
  const player = usePlayerStore()
  const itemsFactory = useItemsFactoryStore()

  const equipment = player.equipment

  const setWeapon = () => {
    equipment.weapon.setEquipment(itemsFactory.create(1, 'weapon'))
  }
  const setHelmet = () => {
    equipment.helmetSlot.setEquipment(itemsFactory.create(4, 'armor'))
  }
  const setArmor = () => {
    equipment.armorSlot.setEquipment(itemsFactory.create(5, 'armor'))
  }
  const setArms = () => {
    equipment.armsSlot.setEquipment(itemsFactory.create(7, 'armor'))
  }
  const setFeet = () => {
    equipment.feetSlot.setEquipment(itemsFactory.create(6, 'armor'))
  }
  const setLeftRing = () => {
    equipment.leftRingSlot.setEquipment(itemsFactory.create(8, 'armor'))
  }
  const setRightRing = () => {
    equipment.rightRingSlot.setEquipment(itemsFactory.create(9, 'armor'))
  }
  const setWaist = () => {
    equipment.waistSlot.setEquipment(itemsFactory.create(10, 'armor'))
  }

  const unsetWeapon = () => {
    equipment.weapon.unsetEquipment()
  }
  const unsetHelmet = () => {
    equipment.helmetSlot.unsetEquipment()
  }
  const unsetArmor = () => {
    equipment.armorSlot.unsetEquipment()
  }
  const unsetArms = () => {
    equipment.armsSlot.unsetEquipment()
  }
  const unsetFeet = () => {
    equipment.feetSlot.unsetEquipment()
  }
  const unsetLeftRing = () => {
    equipment.leftRingSlot.unsetEquipment()
  }
  const unsetRightRing = () => {
    equipment.rightRingSlot.unsetEquipment()
  }
  const unsetWaist = () => {
    equipment.waistSlot.unsetEquipment()
  }

  return (
    <div>
      <div>Your equipment: </div>
      <div>
        Weapon: {equipment.weapon.getName()}|
        <button onClick={setWeapon} disabled={equipment.weapon.existsEquipment()}>
          Set weapon
        </button>
        <button onClick={unsetWeapon} disabled={!equipment.weapon.existsEquipment()}>
          Unset weapon
        </button>
      </div>
      <div>
        Helmet: {equipment.helmetSlot.getName()}|
        <button onClick={setHelmet} disabled={equipment.helmetSlot.existsEquipment()}>
          Set helmet
        </button>
        <button onClick={unsetHelmet} disabled={!equipment.helmetSlot.existsEquipment()}>
          Unset helmet
        </button>
      </div>
      <div>
        Armor: {equipment.armorSlot.getName()}|
        <button onClick={setArmor} disabled={equipment.armorSlot.existsEquipment()}>
          Set armor
        </button>
        <button onClick={unsetArmor} disabled={!equipment.armorSlot.existsEquipment()}>
          Unset armor
        </button>
      </div>
      <div>
        Feet: {equipment.feetSlot.getName()}|
        <button onClick={setFeet} disabled={equipment.feetSlot.existsEquipment()}>
          Set boots
        </button>
        <button onClick={unsetFeet} disabled={!equipment.feetSlot.existsEquipment()}>
          Unset boots
        </button>
      </div>
      <div>
        Arms: {equipment.armsSlot.getName()}|
        <button onClick={setArms} disabled={equipment.armsSlot.existsEquipment()}>
          Set arms
        </button>
        <button onClick={unsetArms} disabled={!equipment.armsSlot.existsEquipment()}>
          Unset arms
        </button>
      </div>
      <div>
        Left Ring: {equipment.leftRingSlot.getName()}|
        <button onClick={setLeftRing} disabled={equipment.leftRingSlot.existsEquipment()}>
          Set left ring
        </button>
        <button onClick={unsetLeftRing} disabled={!equipment.leftRingSlot.existsEquipment()}>
          Unset left ring
        </button>
      </div>
      <div>
        Right Ring: {equipment.rightRingSlot.getName()}|
        <button onClick={setRightRing} disabled={equipment.rightRingSlot.existsEquipment()}>
          Set right ring
        </button>
        <button onClick={unsetRightRing} disabled={!equipment.rightRingSlot.existsEquipment()}>
          Unset right ring
        </button>
      </div>
      <div>
        Waist: {equipment.waistSlot.getName()}|
        <button onClick={setWaist} disabled={equipment.waistSlot.existsEquipment()}>
          Set waist
        </button>
        <button onClick={unsetWaist} disabled={!equipment.waistSlot.existsEquipment()}>
          Unset waist
        </button>
      </div>
    </div>
  )
}

export default observer(BlockEquipment)
