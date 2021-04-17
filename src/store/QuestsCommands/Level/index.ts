import { addExperience } from "./addExperience"
import { checkLevel, subscribeCheckLevel } from "./checkLevel"

export const actions = {
	'level:add_experience': addExperience
}

export const subscribes = {
	'level:check_level': subscribeCheckLevel
}

export const checkers = {
	'level:check_level': checkLevel
}