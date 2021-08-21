import { runInAction } from 'mobx'
import { Factory, AppFactory } from '../index'
import { GameObject } from '../../GameObject'

// Removing di class registration
jest.mock('@store/core', () => ({
	Injectable: () => () => undefined,
}))

class TestFactoryTaget extends GameObject {}

class TestFactoryTagetWithOptions extends GameObject {
	public name: string

	constructor(options: { uuid: string; name: string }) {
		super({ uuid: options.uuid })
		this.name = options.name
	}
}

describe('Factory core', () => {
	@AppFactory({
		name: 'factory',
		target: TestFactoryTaget,
	})
	class TestFactory extends Factory<typeof TestFactoryTaget> {
		public only_test_clear_list() {
			runInAction(() => {
				this.list.splice(0, 100)
			})
		}
	}

	const factory = new TestFactory()

	beforeEach(() => {
		factory.only_test_clear_list()
	})

	it('should return instance of target', () => {
		expect(factory.addObject({})).toBeInstanceOf(TestFactoryTaget)
	})

	it('should return object when adding object', () => {
		const item = factory.addObject({})

		expect(factory.getObject(item.uuid)).toEqual(item)
	})

	it('should delete object from list', () => {
		const item = factory.addObject({})

		factory.deleteObject(item.uuid)

		expect(factory.existsObject(item.uuid)).toBeFalsy()
	})

	it('should return target object without adding in list', () => {
		const object = factory['createObject']({
			uuid: 'none',
		})

		expect(object.uuid).toEqual('none')
		expect(factory.existsObject(object.uuid)).toBeFalsy()
		expect(() => factory.getObject(object.uuid)).toThrow()
		expect(() => factory.deleteObject(object.uuid)).toThrow()
	})

	it('should return false when getting object not exists', () => {
		expect(factory.existsObject('none')).toBeFalsy()
	})

	it('should throw when getting object not exists', () => {
		expect(() => factory.getObject('none')).toThrow()
	})

	it('should throw when deleting object not exists', () => {
		expect(() => factory.deleteObject('none')).toThrow()
	})
})

describe('Factory reactive', () => {
	let called = false

	@AppFactory({
		name: 'factory',
		target: TestFactoryTaget,
	})
	class TestFactory extends Factory<typeof TestFactoryTaget> {
		protected encrypt() {
			called = true
			return []
		}
	}

	const factory = new TestFactory()

	beforeEach(() => {
		called = false
	})

	it('should be false (by default)', () => {
		expect(called).toBeFalsy()
	})

	it('should be true when adding object', () => {
		factory.addObject({})
		expect(called).toBeTruthy()
	})
})

describe('Factory encrypt/decrypt', () => {
	@AppFactory({
		name: 'factory',
		target: TestFactoryTaget,
	})
	class FactoryWithoutOptions extends Factory<typeof TestFactoryTaget> {}

	@AppFactory({
		name: 'factory',
		target: TestFactoryTaget,
		targetOptions: {},
	})
	class FactoryWithOptions extends Factory<typeof TestFactoryTaget> {}

	@AppFactory({
		name: 'factory',
		target: TestFactoryTagetWithOptions,
		targetOptions: {
			name: 'name',
		},
	})
	class FactoryWithRequiredOptions extends Factory<typeof TestFactoryTagetWithOptions> {}

	it('should return array of uuid when options not defined', () => {
		const factory = new FactoryWithoutOptions()
		const item = factory.addObject({})
		expect(factory['encrypt']()).toEqual([item.uuid.toString()])
	})

	it('should return object with only uuid when options defined', () => {
		const factory = new FactoryWithOptions()
		const item = factory.addObject({})
		expect(factory['encrypt']()).toEqual([{ uuid: item.uuid }])
	})

	it('should return array of target options', () => {
		const factory = new FactoryWithRequiredOptions()
		const item = factory.addObject({ name: 'test' })

		expect(factory['encrypt']()).toEqual([
			{
				uuid: item.uuid,
				name: item.name,
			},
		])
	})

	it('should return array of objects when get array of options', () => {
		const factory = new FactoryWithRequiredOptions()
		const opt = { uuid: '1', name: 'test' }
		const objects = factory['decrypt']([opt])
		expect(objects).toEqual([factory['createObject'](opt)])
	})

	it('should return array of objects when get array of uuid', () => {
		const factory = new FactoryWithoutOptions()
		const objects = factory['decrypt'](['1'])
		expect(objects).toEqual([factory['createObject']({ uuid: '1' })])
	})
})
