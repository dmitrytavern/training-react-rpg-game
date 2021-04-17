import PlayerDefense from './PlayerDefense'

const baseDefenseFormula = (lvl: number, strength: number) => {
  return lvl * 5 * strength
}

const defensePercentFormula = (defense: number, lvl: number, strength: number) => {
  const baseDamage = baseDefenseFormula(lvl, strength)
  const def = baseDamage + defense

  return +(lvl * 0.1 + (50 * def) / (1500 + def)).toFixed(2)
}

const calcDamagingFormula = (damage: number, defense: number, lvl: number, strength: number) => {
  const percent = defensePercentFormula(defense, lvl, strength)

  return +((damage / 100) * (100 - percent)).toFixed()
}

describe('Check value', () => {
  it('Default value', () => {
    const defense = new PlayerDefense()

    expect(defense.getDefense()).toBe(baseDefenseFormula(1, 1))
    expect(defense.getDefensePercent()).toBe(defensePercentFormula(0, 1, 1))
  })

  it('With level', () => {
    const defense = new PlayerDefense()

    defense.setComputedFunction('level', () => 2)

    expect(defense.getDefense()).toBe(baseDefenseFormula(2, 1))
    expect(defense.getDefensePercent()).toBe(defensePercentFormula(0, 2, 1))
  })

  it('With effect', () => {
    const defense = new PlayerDefense()

    defense.setComputedFunction('effects', () => 500)

    expect(defense.getDefense()).toBe(baseDefenseFormula(1, 1) + 500)
    expect(defense.getDefensePercent()).toBe(defensePercentFormula(500, 1, 1))
  })

  it('With effect and level', () => {
    const defense = new PlayerDefense()

    defense.setComputedFunction('level', () => 2)
    defense.setComputedFunction('effects', () => 500)

    expect(defense.getDefense()).toBe(baseDefenseFormula(2, 1) + 500)
    expect(defense.getDefensePercent()).toBe(defensePercentFormula(500, 2, 1))
  })

  it('With effect, level and characteristic', () => {
    const defense = new PlayerDefense()

    defense.setComputedFunction('level', () => 2)
    defense.setComputedFunction('effects', () => 500)
    defense.setComputedFunction('strength', () => 5)

    expect(defense.getDefense()).toBe(baseDefenseFormula(2, 5) + 500)
    expect(defense.getDefensePercent()).toBe(defensePercentFormula(500, 2, 5))
  })
})

describe('Check calculate damage', () => {
  const damage = 500

  it('With default property', () => {
    const defense = new PlayerDefense()

    const availableDamage = defense.calculateDamaging(damage)

    expect(availableDamage).toBe(calcDamagingFormula(damage, 0, 1, 1))
  })

  it('With effect', () => {
    const defense = new PlayerDefense()

    defense.setComputedFunction('effects', () => 500)

    const availableDamage = defense.calculateDamaging(damage)

    expect(availableDamage).toBe(calcDamagingFormula(damage, 500, 1, 1))
  })

  it('With effect and level', () => {
    const defense = new PlayerDefense()

    defense.setComputedFunction('level', () => 2)
    defense.setComputedFunction('effects', () => 500)

    const availableDamage = defense.calculateDamaging(damage)

    expect(availableDamage).toBe(calcDamagingFormula(damage, 500, 2, 1))
  })

  it('With effect, level and characteristic', () => {
    const defense = new PlayerDefense()

    defense.setComputedFunction('level', () => 2)
    defense.setComputedFunction('effects', () => 500)
    defense.setComputedFunction('strength', () => 5)

    const availableDamage = defense.calculateDamaging(damage)

    expect(availableDamage).toBe(calcDamagingFormula(damage, 500, 2, 5))
  })
})
