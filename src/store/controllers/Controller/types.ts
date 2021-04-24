import { StoreContext as Store } from '../../Store/types'

export type StoreContext = Store

export type ControllerContext<T extends keyof StoreContext> = Pick<StoreContext, T>

export interface ControllerProps<T extends keyof StoreContext> {
  context: ControllerContext<T>
}
