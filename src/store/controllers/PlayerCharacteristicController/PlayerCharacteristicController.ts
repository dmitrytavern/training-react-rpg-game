import Controller from '../Controller'
import { ControllerProps } from '../Controller/types'

class PlayerCharacteristicController extends Controller {
  constructor(props: ControllerProps) {
    super(props)

    const context = this.context

    context.playerCharacteristic.setComputedFunction('level', () => {
      return context.playerLevel.getLevel()
    })
  }
}

export default PlayerCharacteristicController
