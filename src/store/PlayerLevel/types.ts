export type ComputedProperties = 'getIntelligenceCharacteristic'
export type IntelligenceFunction = () => number

export type ComputedNames = keyof ComputedFunctions
export type ComputedFunctions = {
	intelligence: IntelligenceFunction
}