import { Effect } from '../Effect'

namespace NamespacePotion {
  export type Type = 'Potion'

  export type Categories = 'Potion:Health' | 'Potion:Energy'

  export interface Meta {
    readonly name: string
    readonly quality: string
  }

  export interface Parameters {
    readonly effects: Effect[]
  }

  export interface Settings {
    unique: boolean
  }
}

export interface Potion {
  Type: NamespacePotion.Type
  Categories: NamespacePotion.Categories
  Meta: NamespacePotion.Meta
  Parameters: NamespacePotion.Parameters
  Settings: NamespacePotion.Settings
}
