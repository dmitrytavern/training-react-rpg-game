import React, { useState } from 'react'
import CraftBlueprint from '../store/models/CraftBlueprint'
import { observer } from 'mobx-react-lite'
import { useStore } from '../contexts/storeContext'

import CraftController from '../store/controllers/CraftController'
import PlayerInventoryController from '../store/controllers/PlayerInventoryController'

const CraftBlueprintMaterial = observer((props: { id: number; quantity: number }) => {
  const store = useStore()
  const controller: CraftController = store.getController(CraftController)

  const { id, quantity } = props

  const available = controller.checkMaterialAvailable(id, quantity)
  const opacity = available ? 1 : 0.5
  return (
    <span style={{ opacity }}>
      {id} x{quantity}
    </span>
  )
})

const CraftBlueprintTool = observer((props: { id: number }) => {
  const store = useStore()
  const controller: CraftController = store.getController(CraftController)

  const { id } = props

  const available = controller.checkToolAvailable(id)
  const opacity = available ? 1 : 0.5
  return <span style={{ opacity }}>{id}</span>
})

interface BlueprintProps {
  id: CraftBlueprint['id']
  materials: CraftBlueprint['materials']
  tools: CraftBlueprint['tools']
  result: CraftBlueprint['result']
}

const AppCraftBlueprint = observer((props: BlueprintProps) => {
  const store = useStore()
  const controller: CraftController = store.getController(CraftController)

  const { id, materials, tools, result } = props

  const onCraft = () => {
    controller.create(id)
  }

  const available = controller.checkBlueprintAvailable(+id)
  const opacity = available ? 1 : 0.5
  return (
    <li>
      <span>
        <div>
          {materials.map((exp, i) => {
            const [id, quantity] = exp.split(':')
            return (
              <span key={i}>
                {i > 0 && ' X '}
                <CraftBlueprintMaterial id={+id} quantity={+quantity} />
              </span>
            )
          })}

          <span> = </span>

          <span style={{ opacity }}>
            {result.map((exp, i) => (
              <span key={i}>
                {i > 0 && ' , '}
                {exp}
              </span>
            ))}
          </span>
        </div>
        {tools.length > 0 && (
          <div>
            Tools:
            {tools.map((id, i) => {
              return (
                <span key={i}>
                  {i > 0 && ', '}
                  <CraftBlueprintTool id={+id} />
                </span>
              )
            })}
          </div>
        )}
      </span>
      |
      <button onClick={onCraft} disabled={!available}>
        Craft this shit!
      </button>
    </li>
  )
})

const BlockCraft = () => {
  const store = useStore()
  const controller: CraftController = store.getController(CraftController)
  const controllerInventory: PlayerInventoryController = store.getController(
    PlayerInventoryController
  )

  const [category, setCategory] = useState('all')

  const blueprints = controller.getBlueprints(category)

  const addCommonHammer = () => {
    controllerInventory.addItem(301)
  }

  const addCommonWood = () => {
    controllerInventory.addItem(101)
  }

  const addCommonIron = () => {
    controllerInventory.addItem(102)
  }

  const addCommonMandrake = () => {
    controllerInventory.addItem(103)
  }

  const addCommonCelandine = () => {
    controllerInventory.addItem(104)
  }

  const changeHandler = (event: React.SyntheticEvent) => {
    let target = event.target as HTMLInputElement
    setCategory(target.value)
  }

  return (
    <div>
      <h2>Craft</h2>

      <div>
        <button onClick={addCommonHammer}>Add 1 Common Hammer</button>
        <button onClick={addCommonWood}>Add 1 Common Wood</button>
        <button onClick={addCommonIron}>Add 1 Common Iron</button>
        <button onClick={addCommonMandrake}>Add 1 Common Mandrake</button>
        <button onClick={addCommonCelandine}>Add 1 Common Celandine</button>
      </div>

      <div>
        <select value={category} onChange={changeHandler}>
          <option value="all">All</option>
          <option value="smithing">Smithing</option>
          <option value="alchemy">Alchemy</option>
        </select>
      </div>

      <ul>
        {blueprints.map((item, i) => (
          <AppCraftBlueprint
            key={i}
            id={item.id}
            materials={item.materials}
            tools={item.tools}
            result={item.result}
          />
        ))}
      </ul>
    </div>
  )
}

export default observer(BlockCraft)
