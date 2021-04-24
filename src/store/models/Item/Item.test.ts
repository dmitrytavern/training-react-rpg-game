import Item from './Item'

const item = new Item({
  id: 1,
  type: 'Weapon',
  category: 'Weapon:Sword',
  meta: { name: '', quality: '' },
  parameters: {
    level: 1,
    effects: [],
  },
  settings: {
    canSell: true,
  },
})

describe('Check parameters', () => {
  it('Get level parameter', () => {
    expect(item.getParameter('level')).toBe(1)
  })

  it('Get undefined parameter', () => {
    expect(() =>
      // @ts-ignore
      item.getParameter('undefined')
    ).toThrow()
  })

  it('Set level parameter', () => {
    item.setParameter('level', 100)

    expect(item.getParameter('level')).toBe(100)
  })

  it('Set undefined parameter', () => {
    expect(() =>
      // @ts-ignore
      item.setParameter('undefined', undefined)
    ).toThrow()
  })
})

describe('Check settings', () => {
  it('Get canSell setting', () => {
    expect(item.getSetting('canSell')).toBe(true)
  })

  it('Get undefined setting', () => {
    expect(() =>
      // @ts-ignore
      item.getSetting('undefined')
    ).toThrow()
  })

  it('Set canSell setting', () => {
    item.setSetting('canSell', false)

    expect(item.getSetting('canSell')).toBe(false)
  })

  it('Set undefined setting', () => {
    expect(() =>
      // @ts-ignore
      item.setSetting('undefined', undefined)
    ).toThrow()
  })
})
