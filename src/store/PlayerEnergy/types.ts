export type ComputedProperties = 'getPlayerLevel' | 'getEffects' | 'getEnduranceCharacteristic'
export type PlayerLevelFunction = () => number
export type EffectsFunction = () => number
export type EnduranceFunction = () => number

export type ComputedNames = keyof ComputedFunctions
export type ComputedFunctions = {
	level: PlayerLevelFunction
	effects: EffectsFunction
	endurance: EnduranceFunction
}