import { injector, Injectable } from '@store/core'

describe('Injector', () => {
	@Injectable()
	class SimpleClass {}

	@Injectable()
	class DependClass {
		constructor(public simpleClass: SimpleClass) {}
	}

	it('injects a simple class', () => {
		const instance = injector.get(SimpleClass)
		expect(instance).toBeInstanceOf(SimpleClass)
		expect(injector.get(SimpleClass)).toBe(instance)
	})

	it('injects a class with depends', () => {
		const instance = injector.get(DependClass)
		expect(instance.simpleClass).toBeInstanceOf(SimpleClass)
		expect(instance.simpleClass).toBe(injector.get(SimpleClass))
	})
})
