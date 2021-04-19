import { observer } from 'mobx-react-lite'
import { useCommander } from '../contexts/commanderStoreContext'
import QuestsGroupStore from '../store/QuestsGroup'

const QuestList = observer((props: { quests: QuestsGroupStore['quests'] }) => {
  const { quests } = props
  const array = []

  for (let i = 0; i < quests.length; i++) {
    const quest = quests[i]

    array.push(<li key={i}>{quest.meta.title}</li>)

    if (quest.getStatus() === 'done') continue
    break
  }

  return <ul>{array}</ul>
})

const QuestGroup = observer((props: { group: QuestsGroupStore }) => {
  const app = useCommander()
  const { group } = props
  const activeQuest = group.getActiveQuest()

  const toDoQuest = (groupId: number, questId: number) => {
    app.execute('quests:do_quest', { groupId, questId })
  }

  return (
    <div>
      <h4>{group.meta.title}</h4>
      <p>{group.meta.description}</p>
      Steps:
      <QuestList quests={group.quests} />
      {activeQuest && (
        <div>
          {activeQuest.meta.description}

          {activeQuest.rewards && (
            <div>
              Your rewards:
              <ul>
                {activeQuest.rewards.map((reward, i) => (
                  <div key={i}>
                    {reward.action} {JSON.stringify(reward.payload)}
                  </div>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={() => toDoQuest(group.id, activeQuest.id)}
            disabled={activeQuest.getStatus() !== 'completed'}
          >
            Complete step
          </button>
        </div>
      )}
    </div>
  )
})

const BlockQuests = () => {
  const app = useCommander()
  const inventoryQuest = app.execute('quests:get_guest_group', 1)
  const playerQuest = app.execute('quests:get_guest_group', 2)
  const inventoryQuestStatus = inventoryQuest.getStatus()
  const playerQuestStatus = playerQuest.getStatus()

  const activateInventoryQuest = () => {
    app.execute('quests:activate_quest', { groupId: 1, questId: 1 })
  }

  const activatePlayerQuest = () => {
    app.execute('quests:activate_quest', { groupId: 2, questId: 1 })
  }

  const completedQuests = app.execute('quests:get_completed_guest_groups')
  const activeQuests = app.execute('quests:get_active_guest_groups')
  const doneQuests = app.execute('quests:get_done_guest_groups')

  const disabledActivateButtonInventory =
    inventoryQuestStatus === 'active' ||
    inventoryQuestStatus === 'completed' ||
    inventoryQuestStatus === 'done' ||
    !app.execute('quests:check_quest_group_requirements', 1)

  const disabledActivateButtonPlayer =
    playerQuestStatus === 'active' ||
    playerQuestStatus === 'completed' ||
    playerQuestStatus === 'done' ||
    !app.execute('quests:check_quest_group_requirements', 2)

  return (
    <div>
      <h2>Quests</h2>

      <div>
        <button onClick={activateInventoryQuest} disabled={disabledActivateButtonInventory}>
          Activate quest INVENTORY_TUTORIAL
        </button>
        <button onClick={activatePlayerQuest} disabled={disabledActivateButtonPlayer}>
          Activate quest PLAYER_TUTORIAL
        </button>
      </div>

      <h3>Completed quests:</h3>

      <div>
        {completedQuests.map((quest: QuestsGroupStore, i) => (
          <QuestGroup key={i} group={quest} />
        ))}
      </div>

      <h3>Active quests:</h3>
      <div>
        {activeQuests.map((quest: QuestsGroupStore, i) => (
          <QuestGroup key={i} group={quest} />
        ))}
      </div>

      <h3>Completed quests:</h3>

      <div>
        {doneQuests.map((quest: QuestsGroupStore, i) => (
          <div key={i}>{quest.meta.title}</div>
        ))}
      </div>
    </div>
  )
}

export default observer(BlockQuests)
