import PlayerCharacteristic from "./PlayerCharacteristic"

const startPoint = 3

const levelFormula = (lvl: number) => {
	let newPoints = 0

	let i = 1
	while (lvl >= i * 5) {
		newPoints++
		i++
	}

	return newPoints
}

describe('Check getting with default characteristics', () => {
	it('Getting points with default properties', () => {
		const characteristic = new PlayerCharacteristic()

		expect(characteristic.getAllPoints()).toBe(startPoint)
		expect(characteristic.getAvailablePoints()).toBe(0)
	})

	it('Getting characteristics with default properties', () => {
		const characteristic = new PlayerCharacteristic()

		expect(characteristic.getCharacteristic('strength')).toBe(1)
		expect(characteristic.getCharacteristic('endurance')).toBe(1)
	})

	it('Getting points with level', () => {
		const characteristic = new PlayerCharacteristic()

		characteristic.setPlayerLevel(() => 4)

		expect(characteristic.getAvailablePoints()).toBe(0)

		characteristic.setPlayerLevel(() => 5)

		expect(characteristic.getAvailablePoints()).toBe(1)
		expect(characteristic.getAllPoints()).toBe(startPoint + levelFormula(5))

		characteristic.setPlayerLevel(() => 40)

		expect(characteristic.getAvailablePoints()).toBe(8)
		expect(characteristic.getAllPoints()).toBe(startPoint + levelFormula(40))
	})
})

describe('Check getting with custom characteristics', () => {
	it('Getting points with custom properties', () => {
		const characteristic = new PlayerCharacteristic()

		characteristic.setPlayerLevel(() => 10)

		characteristic.setCustomCharacteristics({
			strength: 2,
			endurance: 2,
			intelligence: 1
		})

		expect(characteristic.getAllPoints()).toBe(startPoint + levelFormula(10))
		expect(characteristic.getAvailablePoints()).toBe(0)
	})

	it('Getting characteristics with custom properties', () => {
		const characteristic = new PlayerCharacteristic()

		characteristic.setPlayerLevel(() => 10)

		characteristic.setCustomCharacteristics({
			strength: 2,
			endurance: 2,
			intelligence: 1
		})

		expect(characteristic.getCharacteristic('strength')).toBe(2)
		expect(characteristic.getCharacteristic('endurance')).toBe(2)
		expect(characteristic.getCharacteristic('intelligence')).toBe(1)
	})
})

describe('Check setting custom characteristics', () => {
	it('Get error when points more than maximum', () => {
		function set() {
			const characteristic = new PlayerCharacteristic()

			characteristic.setPlayerLevel(() => 10)

			characteristic.setCustomCharacteristics({
				strength: 3,
				endurance: 2,
				intelligence: 1
			})
		}

		expect(set).toThrow()
	})

	it('Get error when one characteristic = 0 but other errors not', () => {
		function set() {
			const characteristic = new PlayerCharacteristic()

			characteristic.setPlayerLevel(() => 100)

			characteristic.setCustomCharacteristics({
				strength: 0,
				endurance: 2,
				intelligence: 1
			})
		}

		expect(set).toThrow()
	})
})

describe('Check setting/unsetting functions', () => {
	it('Set without available points', () => {
		function set() {
			const characteristic = new PlayerCharacteristic()

			characteristic.setPoint('strength')
		}

		expect(set).toThrow()
	})

	it('Set with available point', () => {
		const characteristic = new PlayerCharacteristic()

		characteristic.setPlayerLevel(() => 5)

		characteristic.setPoint('strength')

		expect(characteristic.getCharacteristic('strength')).toBe(2)
	})

	it('Unset custom characteristics', () => {
		const characteristic = new PlayerCharacteristic()

		characteristic.setPlayerLevel(() => 10)

		characteristic.setCustomCharacteristics({
			strength: 2,
			endurance: 2,
			intelligence: 1
		})

		expect(characteristic.getAllPoints()).toBe(startPoint + levelFormula(10))
		expect(characteristic.getAvailablePoints()).toBe(0)
		expect(characteristic.getCharacteristic('strength')).toBe(2)

		characteristic.unsetPoints()

		expect(characteristic.getAllPoints()).toBe(startPoint + levelFormula(10))
		expect(characteristic.getAvailablePoints()).toBe(levelFormula(10))
		expect(characteristic.getCharacteristic('strength')).toBe(1)
	})
})