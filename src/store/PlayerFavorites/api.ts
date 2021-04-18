import PlayerFavorites from './PlayerFavorites'

interface Context {
  playerFavorites?: PlayerFavorites
}

class Api {
  public static getItems(context: Context) {
    const favorites = context.playerFavorites

    if (!favorites) {
      throw new Error('PlayerFavorites is undefined')
    }

    return favorites.getItems()
  }

  public static setItem(context: Context, payload: number) {
    const favorites = context.playerFavorites

    if (!favorites) {
      throw new Error('PlayerFavorites is undefined')
    }

    favorites.setItem(payload)
  }

  public static unsetItem(context: Context, payload: number) {
    const favorites = context.playerFavorites

    if (!favorites) {
      throw new Error('PlayerFavorites is undefined')
    }

    favorites.unsetItem(payload)
  }

  public static hasItem(context: Context, payload: number): boolean {
    const favorites = context.playerFavorites

    if (!favorites) {
      throw new Error('PlayerFavorites is undefined')
    }

    return favorites.exists(payload)
  }
}

const PlayerFavoritesApi = {
  'player_favorites:get_all_items': Api.getItems,
  'player_favorites:set_item': Api.setItem,
  'player_favorites:unset_item': Api.unsetItem,
  'player_favorites:has_item': Api.hasItem,
}

export default PlayerFavoritesApi
