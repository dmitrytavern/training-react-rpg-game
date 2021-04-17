import { observer } from 'mobx-react-lite'
import { useQuestsStore } from './contexts/questsStoreContext'
import QuestsGroupStore from './store/QuestsGroup'

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
  const { group } = props
  const quests = useQuestsStore()
  const activeQuest = group.getActiveQuest()

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
            onClick={() => quests.toDoQuest(group.id, activeQuest.id)}
            disabled={activeQuest.getStatus() !== 'completed'}
          >
            Complete step
          </button>
        </div>
      )}
    </div>
  )
})

const AppQuests = () => {
  const quests = useQuestsStore()
  const inventoryQuest = quests.getQuestGroup(1)
  const playerQuest = quests.getQuestGroup(2)
  const inventoryQuestStatus = inventoryQuest.getStatus()
  const playerQuestStatus = playerQuest.getStatus()

  const activateInventoryQuest = () => {
    quests.toActivateQuest(1, 1)
  }

  const activatePlayerQuest = () => {
    quests.toActivateQuest(2, 1)
  }

  const disabledActivateButtonInventory =
    inventoryQuestStatus === 'active' ||
    inventoryQuestStatus === 'completed' ||
    inventoryQuestStatus === 'done' ||
    !quests.checkQuestGroup(1)

  const disabledActivateButtonPlayer =
    playerQuestStatus === 'active' ||
    playerQuestStatus === 'completed' ||
    playerQuestStatus === 'done' ||
    !quests.checkQuestGroup(2)

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
        {quests.getCompletedQuestGroups().map((quest: QuestsGroupStore, i) => (
          <QuestGroup key={i} group={quest} />
        ))}
      </div>

      <h3>Active quests:</h3>
      <div>
        {quests.getActiveQuestGroups().map((quest: QuestsGroupStore, i) => (
          <QuestGroup key={i} group={quest} />
        ))}
      </div>

      <h3>Completed quests:</h3>

      <div>
        {quests.getDoneQuestGroups().map((quest: QuestsGroupStore, i) => (
          <div key={i}>{quest.meta.title}</div>
        ))}
      </div>
    </div>
  )
}

export default observer(AppQuests)
