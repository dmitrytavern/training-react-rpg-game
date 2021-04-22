import { makeAutoObservable } from 'mobx'
import {
  ComputedProperties,
  PlayerLevelFunction,
  EffectsFunction,
  EnduranceFunction,
  ComputedNames,
  ComputedFunctions,
} from './types'

class PlayerEnergy {
  private readonly maxEnergy: number
  private energy: number
  private getPlayerLevel: PlayerLevelFunction
  private getEffects: EffectsFunction
  private getEnduranceCharacteristic: EnduranceFunction

  constructor(startValue: number, maxValue: number) {
    this.energy = startValue
    this.maxEnergy = maxValue
    this.getPlayerLevel = () => 1
    this.getEffects = () => 0
    this.getEnduranceCharacteristic = () => 1

    makeAutoObservable<PlayerEnergy, ComputedProperties>(this, {
      getPlayerLevel: false,
      getEffects: false,
      getEnduranceCharacteristic: false,
    })
  }

  public setComputedFunction(name: ComputedNames, computed: ComputedFunctions[ComputedNames]) {
    if (typeof computed !== 'function') return
    switch (name) {
      case 'level':
        this.getPlayerLevel = computed
        break
      case 'effects':
        this.getEffects = computed
        break
      case 'endurance':
        this.getEnduranceCharacteristic = computed
        break
    }
  }

  public getEnergy(): number {
    return this.energy
  }

  public getMaxEnergy(): number {
    return (
      this.maxEnergy * this.getPlayerLevel() * this.getEnduranceCharacteristic() + this.getEffects()
    )
  }

  // TODO: Whops... Need to rename this functions

  public incrementHealth(count: number): void {
    const max = this.getMaxEnergy()
    let _val = this.energy + count
    if (_val > max) _val = max
    this.energy = _val
  }

  public decrementHealth(count: number): void {
    let _val = this.energy - count
    if (_val < 0) _val = 0
    this.energy = _val
  }
}

export default PlayerEnergy
