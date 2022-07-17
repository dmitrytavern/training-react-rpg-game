import { GameObject } from '../GameObject'

/* eslint-disable @typescript-eslint/no-explicit-any */

export type FactoryPrivateKeys =
	| 'name'
	| 'target'
	| 'list'
	| 'getObject'
	| 'addObject'
	| 'deleteObject'
	| 'createObject'
	| 'findByUUID'
	| 'encrypt'

export type TargetOptions<T extends typeof GameObject> = {
	[Prop in keyof ConstructorParameters<T>[0]]: any
}

export type DecoratorTargetOptions<T extends typeof GameObject> = {
	[Prop in keyof ConstructorParameters<T>[0]]: Exclude<keyof InstanceType<T>, 'uuid'>
}

export type Class<T> = new (...args: any[]) => T

export interface FactoryInjectableOptions<T extends Class<any>> {
	name: string
	target: T
	targetOptions?: Omit<DecoratorTargetOptions<T>, 'uuid'>
	warn?: boolean
}
