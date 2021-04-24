import Controller from '../Controller'
import { ControllerProps } from '../Controller/types'

type ControllerContext = 'playerCharacteristic' | 'playerLevel'

class PlayerCharacteristicController extends Controller<ControllerContext> {
  constructor(props: ControllerProps<ControllerContext>) {
    super(props)

    const context = this.context

    context.playerCharacteristic.setComputedFunction('level', () => {
      return context.playerLevel.getLevel()
    })
  }
}

export default PlayerCharacteristicController
