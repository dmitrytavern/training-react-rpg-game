import PlayerBalanceMoney from './PlayerBalanceMoney'

describe('Getting money', () => {
  it('Get zero money', () => {
    const money = new PlayerBalanceMoney(0)

    expect(money.getMoney()).toEqual({
      gold: 0,
      silver: 0,
      copper: 0,
    })
  })

  it('Get only copper', () => {
    const money = new PlayerBalanceMoney(50)

    money.incrementMoney(40)

    expect(money.getMoney()).toEqual({
      gold: 0,
      silver: 0,
      copper: 90,
    })

    money.decrementMoney(70)

    expect(money.getMoney()).toEqual({
      gold: 0,
      silver: 0,
      copper: 20,
    })
  })

  it('Get copper with silver', () => {
    const money = new PlayerBalanceMoney(100)

    money.incrementMoney(40)

    expect(money.getMoney()).toEqual({
      gold: 0,
      silver: 1,
      copper: 40,
    })

    money.decrementMoney(40)

    expect(money.getMoney()).toEqual({
      gold: 0,
      silver: 1,
      copper: 0,
    })
  })

  it('Get copper, silver and gold', () => {
    const money = new PlayerBalanceMoney(10000)

    money.incrementMoney(140)

    expect(money.getMoney()).toEqual({
      gold: 1,
      silver: 1,
      copper: 40,
    })

    money.decrementMoney(10000)

    expect(money.getMoney()).toEqual({
      gold: 0,
      silver: 1,
      copper: 40,
    })
  })
})
