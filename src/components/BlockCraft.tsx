import React, { useState } from 'react'
import CraftBlueprint from '../store/models/CraftBlueprint'
import { observer } from 'mobx-react-lite'
import { useStore } from '../contexts/storeContext'

const CraftBlueprintMaterial = observer(
  (props: { id: number; quantity: number; available: boolean }) => {
    const store = useStore()

    const { id, quantity, available } = props

    const data = store.execute('items:get_data', id)

    const opacity = available ? 1 : 0.5
    return (
      <span style={{ opacity }}>
        {data.name} x{quantity}
      </span>
    )
  }
)

const CraftBlueprintTool = observer((props: { id: number; available: boolean }) => {
  const store = useStore()

  const { id, available } = props

  const data = store.execute('items:get_data', id)

  const opacity = available ? 1 : 0.5
  return <span style={{ opacity }}>{data.name}</span>
})

interface BlueprintProps {
  id: CraftBlueprint['id']
  materials: CraftBlueprint['materials']
  tools: CraftBlueprint['tools']
  result: CraftBlueprint['result']
  available: boolean
}

const AppCraftBlueprint = observer((props: BlueprintProps) => {
  const store = useStore()
  const { id, materials, tools, result, available } = props

  const resultData = store.execute('items:get_data', result.id)

  const onCraft = () => {
    store.execute('craft:create', id)
  }

  const opacity = available ? 1 : 0.5
  return (
    <li>
      <span>
        <div>
          {materials.map((item, i) => (
            <span key={i}>
              {i > 0 && ' X '}
              <CraftBlueprintMaterial
                id={item.material.id}
                quantity={item.quantity}
                available={item.material.isAvailable()}
              />
            </span>
          ))}

          <span> = </span>

          <span style={{ opacity }}>
            {resultData.name} x{result.quantity}
          </span>
        </div>
        {tools.length > 0 && (
          <div>
            Tools:
            {tools.map((tool, i) => (
              <span key={i}>
                {i > 0 && ', '}
                <CraftBlueprintTool id={tool.id} available={tool.isAvailable()} />
              </span>
            ))}
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

  const [category, setCategory] = useState('all')

  const blueprints = store.execute('craft:get_blueprints', category)

  const addCommonHammer = () => {
    store.execute('player_inventory:add_item', { itemId: 301, quantity: 1 })
  }

  const addCommonWood = () => {
    store.execute('player_inventory:add_item', { itemId: 101, quantity: 1 })
  }

  const addCommonIron = () => {
    store.execute('player_inventory:add_item', { itemId: 102, quantity: 1 })
  }

  const addCommonMandrake = () => {
    store.execute('player_inventory:add_item', { itemId: 103, quantity: 1 })
  }

  const addCommonCelandine = () => {
    store.execute('player_inventory:add_item', { itemId: 104, quantity: 1 })
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
            available={item.isAvailable()}
          />
        ))}
      </ul>
    </div>
  )
}

export default observer(BlockCraft)
