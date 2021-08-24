import { Injectable, Service } from '..'

interface Property<Target> {
	name: string
	key: null | string
	getter: () => Target[keyof Target]
}

interface PropertyOptions {
	name: string
	defaultValue: any
}

@Injectable()
export class Model<Target extends Service> {
	private readonly properties: Property<Target>[] = []
	private service: Target | null = null

	public init(service: Target): void {
		if (this.service) {
			throw new Error('[Model]: Service already defined')
		}

		this.service = service
	}

	public set<T extends Target[keyof Target]>(propertyName: string, serviceKey: string): T {
		const propertyObject = this.findProperty(propertyName)

		if (propertyObject.key) {
			throw new Error('[Model]: Property already have key')
		}

		if (!Object.prototype.hasOwnProperty.call(this.service, serviceKey)) {
			throw new Error('[Model]: Not found property in service')
		}

		const _val = propertyObject.getter()

		propertyObject.key = serviceKey

		return _val as T
	}

	public get<T extends any>(propertyName: string): () => T {
		const propertyObject = this.findProperty(propertyName)

		return propertyObject.getter as () => T
	}

	protected createProperty(options: PropertyOptions): void {
		const object: Property<Target> = {
			name: options.name,
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
		}

		this.properties.push(object)
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
