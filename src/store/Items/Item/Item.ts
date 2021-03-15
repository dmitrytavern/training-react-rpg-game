export interface ItemProps {
	readonly id: number
	readonly name: string
	readonly type: string
	readonly category: string
	readonly quality: string
}

class Item {
	public readonly id: number
	public readonly name: string
	public readonly type: string
	public readonly category: string
	public readonly quality: string

	constructor(props: ItemProps) {
		this.id = props.id
		this.name = props.name
		this.type = props.type
		this.category = props.category
		this.quality = props.quality
	}
}

export default Item