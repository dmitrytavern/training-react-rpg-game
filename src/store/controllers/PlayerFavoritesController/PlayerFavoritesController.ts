import Controller from '../Controller'
import PlayerFavorites from '../../models/PlayerFavorites'

@Controller([
  PlayerFavorites
])
class PlayerFavoritesController {
  constructor(
    private playerFavorites: PlayerFavorites
  ) {}

  public getAll() {
    return this.playerFavorites.getItems()
  }

  public set(uuid: string) {
    this.playerFavorites.setItem(uuid)
  }

  public unset(uuid: string) {
    this.playerFavorites.unsetItem(uuid)
  }

  public exists(uuid: string): boolean {
    return this.playerFavorites.exists(uuid)
  }
}

export default PlayerFavoritesController
