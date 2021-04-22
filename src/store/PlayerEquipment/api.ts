import PlayerEquipment from './PlayerEquipment'
import { EquipmentTypes, EquipmentSlots } from './types'

interface Context {
  playerEquipment?: PlayerEquipment
}

interface EquipmentPayload {
  itemId: number
  slot: EquipmentSlots
}

class Api {
  static getEquipment(context: Context, payload: EquipmentSlots) {
    const equipment = context.playerEquipment

    if (!equipment) {
      throw new Error('PlayerEquipment is undefined')
    }

    return equipment[payload].getEquipment()
  }

  static setEquipment(context: Context, payload: EquipmentPayload) {
    const equipment = context.playerEquipment

    if (!equipment) {
      throw new Error('PlayerEquipment is undefined')
    }
  }

  static unsetEquipment(context: Context, payload: EquipmentSlots) {
    const equipment = context.playerEquipment

    if (!equipment) {
      throw new Error('PlayerEquipment is undefined')
    }
  }

  static existsEquipment(context: Context, payload: EquipmentSlots) {
    const equipment = context.playerEquipment

    if (!equipment) {
      throw new Error('PlayerEquipment is undefined')
    }
  }
}

const EquipmentApi = {
  'player_equipment:get': Api.getEquipment,
  'player_equipment:set': Api.setEquipment,
  'player_equipment:unset': Api.unsetEquipment,
  'player_equipment:check_exists': Api.existsEquipment,
}

export default EquipmentApi
