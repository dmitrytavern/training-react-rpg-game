export type ComputedProperties = 'getPlayerLevel' | 'getEffects' | 'getStrengthCharacteristic'
export type PlayerLevelFunction = () => number
export type EffectsFunction = () => number
export type StrengthFunction = () => number

export type ComputedNames = keyof ComputedFunctions
export type ComputedFunctions = {
	level: PlayerLevelFunction
	effects: EffectsFunction
	strength: StrengthFunction
}