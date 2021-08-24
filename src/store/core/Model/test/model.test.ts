import { Model, AppModel } from '..'
import { Service, AppService } from '../../Service'

// Removing di class registration
jest.mock('@store/core', () => ({
	Injectable: () => () => undefined,
}))

describe('Model core', () => {
	@AppService()
	class TestService extends Service {
		private privateProperty: null | string = null
	}

	@AppModel()
	class TestModel extends Model<TestService> {
		constructor() {
			super()
			this.createProperty({
				name: 'private',
				defaultValue: 'String',
			})
		}
	}

	it('should have created property', () => {
		const model = new TestModel()

		expect(model['properties'].length).toBe(1)
	})

	it('should return default value of property', () => {
		const service = new TestService()
		const model = new TestModel()

		model.init(service)

		expect(service['privateProperty']).toBeNull()
		expect(model.set('private', 'privateProperty')).toBe('String')
	})

	it('should return default value of not setted property', () => {
		const model = new TestModel()

		expect(model.get('private')()).toBe('String')
	})

	it('should return new value of property', () => {
		const service = new TestService()
		const model = new TestModel()

		model.init(service)
		service['privateProperty'] = model.set('private', 'privateProperty')
		service['privateProperty'] = 'NewString'

		expect(model.get('private')()).toBe('NewString')
	})

	// Errors

	it('should throw when service aready defined', () => {
		const service = new TestService()
		const model = new TestModel()

		model.init(service)

		expect(() => model.init(service)).toThrow()
	})

	it('should throw when property name is wrong', () => {
		const service = new TestService()
		const model = new TestModel()

		model.init(service)

		expect(() => model.set('wrong', 'privateProperty')).toThrow()
	})

	it('should throw when service key is wrong', () => {
		const service = new TestService()
		const model = new TestModel()

		model.init(service)

		expect(() => model.set('private', 'wrong')).toThrow()
	})

	it('should throw when service is not defined', () => {
		const model = new TestModel()

		expect(() => model.set('private', 'privateProperty')).toThrow()
	})

	it('should throw when key already setted', () => {
		const service = new TestService()
		const model = new TestModel()

		model.init(service)
		model.set('private', 'privateProperty')

		expect(() => model.set('private', 'privateProperty')).toThrow()
	})
})
