import { Effect } from '../Effect'

namespace NamespaceWeapon {
  export type Type = 'Weapon'

  export type Categories = 'Weapon:Sword'

  export interface Meta {
    name: string
    quality: string
  }

  export interface Parameters {
    level: number
    effects: Effect[]
  }

  export interface Settings {
    canSell: boolean
    unique: boolean
  }
}

export interface Weapon {
  Type: NamespaceWeapon.Type
  Categories: NamespaceWeapon.Categories
  Meta: NamespaceWeapon.Meta
  Parameters: NamespaceWeapon.Parameters
  Settings: NamespaceWeapon.Settings
}
