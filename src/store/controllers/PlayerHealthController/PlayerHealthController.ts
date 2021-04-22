import Controller from '../Controller'
import { ControllerProps } from '../Controller/types'

import { calculateEffect } from '../../../utils/calculateEffect'

class PlayerHealthController extends Controller {
  constructor(props: ControllerProps) {
    super(props)

    const context = this.context

    context.playerHealth.setComputedFunction('level', () => {
      return context.playerLevel.getLevel()
    })

    context.playerHealth.setComputedFunction('effects', () => {
      return calculateEffect('maxHealth', [...context.playerEquipment.getEffects()])
    })

    context.playerHealth.setComputedFunction('endurance', () => {
      return context.playerCharacteristic.getCharacteristic('endurance')
    })
  }
}

export default PlayerHealthController
