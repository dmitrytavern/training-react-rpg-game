import Controller from '../Controller'
import { ControllerProps } from '../Controller/types'

class PlayerLevelController extends Controller {
  constructor(props: ControllerProps) {
    super(props)

    const context = this.context

    context.playerLevel.setComputedFunction('intelligence', () => {
      return context.playerCharacteristic.getCharacteristic('intelligence')
    })
  }
}

export default PlayerLevelController
