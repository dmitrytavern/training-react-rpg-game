import { IReactionDisposer } from 'mobx'

export interface QuestsRequirementsData {
  [key: string]: {
    values: boolean[]
    disposers: IReactionDisposer[]
  }
}
