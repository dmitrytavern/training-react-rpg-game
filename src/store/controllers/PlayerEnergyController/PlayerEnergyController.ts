import Controller from '../Controller'
import { ControllerContext, ControllerProps } from '../Controller/types'

import { calculateEffect } from '../../../utils/calculateEffect'

class PlayerEnergyController extends Controller {
  constructor(props: ControllerProps) {
    super(props)

    const context = this.context

    context.playerEnergy.setComputedFunction('level', () => {
      return context.playerLevel.getLevel()
    })

    context.playerEnergy.setComputedFunction('effects', () => {
      return calculateEffect('maxEnergy', [...context.playerEquipment.getEffects()])
    })

    context.playerEnergy.setComputedFunction('endurance', () => {
      return context.playerCharacteristic.getCharacteristic('endurance')
    })
  }
}

export default PlayerEnergyController
