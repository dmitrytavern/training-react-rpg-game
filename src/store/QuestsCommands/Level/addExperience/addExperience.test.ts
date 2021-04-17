import PlayerLevel from '../../../PlayerLevel'
import { addExperience } from './addExperience'

it('Checking execute function', () => {
  const level = new PlayerLevel(1, 0)

  addExperience({ level }, 50)

  expect(level.getExperience()).toBe(50)

  addExperience({ level }, 50)

  expect(level.getExperience()).toBe(0)
  expect(level.getLevel()).toBe(2)
})
