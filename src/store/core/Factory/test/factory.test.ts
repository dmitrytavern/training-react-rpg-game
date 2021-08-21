import { runInAction } from 'mobx'
import { Factory, AppFactory } from '../index'
import { TargetOptions } from '../types'
import { GameObject } from '../../GameObject'

// Removing di class registration
jest.mock('@store/core', () => ({
	Injectable: () => () => undefined,
}))

class TestFactoryTaget extends GameObject {}

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

	it('should delete item', () => {
		const item = factory.addObject({})

		factory.deleteObject(item.uuid)

		expect(factory.existsObject(item.uuid)).toBeFalsy()
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

describe('Factory private methods', () => {
	@AppFactory({
		name: 'factory',
		target: TestFactoryTaget,
	})
	class TestFactory extends Factory<typeof TestFactoryTaget> {
		public only_test_create_object(props: TargetOptions<typeof TestFactoryTaget>) {
			return this.createObject(props)
		}

		public only_test_get_encrypt() {
			return this.encrypt()
		}
	}

	const factory = new TestFactory()

	it('should return object', () => {
		const object = factory.only_test_create_object({
			uuid: 'none',
		})

		expect(object.uuid).toEqual('none')
		expect(factory.existsObject(object.uuid)).toBeFalsy()
		expect(() => factory.getObject(object.uuid)).toThrow()
		expect(() => factory.deleteObject(object.uuid)).toThrow()
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

describe('Factory encrypt', () => {
	@AppFactory({
		name: 'factory',
		target: TestFactoryTaget,
	})
	class FactoryWithoutOptions extends Factory<typeof TestFactoryTaget> {
		public only_test_encrypt() {
			return this.encrypt()
		}
	}

	@AppFactory({
		name: 'factory',
		target: TestFactoryTaget,
		targetOptions: {},
	})
	class FactoryWithOptions extends Factory<typeof TestFactoryTaget> {
		public only_test_encrypt() {
			return this.encrypt()
		}
	}

	it('should return array of uuid when options not defined', () => {
		const factory = new FactoryWithoutOptions()
		const item = factory.addObject({})
		expect(factory.only_test_encrypt()).toEqual([item.uuid.toString()])
	})

	it('should return object with uuid when options defined', () => {
		const factory = new FactoryWithOptions()
		const item = factory.addObject({})
		expect(factory.only_test_encrypt()).toEqual([{ uuid: item.uuid }])
	})
})
