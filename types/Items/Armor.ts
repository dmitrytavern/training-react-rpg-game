import { Effect } from '../Effect'

namespace NamespaceArmor {
  export type Type = 'Armor'

  export type Categories =
    | 'Armor:Helmet'
    | 'Armor:Armor'
    | 'Armor:Arms'
    | 'Armor:Feet'
    | 'Armor:Waist'
    | 'Armor:Ring'

  export interface Meta {
    readonly name: string
    readonly quality: string
  }

  export interface Parameters {
    readonly effects: Effect[]
  }

  export interface Settings {
    canSell: boolean
    unique: boolean
  }
}

export interface Armor {
  Type: NamespaceArmor.Type
  Categories: NamespaceArmor.Categories
  Meta: NamespaceArmor.Meta
  Parameters: NamespaceArmor.Parameters
  Settings: NamespaceArmor.Settings
}
