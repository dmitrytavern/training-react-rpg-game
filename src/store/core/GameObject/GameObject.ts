export class GameObject {
	public uuid: string | number

	constructor({ uuid }: { uuid: string | number }) {
		this.uuid = uuid
	}
}
