import PlayerFavorites from "./PlayerFavorites"

it('Check base properties', () => {
	const favorite = new PlayerFavorites()

	expect(favorite.getItems()).toEqual([])
})

it('Check getting items', () => {
	const favorite = new PlayerFavorites()

	favorite.setItem(1)

	expect(favorite.getItems()).toEqual([1])

	favorite.setItem(2)

	expect(favorite.getItems()).toEqual([1, 2])

	favorite.unsetItem(1)

	expect(favorite.getItems()).toEqual([2])

	favorite.unsetItem(2)

	expect(favorite.getItems()).toEqual([])
})

it('Check existing', () => {
	const favorite = new PlayerFavorites()

	expect(favorite.exists(1)).toBeFalsy()

	favorite.setItem(1)

	expect(favorite.exists(1)).toBeTruthy()

	favorite.unsetItem(1)

	expect(favorite.exists(1)).toBeFalsy()
})