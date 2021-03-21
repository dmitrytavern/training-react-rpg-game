import { observer } from 'mobx-react-lite'
import { useQuestsStore } from "./contexts/questsStoreContext";
import QuestStore from "./store/Quest"

const Quest = observer((props: { quest: QuestStore }) => {
	const { quest } = props
	const activeStep = quest.steps.getActiveStep()

	const nextStep = () => {
		quest.steps.toNextStep()

		if (quest.canBeFinished()) quest.toFinish()
	}

	let status = 'not active'
	if (quest.isCompleted()) status = 'completed'
	if (quest.isActive()) status = 'active'

	return (
		<div>
			<h4>{quest.title}</h4>
			<p>{quest.content}</p>
			<p>Status: {status}</p>

			Steps:
			<ul>
				{quest.steps.getOpenedSteps().map((step, i) => (
					<li key={i}>{step.title}</li>
				))}
			</ul>

			{activeStep && (
				<div>
					{activeStep.description}

					{activeStep.rewards && (
						<div>
							Your rewards:
							<ul>
								{activeStep.rewards.map((reward, i) => (
									<div key={i}>{reward.action} {JSON.stringify(reward.payload)}</div>
								))}
							</ul>
						</div>
					)}

					<button onClick={nextStep} disabled={!quest.steps.canGoToNextStep()}>Complete step</button>
				</div>
			)}
		</div>
	)
})

const AppQuests = () => {
	const quests = useQuestsStore()
	const testQuest = quests.getQuest(1)

	const activateQuest = () => {
		quests.toActivateQuestGroup('QUEST_GROUP_INVENTORY_TUTORIAL')
	}

	const disabledActivateButton = testQuest.isActive() || testQuest.isCompleted()
	return (
		<div>
			<h2>Quests</h2>

			<div>
				<button onClick={activateQuest} disabled={disabledActivateButton}>Activate quest</button>
			</div>

			<h3>Active quests:</h3>

			<div>
				{quests.getActiveQuests().map((quest: QuestStore, i) => (
						<Quest key={i} quest={quest} />
				))}
			</div>

			<h3>Completed quests:</h3>

			<div>
				{quests.getFinishedQuests().map((quest: QuestStore, i) => (
					<div key={i}>{quest.title}</div>
				))}
			</div>
		</div>
	)
}

export default observer(AppQuests)
