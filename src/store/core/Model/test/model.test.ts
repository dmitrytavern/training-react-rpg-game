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
