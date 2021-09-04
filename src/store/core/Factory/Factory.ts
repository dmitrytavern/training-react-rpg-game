import { makeObservable, reaction, action, observable, toJS } from 'mobx'
import { FactoryPrivateKeys, TargetOptions, DecoratorTargetOptions } from './types'
import { Injectable, GameObject } from '..'

let ids = 0

@Injectable()
export class Factory<Target extends typeof GameObject> {
	protected readonly name: string
	protected readonly list: InstanceType<Target>[]
	private target: Target
	private targetOptions: DecoratorTargetOptions<Target> | null

	constructor() {
		const _constructor = this.constructor

		this.name = Reflect.getOwnMetadata('name', _constructor) as string

		this.target = Reflect.getOwnMetadata('target', _constructor) as Target

		this.targetOptions = Reflect.getOwnMetadata(
			'targetOptions',
			_constructor
		) as DecoratorTargetOptions<Target> | null

		this.list = this.decrypt([])

		makeObservable<Factory<Target>, FactoryPrivateKeys>(this, {
			list: observable,
			getObject: action,
			addObject: action,
			deleteObject: action,
			createObject: false,
			findByUUID: false,
			encrypt: false,
			target: false,
			name: false,
		})

		reaction(
			() => toJS(this.list),
			() => {
				this.encrypt()
			}
		)
	}

	public getObject(uuid: string | number): InstanceType<Target> {
		const val = this.findByUUID(uuid)

		if (val) return val

		throw new Error(`[core]: GameObject with this uuid ${uuid} not found in factory`)
	}

	public addObject(props: Omit<TargetOptions<Target>, 'uuid'>): InstanceType<Target> {
		ids++

		const newItem = this.createObject({
			uuid: ids,
			...props,
		} as TargetOptions<Target>)

		this.list.push(newItem)

		return newItem
	}

	public deleteObject(uuid: string | number): void {
		const val = this.findByUUID(uuid)

		if (val) {
			const index = this.list.indexOf(val)
			this.list.splice(index, 1)
			return
		}

		throw new Error(`[core]: GameObject with this uuid ${uuid} not found in factory`)
	}

	public existsObject(uuid: string | number): boolean {
		for (const item of this.list) {
			if (item.uuid === uuid) return true
		}

		return false
	}

	protected createObject(options: TargetOptions<Target>): InstanceType<Target> {
		return new this.target(options) as InstanceType<Target>
	}

	protected findByUUID(uuid: string | number): InstanceType<Target> | undefined {
		for (const item of this.list) {
			if (item.uuid === uuid) return item
		}

		return undefined
	}

	protected encrypt(): (TargetOptions<Target> | string)[] {
		const list = this.list
		const options = this.targetOptions
		const arr: (TargetOptions<Target> | string)[] = []

		for (const item of list) {
			if (!options) {
				arr.push(item.uuid.toString())

				continue
			}

			const obj: TargetOptions<Target> = {
				uuid: item.uuid,
			} as TargetOptions<Target>

			for (const key in options) {
				if (Object.prototype.hasOwnProperty.call(item, options[key])) {
					obj[key] = item[options[key]]
				} else {
					throw new Error('Property key not found')
				}
			}

			arr.push(obj)
		}

		return arr
	}

	private decrypt(data: (TargetOptions<Target> | string)[]): InstanceType<Target>[] {
		const arr = []
		for (const targetOptions of data) {
			if (typeof targetOptions === 'string') {
				arr.push(
					this.createObject({
						uuid: targetOptions,
					} as TargetOptions<Target>)
				)
				continue
			}

			arr.push(this.createObject(targetOptions))
		}
		return arr
	}
}
