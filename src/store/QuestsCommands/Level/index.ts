import { addExperience } from './addExperience'
import { checkLevel } from './checkLevel'

export const actions = {
  'level:add_experience': addExperience,
}

export const checkers = {
  'level:check_level': checkLevel,
}
