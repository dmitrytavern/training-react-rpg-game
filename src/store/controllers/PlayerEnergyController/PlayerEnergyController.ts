import Controller from '../Controller'
import { ControllerProps } from '../Controller/types'

import { calculateEffect } from '../../../utils/calculateEffect'

type ControllerContext = 'playerEnergy' | 'playerLevel' | 'playerEquipment' | 'playerCharacteristic'

class PlayerEnergyController extends Controller<ControllerContext> {
  constructor(props: ControllerProps<ControllerContext>) {
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
