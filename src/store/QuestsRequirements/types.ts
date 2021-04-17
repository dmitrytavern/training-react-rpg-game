import {IReactionDisposer} from "mobx"

export interface QuestAction {
	action: string
	payload: any
}

export interface QuestsRequirementsData {
	[key: string]: {
		values: boolean[]
		disposers: IReactionDisposer[]
	}
}