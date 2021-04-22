import Controller from '../Controller'
import { ControllerProps } from '../Controller/types'
import { calculateEffect } from '../../../utils/calculateEffect'

class PlayerDefenseController extends Controller {
  constructor(props: ControllerProps) {
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
