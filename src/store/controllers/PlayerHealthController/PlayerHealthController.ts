import Controller from '../Controller'
import { ControllerProps } from '../Controller/types'

import { calculateEffect } from '../../../utils/calculateEffect'

type ControllerContext = 'playerHealth' | 'playerLevel' | 'playerCharacteristic' | 'playerEquipment'

class PlayerHealthController extends Controller<ControllerContext> {
  constructor(props: ControllerProps<ControllerContext>) {
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
