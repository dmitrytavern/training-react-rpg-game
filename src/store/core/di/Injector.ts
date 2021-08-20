import { Container } from 'inversify'
import { Class } from './types'

export const kernel: Container = new Container({
	skipBaseClassChecks: true,
})

export const injector = {
	get<T>(target: Class<T>): T {
		return kernel.get<T>(target)
	},
}
