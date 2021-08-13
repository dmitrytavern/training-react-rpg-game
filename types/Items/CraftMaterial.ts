namespace NamespaceCraftMaterial {
  export type Type = 'CraftMaterial'

  export type Categories = 'CraftMaterial:Wood' | 'CraftMaterial:Iron' | 'CraftMaterial:Herb'

  export interface Meta {
    readonly name: string
    readonly quality: string
  }

  export interface Parameters {}

  export interface Settings {
    unique: boolean
  }
}

export interface CraftMaterial {
  Type: NamespaceCraftMaterial.Type
  Categories: NamespaceCraftMaterial.Categories
  Meta: NamespaceCraftMaterial.Meta
  Parameters: NamespaceCraftMaterial.Parameters
  Settings: NamespaceCraftMaterial.Settings
}
