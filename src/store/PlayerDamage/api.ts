import PlayerDamage from './PlayerDamage'

interface Context {
  playerDamage?: PlayerDamage
}

class Api {
  public static getDamage(context: Context): number {
    const damage = context.playerDamage

    if (!damage) {
      throw new Error('PlayerDamage is undefined')
    }

    return damage.getDamage()
  }

  public static getMinDamage(context: Context): number {
    const damage = context.playerDamage

    if (!damage) {
      throw new Error('PlayerDamage is undefined')
    }

    return damage.getMinDamage()
  }

  public static getMaxDamage(context: Context): number {
    const damage = context.playerDamage

    if (!damage) {
      throw new Error('PlayerDamage is undefined')
    }

    return damage.getMaxDamage()
  }
}

const PlayerDamageApi = {
  'player_damage:get_damage': Api.getDamage,
  'player_damage:get_min_damage': Api.getMinDamage,
  'player_damage:get_max_damage': Api.getMaxDamage,
}

export default PlayerDamageApi
