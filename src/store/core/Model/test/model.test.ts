import { action, makeObservable, observable } from 'mobx'
import { Model, AppModel } from '..'
import { Service, AppService } from '../../Service'

// Removing di class registration
jest.mock('@store/core', () => ({
	Injectable: () => () => undefined,
}))

describe('Model core', () => {
	@AppModel()
	class TestModel extends Model<TestService | TestServiceWithoutInit> {
		constructor() {
			super()
			this.createProperty('private', {
				defaultValue: 'String',
			})
		}
	}

	@AppService()
	class TestServiceWithoutInit extends Service {
		private privateProperty: null | string = null
	}

	@AppService()
	class TestService extends Service {
		private privateProperty: string

		constructor(model: TestModel) {
			super()

			this.privateProperty = model.getValue<string>('private')

			model.init<'privateProperty'>(this, {
				privateProperty: 'private',
			})
		}
	}

	it('should have created property', () => {
		const model = new TestModel()

		expect(model['properties'].length).toBe(1)
	})

	it('should return default value of not setted property', () => {
		const model = new TestModel()

		expect(model.getValue('private')).toBe('String')
		expect(model.getGetter('private')()).toBe('String')
	})

	it('should setted default value of property', () => {
		const model = new TestModel()
		const service = new TestService(model)

		expect(service['privateProperty']).toBe('String')
	})

	it('should return changed value of property', () => {
		const model = new TestModel()
		const service = new TestService(model)

		service['privateProperty'] = 'NewString'

		expect(model.getValue('private')).toBe('NewString')
		expect(model.getGetter('private')()).toBe('NewString')
	})

	// Errors

	it('should throw when service aready defined', () => {
		const model = new TestModel()
		const service = new TestService(model)

		expect(() => model.init(service, {})).toThrow()
	})

	it('should throw when property name is wrong', () => {
		const service = new TestServiceWithoutInit()
		const model = new TestModel()

		expect(() => {
			model.init(service, {
				privateProperty: 'wrong',
			})
		}).toThrow()
	})

	it('should throw when service key is wrong', () => {
		const service = new TestServiceWithoutInit()
		const model = new TestModel()

		expect(() => {
			model.init(service, {
				wrong: 'private',
			})
		}).toThrow()
	})
})

describe('Model reactive', () => {
	describe('Primitive values', () => {
		let valuesHistroy: string[] = []
		let model: TestModel
		let service: TestService

		@AppModel()
		class TestModel extends Model<TestService> {
			constructor() {
				super()
				this.createProperty('private', {
					defaultValue: 'String',
					onChange: (newVal: string) => {
						valuesHistroy.push(newVal)
					},
				})
			}
		}

		@AppService()
		class TestService extends Service {
			private privateProperty: string

			constructor(model: TestModel) {
				super()

				this.privateProperty = model.getValue<string>('private')

				makeObservable<TestService, 'privateProperty'>(this, {
					privateProperty: observable,
					changeValue: action,
				})

				model.init<'privateProperty'>(this, {
					privateProperty: 'private',
				})
			}

			public changeValue(newVal: string) {
				this.privateProperty = newVal
			}
		}

		beforeEach(() => {
			valuesHistroy = []
			model = new TestModel()
			service = new TestService(model)
		})

		it('should be empty array after created service', () => {
			expect(valuesHistroy.length).toBe(0)
		})

		it('should be only one new value', () => {
			service.changeValue('Hello')

			expect(valuesHistroy.length).toBe(1)
			expect(valuesHistroy[0]).toBe('Hello')
		})

		it('should be some new values', () => {
			service.changeValue('Hello')
			service.changeValue('World')
			service.changeValue('!')

			expect(valuesHistroy.length).toBe(3)
			expect(valuesHistroy[0]).toBe('Hello')
			expect(valuesHistroy[1]).toBe('World')
			expect(valuesHistroy[2]).toBe('!')
		})
	})

	describe('Arrays', () => {
		let valuesHistroy: string[] = []
		let model: TestModel
		let service: TestService

		@AppModel()
		class TestModel extends Model<TestService> {
			constructor() {
				super()

				this.createProperty('array', {
					defaultValue: ['one', 'two'],
					onChange: (newVal: string) => {
						valuesHistroy.push(newVal)
					},
				})
			}
		}

		@AppService()
		class TestService extends Service {
			private privateArray: string[]

			constructor(model: TestModel) {
				super()

				this.privateArray = model.getValue<string[]>('array')

				makeObservable<TestService, 'privateArray'>(this, {
					privateArray: observable,
					add: action,
				})

				model.init<'privateArray'>(this, {
					privateArray: 'array',
				})
			}

			public add(newVal: string) {
				this.privateArray.push(newVal)
			}
		}

		beforeEach(() => {
			valuesHistroy = []
			model = new TestModel()
			service = new TestService(model)
		})

		it('should be empty array after created service', () => {
			expect(valuesHistroy.length).toBe(0)
		})

		it('should be only one new value', () => {
			service.add('Hello')

			expect(valuesHistroy.length).toBe(1)
			expect(valuesHistroy[0]).toStrictEqual(['one', 'two', 'Hello'])
		})
	})
})
