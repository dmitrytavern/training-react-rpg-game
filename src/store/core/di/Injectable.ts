import { injectable } from 'inversify'
import { kernel } from './Injector'
import { Class } from './types'

export function Injectable(): <T>(constructor: Class<T>) => void {
	return function <T>(constructor: Class<T>): void {
		injectable()(constructor)
		kernel.bind(constructor).toSelf().inSingletonScope()
		console.log(`[DI]: Class ${constructor.name} registered`)
	}
}
