import { ControllerProps, ControllerContext } from './types'

class Controller {
  protected readonly context: ControllerContext

  constructor(props: ControllerProps) {
    const { context } = props

    this.context = context
  }
}

export default Controller
