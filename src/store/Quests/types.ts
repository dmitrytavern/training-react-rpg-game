import PlayerLevel from '../PlayerLevel'
import PlayerInventory from '../PlayerInventory'
import PlayerBalance from '../PlayerBalance'

export interface QuestsProps {
  playerLevel: PlayerLevel
  playerInventory: PlayerInventory
  playerBalance: PlayerBalance
}
