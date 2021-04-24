import Controller from '../Controller'
import { ControllerProps } from '../Controller/types'
import { calculateEffect } from '../../../utils/calculateEffect'

type ControllerContext = 'playerDamage' | 'playerLevel' | 'playerEquipment' | 'playerCharacteristic'

class PlayerDamageController extends Controller<ControllerContext> {
  constructor(props: ControllerProps<ControllerContext>) {
    super(props)

    const context = this.context

    context.playerDamage.setComputedFunction('level', () => {
      return context.playerLevel.getLevel()
    })

    context.playerDamage.setComputedFunction('effects', () => {
      return calculateEffect('damage', [...context.playerEquipment.getEffects()])
    })

    context.playerDamage.setComputedFunction('strength', () => {
      return context.playerCharacteristic.getCharacteristic('strength')
    })
  }
}

export default PlayerDamageController
