import PlayerEnergy from './PlayerEnergy'

interface Context {
  playerEnergy?: PlayerEnergy
}

class Api {
  public static getEnergy(context: Context) {
    const energy = context.playerEnergy

    if (!energy) {
      throw new Error('PlayerEnergy is undefined')
    }

    return energy.getEnergy()
  }

  public static getMaxEnergy(context: Context) {
    const energy = context.playerEnergy

    if (!energy) {
      throw new Error('PlayerEnergy is undefined')
    }

    return energy.getMaxEnergy()
  }

  public static increment(context: Context, payload: number) {
    const energy = context.playerEnergy

    if (!energy) {
      throw new Error('PlayerEnergy is undefined')
    }

    return energy.incrementHealth(payload)
  }

  public static decrement(context: Context, payload: number) {
    const energy = context.playerEnergy

    if (!energy) {
      throw new Error('PlayerEnergy is undefined')
    }

    return energy.decrementHealth(payload)
  }
}

const PlayerEnergyApi = {
  'player_energy:get_energy': Api.getEnergy,
  'player_energy:get_max_energy': Api.getMaxEnergy,
  'player_energy:increment': Api.increment,
  'player_energy:decrement': Api.decrement,
}

export default PlayerEnergyApi
