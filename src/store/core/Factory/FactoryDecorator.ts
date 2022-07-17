import { Injectable } from '@store/core'
import { Class, FactoryInjectableOptions } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AppFactory<T extends Class<any>>(options: FactoryInjectableOptions<T>): any {
	const warn = options.warn !== false

	return function <T>(target: Class<T>) {
		Reflect.defineMetadata('name', options.name, target)
		Reflect.defineMetadata('target', options.target, target)
		Reflect.defineMetadata('targetOptions', options.targetOptions, target)
		Reflect.defineMetadata('warn', warn, target)

		Injectable()(target)
	}
}
