import PlayerBalanceMoney from "../PlayerBalanceMoney"

interface PlayerBalanceProps {
	money: number
}

class PlayerBalance {
	public money: PlayerBalanceMoney

	constructor(props: PlayerBalanceProps) {
		this.money = new PlayerBalanceMoney(props.money)
	}
}

export default PlayerBalance
