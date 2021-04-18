import PlayerCharacteristic from './PlayerCharacteristic'
import { Characteristics } from './types'

interface Context {
  playerCharacteristic?: PlayerCharacteristic
}

class Api {
  public static getPoint(context: Context, payload: keyof Characteristics): number {
    const characteristic = context.playerCharacteristic

    if (!characteristic) {
      throw new Error('PlayerCharacteristic is undefined')
    }

    return characteristic.getCharacteristic(payload)
  }

  public static getAllPoints(context: Context): number {
    const characteristic = context.playerCharacteristic

    if (!characteristic) {
      throw new Error('PlayerCharacteristic is undefined')
    }

    return characteristic.getAllPoints()
  }

  public static getAvailablePoints(context: Context): number {
    const characteristic = context.playerCharacteristic

    if (!characteristic) {
      throw new Error('PlayerCharacteristic is undefined')
    }

    return characteristic.getAvailablePoints()
  }

  public static checkPointLimit(context: Context, payload: keyof Characteristics): boolean {
    const characteristic = context.playerCharacteristic

    if (!characteristic) {
      throw new Error('PlayerCharacteristic is undefined')
    }

    return characteristic.characteristicLimitReached(payload)
  }

  public static setPoint(context: Context, payload: keyof Characteristics) {
    const characteristic = context.playerCharacteristic

    if (!characteristic) {
      throw new Error('PlayerCharacteristic is undefined')
    }

    characteristic.setPoint(payload)
  }

  public static unsetPoints(context: Context) {
    const characteristic = context.playerCharacteristic

    if (!characteristic) {
      throw new Error('PlayerCharacteristic is undefined')
    }

    characteristic.unsetPoints()
  }
}

const PlayerCharacteristicApi = {
  'player_characteristic:get_point': Api.getPoint,
  'player_characteristic:get_all_points': Api.getAllPoints,
  'player_characteristic:get_available_points': Api.getAvailablePoints,
  'player_characteristic:check_point_limit': Api.checkPointLimit,
  'player_characteristic:set_point': Api.setPoint,
  'player_characteristic:unset_points': Api.unsetPoints,
}

export default PlayerCharacteristicApi
