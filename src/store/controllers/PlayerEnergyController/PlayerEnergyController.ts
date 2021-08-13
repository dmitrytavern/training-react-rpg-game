import Controller from '../Controller'
import { calculateEffect } from '../../../utils/calculateEffect'
import PlayerLevel from '../../models/PlayerLevel'
import PlayerEquipment from '../../models/PlayerEquipment'
import PlayerCharacteristic from '../../models/PlayerCharacteristic'
import PlayerEnergy from '../../models/PlayerEnergy'

@Controller([PlayerLevel, PlayerEnergy, PlayerEquipment, PlayerCharacteristic])
class PlayerEnergyController {
  constructor(
    private playerLevel: PlayerLevel,
    private playerEnergy: PlayerEnergy,
    private playerEquipment: PlayerEquipment,
    private playerCharacteristic: PlayerCharacteristic
  ) {
    this.playerEnergy.setComputedFunction('level', () => {
      return this.playerLevel.getLevel()
    })

    this.playerEnergy.setComputedFunction('effects', () => {
      return calculateEffect('maxEnergy', [...this.playerEquipment.getEffects()])
    })

    this.playerEnergy.setComputedFunction('endurance', () => {
      return this.playerCharacteristic.getCharacteristic('endurance')
    })
  }

  public getEnergy() {
    return this.playerEnergy.getEnergy()
  }

  public getEnergyMax() {
    return this.playerEnergy.getMaxEnergy()
  }

  public increment(value: number) {
    this.playerEnergy.incrementHealth(value)
  }

  public decrement(value: number) {
    this.playerEnergy.decrementHealth(value)
  }
}

export default PlayerEnergyController
