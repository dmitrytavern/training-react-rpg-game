export interface ItemProps {
	id: number
	name: string
	type: string
	category: string
	quality: string
}

class Item {
	public id: number
	public name: string
	public type: string
	public category: string
	public quality: string

	constructor(props: ItemProps) {
		this.id = props.id
		this.name = props.name
		this.type = props.type
		this.category = props.category
		this.quality = props.quality
	}
}

export default Item