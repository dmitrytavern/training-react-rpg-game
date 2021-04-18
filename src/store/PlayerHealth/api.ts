import PlayerHealth from './PlayerHealth'

interface Context {
  playerHealth?: PlayerHealth
}

class Api {
  public static getAlive(context: Context): boolean {
    const health = context.playerHealth

    if (!health) {
      throw new Error('Player health is undefined!')
    }

    return health.alive
  }

  public static getHealth(context: Context): number {
    const health = context.playerHealth

    if (!health) {
      throw new Error('Player health is undefined!')
    }

    return health.getHealth()
  }

  public static getMaxHealth(context: Context): number {
    const health = context.playerHealth

    if (!health) {
      throw new Error('Player health is undefined!')
    }

    return health.getMaxHealth()
  }

  public static incrementHealth(context: Context, payload: number): void {
    const health = context.playerHealth

    if (!health) {
      throw new Error('Player health is undefined!')
    }

    health.incrementHealth(payload)
  }

  public static decrementHealth(context: Context, payload: number): void {
    const health = context.playerHealth

    if (!health) {
      throw new Error('Player health is undefined!')
    }

    health.decrementHealth(payload)
  }
}

const PlayerHealthApi = {
  'player_health:get_alive': Api.getAlive,
  'player_health:get_health': Api.getHealth,
  'player_health:get_max_health': Api.getMaxHealth,
  'player_health:increment': Api.incrementHealth,
  'player_health:decrement': Api.decrementHealth,
}

export default PlayerHealthApi
