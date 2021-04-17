export type ComputedProperties = 'getPlayerLevel'
export type PlayerLevelFunction = () => number

export type ComputedNames = keyof ComputedFunctions
export type ComputedFunctions = {
  level: PlayerLevelFunction
}

export interface Characteristics {
  strength: number
  endurance: number
  intelligence: number
}
