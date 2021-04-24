import Controller from '../Controller'
import { ControllerProps } from '../Controller/types'

type ControllerContext = 'playerInventory' | 'craft' | 'itemFactor'

class PlayerInventoryController extends Controller<ControllerContext> {
  constructor(props: ControllerProps<ControllerContext>) {
    super(props)

    const context = this.context

    context.playerInventory.setItemsFactory(context.itemFactor)
  }
}

export default PlayerInventoryController
