import Controller from '../Controller'
import { ControllerProps } from '../Controller/types'
import { calculateEffect } from '../../../utils/calculateEffect'

type ControllerContext =
  | 'playerDefense'
  | 'playerLevel'
  | 'playerEquipment'
  | 'playerCharacteristic'

class PlayerDefenseController extends Controller<ControllerContext> {
  constructor(props: ControllerProps<ControllerContext>) {
    super(props)

    const context = this.context

    context.playerDefense.setComputedFunction('level', () => {
      return context.playerLevel.getLevel()
    })

    context.playerDefense.setComputedFunction('effects', () => {
      return calculateEffect('defense', [...context.playerEquipment.getEffects()])
    })

    context.playerDefense.setComputedFunction('strength', () => {
      return context.playerCharacteristic.getCharacteristic('strength')
    })
  }
}

export default PlayerDefenseController
