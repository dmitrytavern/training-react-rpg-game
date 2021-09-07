/* eslint-disable @typescript-eslint/no-explicit-any */
import { reaction } from 'mobx'
import { Injectable, Service } from '..'

interface Property<Target> {
	name: string
	key: null | string
	getter: () => Target[keyof Target]
	onChange(newVal: any): void
}

interface PropertyOptions {
	defaultValue?: any
	onChange?(newVal: any): void
}

type InitFields<Target, AdditionalFields extends PropertyKey> = {
	[P in keyof Target]?: string
} &
	Record<AdditionalFields, string>

@Injectable()
export class Model<Target extends Service> {
	private readonly properties: Property<Target>[] = []
	private service: Target | null = null

	public init<AdditionalKeys extends string>(
		service: Target,
		fields: InitFields<Target, AdditionalKeys>
	): void {
		if (this.service) {
			throw new Error('[Model]: Service already defined')
		}

		this.service = service

		for (const [serviceKey, modelKey] of Object.entries<string>(fields)) {
			this.set(modelKey, serviceKey)
		}
	}

	public getGetter<T extends any>(propertyName: string): () => T {
		const propertyObject = this.findProperty(propertyName)

		return propertyObject.getter as () => T
	}

	public getValue<T extends any>(propertyName: string): T {
		return this.getGetter<T>(propertyName)()
	}

	protected createProperty(name: string, options: PropertyOptions = {}): void {
		const object: Property<Target> = {
			name,
			key: null,
			getter: () => {
				if (!object.key) {
					return options.defaultValue as Target[keyof Target]
				}

				if (!this.service) {
					throw new Error('[Model]: Service not found')
				}

				if (Object.prototype.hasOwnProperty.call(this.service, object.key)) {
					return this.service[object.key as keyof Target]
				}

				throw new Error('[Model]: Not found property in service')
			},
			onChange: (value: any) => {
				if (options.onChange) options.onChange(value)
			},
		}

		this.properties.push(object)
	}

	private set(propertyName: string, serviceKey: string): void {
		const propertyObject = this.findProperty(propertyName)

		if (propertyObject.key) {
			throw new Error('[Model]: Property already have key')
		}

		if (!Object.prototype.hasOwnProperty.call(this.service, serviceKey)) {
			throw new Error('[Model]: Not found property in service')
		}

		propertyObject.key = serviceKey

		reaction(
			() => {
				const value = propertyObject.getter()

				if (Array.isArray(value)) {
					return value.length
				}
				return value
			},
			() => {
				propertyObject.onChange(propertyObject.getter())
			}
		)
	}

	private findProperty(propertyName: string): Property<Target> {
		const propertyObject = this.properties.find((x) => x.name === propertyName)

		if (propertyObject) {
			return propertyObject
		} else {
			throw new Error('[Model]: Property name not found')
		}
	}
}
