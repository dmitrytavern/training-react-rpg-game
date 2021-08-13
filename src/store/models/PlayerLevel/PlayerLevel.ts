import { makeAutoObservable } from 'mobx'
import { ComputedProperties, IntelligenceFunction, ComputedNames, ComputedFunctions } from './types'

class PlayerLevel {
  private level: number
  private experience: number
  private experienceForLevelUp: number
  private getIntelligenceCharacteristic: IntelligenceFunction

  // TODO: add setting
  constructor() {
    this.level = 10
    this.experience = 0
    this.experienceForLevelUp = PlayerLevel._calcExperienceForLevelUp(10)
    this.getIntelligenceCharacteristic = () => 1

    this.addExperience(10)

    makeAutoObservable<PlayerLevel, ComputedProperties>(this, {
      getIntelligenceCharacteristic: false,
    })
  }

  public setComputedFunction(name: ComputedNames, computed: ComputedFunctions[ComputedNames]) {
    if (typeof computed !== 'function') return
    switch (name) {
      case 'intelligence':
        this.getIntelligenceCharacteristic = computed
        break
    }
  }

  public getLevel(): number {
    return this.level
  }

  public getExperience(): number {
    return this.experience
  }

  public getExperienceForLevelUp(): number {
    return this.experienceForLevelUp
  }

  public addExperience(exp: number): void {
    let _level = this.level
    let _exp = this.experience + exp
    let _expLevelUp = this.experienceForLevelUp

    while (_exp >= _expLevelUp) {
      _exp -= _expLevelUp
      _level += 1
      _expLevelUp = PlayerLevel._calcExperienceForLevelUp(_level)
    }

    this.level = _level
    this.experience = _exp
    this.experienceForLevelUp = _expLevelUp
  }

  public calculateExperience(exp: number): number {
    const percent = this.getIntelligenceCharacteristic() * 5

    return exp + (exp / 100) * percent
  }

  public static _calcExperienceForLevelUp(lvl: number): number {
    return lvl * 100
  }
}

export default PlayerLevel
