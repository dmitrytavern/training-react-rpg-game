namespace NamespaceCraftTool {
  export type Type = 'CraftTool'

  export type Categories = 'CraftTool:Hammer'

  export interface Meta {
    readonly name: string
    readonly quality: string
  }

  export interface Parameters {}

  export interface Settings {
    unique: boolean
  }
}

export interface CraftTool {
  Type: NamespaceCraftTool.Type
  Categories: NamespaceCraftTool.Categories
  Meta: NamespaceCraftTool.Meta
  Parameters: NamespaceCraftTool.Parameters
  Settings: NamespaceCraftTool.Settings
}
