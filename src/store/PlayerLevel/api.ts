import PlayerLevel from './PlayerLevel'

interface Context {
  playerLevel?: PlayerLevel
}

class Api {
  public static getLevel(context: Context): number {
    const level = context.playerLevel

    if (!level) {
      throw new Error('Inventory is undefined')
    }

    return level.getLevel()
  }

  public static getExperience(context: Context): number {
    const level = context.playerLevel

    if (!level) {
      throw new Error('Inventory is undefined')
    }

    return level.getExperience()
  }

  public static getExperienceForLevelUp(context: Context): number {
    const level = context.playerLevel

    if (!level) {
      throw new Error('Inventory is undefined')
    }

    return level.getExperienceForLevelUp()
  }

  public static addExperience(context: Context, payload: number) {
    const level = context.playerLevel

    if (!level) {
      throw new Error('Inventory is undefined')
    }

    level.addExperience(payload)
  }

  public static checkLevel(context: Context, payload: number): boolean {
    const level = context.playerLevel

    if (!level) {
      throw new Error('Inventory is undefined')
    }

    return level.getLevel() >= payload
  }

  public static calculateExperience(context: Context, payload: number): number {
    const level = context.playerLevel

    if (!level) {
      throw new Error('Inventory is undefined')
    }

    return level.calculateExperience(payload)
  }
}

const PlayerLevelApi = {
  'player_level:get_level': Api.getLevel,
  'player_level:get_experience': Api.getExperience,
  'player_level:get_experience_max': Api.getExperienceForLevelUp,
  'player_level:add_experience': Api.addExperience,
  'player_level:check_level': Api.checkLevel,
  'player_level:calculate_experience': Api.calculateExperience,
}

export default PlayerLevelApi
