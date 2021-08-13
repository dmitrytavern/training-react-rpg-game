import Controller from '../Controller'
import { calculateEffect } from '../../../utils/calculateEffect'

import PlayerDamage from '../../models/PlayerDamage'
import PlayerLevel from '../../models/PlayerLevel'
import PlayerEquipment from '../../models/PlayerEquipment'
import PlayerCharacteristic from '../../models/PlayerCharacteristic'

@Controller([PlayerLevel, PlayerDamage, PlayerEquipment, PlayerCharacteristic])
class PlayerDamageController {
  constructor(
    private playerLevel: PlayerLevel,
    private playerDamage: PlayerDamage,
    private playerEquipment: PlayerEquipment,
    private playerCharacteristic: PlayerCharacteristic
  ) {
    this.playerDamage.setComputedFunction('level', () => {
      return this.playerLevel.getLevel()
    })

    this.playerDamage.setComputedFunction('effects', () => {
      return calculateEffect('damage', [...this.playerEquipment.getEffects()])
    })

    this.playerDamage.setComputedFunction('strength', () => {
      return this.playerCharacteristic.getCharacteristic('strength')
    })
  }

  public getDamage() {
    return this.playerDamage.getDamage()
  }

  public getDamageMin() {
    return this.playerDamage.getMinDamage()
  }

  public getDamageMax() {
    return this.playerDamage.getMaxDamage()
  }
}

export default PlayerDamageController
