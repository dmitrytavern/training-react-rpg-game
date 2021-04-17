import PlayerHealth from './PlayerHealth'

const maxHealthFormula = (max: number, lvl: number, endurance: number) => {
  return max * lvl * endurance
}

describe('Check default properties', () => {
  it('Check health and maxHealth', () => {
    const health = new PlayerHealth(50, 100)

    expect(health.getHealth()).toBe(50)
    expect(health.getMaxHealth()).toBe(100)
  })

  it('Check alive when health > 0', () => {
    const health = new PlayerHealth(50, 100)

    expect(health.alive).toBeTruthy()
  })

  it('Check alive when health = 0', () => {
    const health = new PlayerHealth(0, 100)

    expect(health.alive).toBeFalsy()
  })
})

describe('Check default properties with effects', () => {
  const lvl = 2
  const startMaxHealth = 100
  const effect = 300
  const endurance = 4

  it('Check health and maxHealth with effects', () => {
    const health = new PlayerHealth(50, startMaxHealth)
    const maxHealth = maxHealthFormula(startMaxHealth, lvl, endurance) + effect

    health.setComputedFunction('level', () => lvl)
    health.setComputedFunction('effects', () => effect)
    health.setComputedFunction('endurance', () => endurance)

    expect(health.getHealth()).toBe(50)
    expect(health.getMaxHealth()).toBe(maxHealth)
  })

  it('Check max health with level effect', () => {
    const health = new PlayerHealth(50, startMaxHealth)
    const maxHealth = maxHealthFormula(startMaxHealth, lvl, 1)

    health.setComputedFunction('level', () => 2)

    expect(health.getMaxHealth()).toBe(maxHealth)
  })

  it('Check max health with effects', () => {
    const health = new PlayerHealth(50, startMaxHealth)
    const maxHealth = maxHealthFormula(startMaxHealth, lvl, 1) + effect

    health.setComputedFunction('level', () => 2)
    health.setComputedFunction('effects', () => effect)

    expect(health.getMaxHealth()).toBe(maxHealth)
  })

  it('Check max health with endurance', () => {
    const health = new PlayerHealth(50, startMaxHealth)
    const maxHealth = maxHealthFormula(startMaxHealth, 1, endurance)

    health.setComputedFunction('endurance', () => endurance)

    expect(health.getMaxHealth()).toBe(maxHealth)
  })
})

describe('Check increment function', () => {
  it('Increment health not to full', () => {
    const health = new PlayerHealth(50, 100)

    expect(health.getHealth()).toBe(50)

    health.incrementHealth(10)

    expect(health.getHealth()).toBe(60)
  })

  it('Increment health to full', () => {
    const health = new PlayerHealth(50, 100)

    expect(health.getHealth()).toBe(50)

    health.incrementHealth(50)

    expect(health.getHealth()).toBe(100)
  })

  it('Increment health to overfull', () => {
    const health = new PlayerHealth(50, 100)

    expect(health.getHealth()).toBe(50)

    health.incrementHealth(150)

    expect(health.getHealth()).toBe(100)
  })
})

describe('Check increment function with effects', () => {
  const startMaxHealth = 100
  const lvl = 2
  const effect = 340
  const endurance = 4
  const maxHealth = maxHealthFormula(startMaxHealth, lvl, endurance) + effect

  it('Increment health to full with effects', () => {
    const health = new PlayerHealth(50, startMaxHealth)

    health.setComputedFunction('level', () => lvl)
    health.setComputedFunction('effects', () => effect)
    health.setComputedFunction('endurance', () => endurance)

    expect(health.getHealth()).toBe(50)

    health.incrementHealth(maxHealth - 50)

    expect(health.getHealth()).toBe(maxHealth)
  })

  it('Increment health to overfull with effects', () => {
    const health = new PlayerHealth(50, startMaxHealth)

    health.setComputedFunction('level', () => lvl)
    health.setComputedFunction('effects', () => effect)
    health.setComputedFunction('endurance', () => endurance)

    expect(health.getHealth()).toBe(50)

    health.incrementHealth(maxHealth + 1000)

    expect(health.getHealth()).toBe(maxHealth)
  })
})

describe('Check decrement function', () => {
  it('Decrement health not to full', () => {
    const health = new PlayerHealth(50, 100)

    expect(health.getHealth()).toBe(50)

    health.decrementHealth(10)

    expect(health.getHealth()).toBe(40)
    expect(health.alive).toBeTruthy()
  })

  it('Decrement health to full and check player alive', () => {
    const health = new PlayerHealth(50, 100)

    expect(health.getHealth()).toBe(50)

    health.decrementHealth(50)

    expect(health.getHealth()).toBe(0)
    expect(health.alive).toBeFalsy()
  })

  it('Decrement health to overfull and check player alive', () => {
    const health = new PlayerHealth(50, 100)

    expect(health.getHealth()).toBe(50)

    health.decrementHealth(150)

    expect(health.getHealth()).toBe(0)
    expect(health.alive).toBeFalsy()
  })
})
