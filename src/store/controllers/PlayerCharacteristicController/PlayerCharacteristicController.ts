import Controller from '../Controller'
import PlayerLevel from '../../models/PlayerLevel'
import PlayerCharacteristic from '../../models/PlayerCharacteristic'
import { Characteristics } from '../../models/PlayerCharacteristic/types'

@Controller([
  PlayerLevel,
  PlayerCharacteristic
])
class PlayerCharacteristicController {
  constructor(
    private playerLevel: PlayerLevel,
    private playerCharacteristic: PlayerCharacteristic
  ) {
    this.playerCharacteristic.setComputedFunction('level', () => {
      return this.playerLevel.getLevel()
    })
  }

  public getAllPoints() {
    return this.playerCharacteristic.getAllPoints()
  }

  public getAvailablePoints() {
    return this.playerCharacteristic.getAvailablePoints()
  }

  public getPoints(name: keyof Characteristics) {
    return this.playerCharacteristic.getCharacteristic(name)
  }

  public setPoint(name: keyof Characteristics) {
    return this.playerCharacteristic.setPoint(name)
  }

  public unsetPoints() {
    return this.playerCharacteristic.unsetPoints()
  }

  public checkLimit(name: keyof Characteristics) {
    return this.playerCharacteristic.characteristicLimitReached(name)
  }
}

export default PlayerCharacteristicController
