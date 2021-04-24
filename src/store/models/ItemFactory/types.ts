import { ItemTypes } from '../Item/types'

export type ItemKeys = ItemTypes

export interface CreatePayload<T extends ItemTypes> {
  id: number
  type?: T
}
