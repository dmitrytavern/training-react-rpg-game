import ItemsFactory from './ItemsFactory'

describe('Creating items', () => {
  it('Nothing create', () => {
    const factory = new ItemsFactory()

    expect(factory.getItemsById(1, 'Weapon').length).toBe(0)
  })

  it('Create one item', () => {
    const factory = new ItemsFactory()

    factory.create({ id: 1, type: 'Weapon' })

    expect(factory.getItemsById(1, 'Weapon').length).toBe(1)

    expect(factory.getItemsById(1).length).toBe(1)
  })

  it('Create two unique item', () => {
    const factory = new ItemsFactory()

    factory.create({ id: 1, type: 'Weapon' })
    factory.create({ id: 1, type: 'Weapon' })

    expect(factory.getItemsById(1, 'Weapon').length).toBe(2)

    expect(factory.getItemsById(1).length).toBe(2)
  })

  it('Create two simple item', () => {
    const factory = new ItemsFactory()

    factory.create({ id: 101, type: 'CraftMaterial' })
    factory.create({ id: 101, type: 'CraftMaterial' })

    expect(factory.getItemsById(101, 'CraftMaterial').length).toBe(1)

    expect(factory.getItemsById(101).length).toBe(1)
  })

  it('Create with wrong data', () => {
    const factory = new ItemsFactory()

    expect(() => factory.create({ id: -1, type: 'Weapon' })).toThrow()
    expect(() => factory.create({ id: NaN, type: 'Weapon' })).toThrow()
    // @ts-ignore
    expect(() => factory.create({ id: '1', type: 'Weapon' })).toThrow()
    // @ts-ignore
    expect(() => factory.create({ id: '1', type: false })).toThrow()
  })
})

describe('Finding items', () => {
  it('Find item by uuid', () => {
    const factory = new ItemsFactory()

    factory.create({ id: 1, type: 'Weapon' })

    const item = factory.getItemsById(1, 'Weapon')[0]

    expect(factory.getItem(item.uuid, 'Weapon')).toEqual(item)

    expect(factory.getItem(item.uuid)).toEqual(item)
  })

  it('Find simple item by uuid', () => {
    const factory = new ItemsFactory()

    const _item1 = factory.create({ id: 101, type: 'CraftMaterial' })
    const _item2 = factory.create({ id: 101, type: 'CraftMaterial' })

    expect(_item1).toBe(_item2)
    expect(factory.getItem(_item1.uuid)).toBe(_item2)
    expect(factory.getItem(_item2.uuid)).toBe(_item1)
  })

  it('Find item by uuid with other items', () => {
    const factory = new ItemsFactory()

    const _item1 = factory.create({ id: 1, type: 'Weapon' })
    const _item2 = factory.create({ id: 1, type: 'Weapon' })
    const _item3 = factory.create({ id: 101, type: 'CraftMaterial' })
    const _item4 = factory.create({ id: 101, type: 'CraftMaterial' })

    expect(factory.getItem(_item1.uuid)).toBe(_item1)
    expect(factory.getItem(_item2.uuid)).toBe(_item2)
    expect(factory.getItem(_item3.uuid)).toBe(_item3)
    expect(factory.getItem(_item3.uuid)).toBe(_item4)
  })
})

describe('Deleting items', () => {
  it('Delete unique item', () => {
    const factory = new ItemsFactory()

    const _item1 = factory.create({ id: 1, type: 'Weapon' })

    expect(factory.getItem(_item1.uuid)).toEqual(_item1)

    factory.delete(_item1.uuid)

    expect(factory.getItem(_item1.uuid)).toBe(undefined)
  })

  it('Delete two unique item', () => {
    const factory = new ItemsFactory()

    const _item1 = factory.create({ id: 1, type: 'Weapon' })
    const _item2 = factory.create({ id: 1, type: 'Weapon' })

    factory.delete(_item1.uuid)

    expect(factory.getItem(_item1.uuid)).toBe(undefined)

    expect(factory.getItem(_item2.uuid)).toEqual(_item2)
  })

  it('Delete simple items', () => {
    const factory = new ItemsFactory()

    const _item1 = factory.create({ id: 101, type: 'CraftMaterial' })
    const _item2 = factory.create({ id: 101, type: 'CraftMaterial' })

    expect(factory.getItem(_item1.uuid)).toEqual(_item1)

    factory.delete(_item1.uuid)

    expect(factory.getItem(_item1.uuid)).toBe(undefined)

    expect(factory.getItem(_item2.uuid)).toBe(undefined)
  })
})
