import PlayerDefense from './PlayerDefense'

interface Context {
  playerDefense?: PlayerDefense
}

class Api {
  public static getDefense(context: Context): number {
    const defense = context.playerDefense

    if (!defense) {
      throw new Error('PlayerDefense is undefined')
    }

    return defense.getDefense()
  }

  public static getDefensePercent(context: Context): number {
    const defense = context.playerDefense

    if (!defense) {
      throw new Error('PlayerDefense is undefined')
    }

    return defense.getDefensePercent()
  }
}

const PlayerDefenseApi = {
  'player_defense:get_defense': Api.getDefense,
  'player_defense:get_defense_percent': Api.getDefensePercent,
}

export default PlayerDefenseApi
