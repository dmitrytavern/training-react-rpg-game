import Controller from '../Controller'
import { calculateEffect } from '../../../utils/calculateEffect'
import PlayerDefense from '../../models/PlayerDefense'
import PlayerLevel from '../../models/PlayerLevel'
import PlayerEquipment from '../../models/PlayerEquipment'
import PlayerCharacteristic from '../../models/PlayerCharacteristic'

@Controller([
  PlayerLevel,
  PlayerDefense,
  PlayerEquipment,
  PlayerCharacteristic
])
class PlayerDefenseController {
  constructor(
    private playerLevel: PlayerLevel,
    private playerDefense: PlayerDefense,
    private playerEquipment: PlayerEquipment,
    private playerCharacteristic: PlayerCharacteristic
  ) {
    this.playerDefense.setComputedFunction('level', () => {
      return this.playerLevel.getLevel()
    })

    this.playerDefense.setComputedFunction('effects', () => {
      return calculateEffect('defense', [...this.playerEquipment.getEffects()])
    })

    this.playerDefense.setComputedFunction('strength', () => {
      return this.playerCharacteristic.getCharacteristic('strength')
    })
  }

  public getDefense() {
    return this.playerDefense.getDefense()
  }

  public getDefensePercent() {
    return this.playerDefense.getDefensePercent()
  }
}

export default PlayerDefenseController
