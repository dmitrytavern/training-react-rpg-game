import Quests from './Quests'
import QuestsGroup from '../QuestsGroup'

interface Context {
  quests?: Quests
}

class Api {
  public static getQuestGroup(context: Context, payload: number): QuestsGroup {
    const quests = context.quests

    if (!quests) {
      throw new Error('Quests is undefined')
    }

    return quests.getQuestGroup(payload)
  }

  public static getActiveQuestGroups(context: Context): QuestsGroup[] {
    const quests = context.quests

    if (!quests) {
      throw new Error('Quests is undefined')
    }

    return quests.getActiveQuestGroups()
  }

  public static getCompletedQuestGroups(context: Context): QuestsGroup[] {
    const quests = context.quests

    if (!quests) {
      throw new Error('Quests is undefined')
    }

    return quests.getCompletedQuestGroups()
  }

  public static getDoneQuestGroups(context: Context): QuestsGroup[] {
    const quests = context.quests

    if (!quests) {
      throw new Error('Quests is undefined')
    }

    return quests.getDoneQuestGroups()
  }

  public static checkQuestGroup(context: Context, payload: number): boolean {
    const quests = context.quests

    if (!quests) {
      throw new Error('Quests is undefined')
    }

    return quests.checkQuestGroup(payload)
  }

  public static activateQuest(context: Context, payload: { groupId: number; questId: number }) {
    const quests = context.quests

    if (!quests) {
      throw new Error('Quests is undefined')
    }

    quests.toActivateQuest(payload.groupId, payload.questId)
  }

  public static doQuest(context: Context, payload: { groupId: number; questId: number }) {
    const quests = context.quests

    if (!quests) {
      throw new Error('Quests is undefined')
    }

    quests.toDoQuest(payload.groupId, payload.questId)
  }
}

const QuestsApi = {
  'quests:get_guest_group': Api.getQuestGroup,
  'quests:get_active_guest_groups': Api.getActiveQuestGroups,
  'quests:get_completed_guest_groups': Api.getCompletedQuestGroups,
  'quests:get_done_guest_groups': Api.getDoneQuestGroups,
  'quests:check_quest_group_requirements': Api.checkQuestGroup,
  'quests:activate_quest': Api.activateQuest,
  'quests:do_quest': Api.doQuest,
}

export default QuestsApi
