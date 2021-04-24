import { ControllerProps, ControllerContext, StoreContext } from './types'

class Controller<T extends keyof StoreContext> {
  protected readonly context: ControllerContext<T>

  constructor(props: ControllerProps<T>) {
    const { context } = props

    this.context = context
  }
}

export default Controller
