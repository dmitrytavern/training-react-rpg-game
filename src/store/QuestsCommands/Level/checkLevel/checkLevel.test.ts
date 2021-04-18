import PlayerLevel from '../../../PlayerLevel'
import { checkLevel } from './checkLevel'

it('Checking checker function', () => {
  const level = new PlayerLevel(1, 0)

  expect(checkLevel({ level }, 2)).toBeFalsy()

  level.addExperience(5000)

  expect(checkLevel({ level }, 2)).toBeTruthy()
  expect(checkLevel({ level }, 3)).toBeTruthy()
})
