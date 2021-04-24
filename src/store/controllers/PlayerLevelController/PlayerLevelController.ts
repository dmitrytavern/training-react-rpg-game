import Controller from '../Controller'
import { ControllerProps } from '../Controller/types'

type ControllerContext = 'playerLevel' | 'playerCharacteristic'

class PlayerLevelController extends Controller<ControllerContext> {
  constructor(props: ControllerProps<ControllerContext>) {
    super(props)

    const context = this.context

    context.playerLevel.setComputedFunction('intelligence', () => {
      return context.playerCharacteristic.getCharacteristic('intelligence')
    })
  }
}

export default PlayerLevelController
