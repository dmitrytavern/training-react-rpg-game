import Controller from '../Controller'
import PlayerLevel from '../../models/PlayerLevel'
import PlayerCharacteristic from '../../models/PlayerCharacteristic'

@Controller([PlayerLevel, PlayerCharacteristic])
class PlayerLevelController {
  constructor(
    private playerLevel: PlayerLevel,
    private playerCharacteristic: PlayerCharacteristic
  ) {
    this.playerLevel.setComputedFunction('intelligence', () => {
      return this.playerCharacteristic.getCharacteristic('intelligence')
    })
  }

  public getLevel() {
    return this.playerLevel.getLevel()
  }

  public getExperience() {
    return this.playerLevel.getExperience()
  }

  public getExperienceMax() {
    return this.playerLevel.getExperienceForLevelUp()
  }

  public addExperience(exp: number) {
    const _exp = this.playerLevel.calculateExperience(exp)
    this.playerLevel.addExperience(_exp)
  }
}

export default PlayerLevelController
