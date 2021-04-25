import Controller from '../Controller'
import PlayerHealth from '../../models/PlayerHealth'
import PlayerLevel from '../../models/PlayerLevel'
import PlayerDefense from '../../models/PlayerDefense'
import PlayerCharacteristic from '../../models/PlayerCharacteristic'
import PlayerEquipment from '../../models/PlayerEquipment'

import { calculateEffect } from '../../../utils/calculateEffect'

@Controller([
  PlayerHealth,
  PlayerLevel,
  PlayerDefense,
  PlayerCharacteristic,
  PlayerEquipment
])
class PlayerHealthController {
  constructor(
    private playerHealth: PlayerHealth,
    private playerLevel: PlayerLevel,
    private playerDefense: PlayerDefense,
    private playerCharacteristic: PlayerCharacteristic,
    private playerEquipment: PlayerEquipment,
  ) {
    this.playerHealth.setComputedFunction('level', () => {
      return this.playerLevel.getLevel()
    })

    this.playerHealth.setComputedFunction('effects', () => {
      return calculateEffect('maxHealth', [...this.playerEquipment.getEffects()])
    })

    this.playerHealth.setComputedFunction('endurance', () => {
      return this.playerCharacteristic.getCharacteristic('endurance')
    })
  }

  public isAlive() {
    return this.playerHealth.alive
  }

  public getHealth() {
    return this.playerHealth.getHealth()
  }

  public getHealthMax() {
    return this.playerHealth.getMaxHealth()
  }

  public increment(value: number) {
    this.playerHealth.incrementHealth(value)
  }

  public decrement(value: number) {
    const _value = this.playerDefense.calculateDamaging(value)
    this.playerHealth.decrementHealth(_value)
  }
}

export default PlayerHealthController
