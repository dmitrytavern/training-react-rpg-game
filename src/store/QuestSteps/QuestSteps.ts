import { makeAutoObservable } from "mobx"
import QuestStep, { StepPropsData } from '../QuestStep'
import QuestsCommander from "../QuestsCommander"

export interface StepsProps {
	data: StepPropsData[]
	questsCommander: QuestsCommander
}

class QuestSteps {
	private readonly steps: QuestStep[]

	constructor(props: StepsProps) {
		this.steps = QuestSteps.initSteps(props)

		makeAutoObservable(this)
	}

	public getAllSteps(): QuestStep[] {
		return this.steps
	}

	public getOpenedSteps(): QuestStep[] {
		const steps = this.steps
		let arr = []

		for (let i = 0; i < steps.length; i++) {
			const step = steps[i]
			const active = step.isActive()
			const finished = step.isCompleted()

			if (finished) {
				arr.push(step)
				continue
			}

			if (active) arr.push(step)
			break
		}

		return arr
	}

	public getActiveStep(): QuestStep | undefined {
		return this.steps.find((step) => step.isActive())
	}

	public canGoToNextStep(): boolean {
		const activeStep = this.getActiveStep()
		if (!activeStep) throw new Error('Active step not found!')
		return activeStep.canBeFinished()
	}

	public toNextStep() {
		if (!this.canGoToNextStep()) {
			throw new Error('Cannot go to next step')
		}

		const steps = this.steps

		for (let i = 0; i < steps.length; i++) {
			const step = steps[i]

			if (step.isActive()) {
				const nextStep = steps[i+1]
				steps[i].toFinish()
				if (nextStep) nextStep.toActivate()
				break
			}
		}
	}

	public toActivateFirstStep() {
		this.steps[0].toActivate()
	}

	private static initSteps(props: StepsProps): QuestStep[] {
		const arr = []
		for (let stepData of props.data) {
			const step = new QuestStep({
				data: stepData,
				questsCommander: props.questsCommander
			})
			arr.push(step)
		}
		return arr
	}
}

export default QuestSteps
