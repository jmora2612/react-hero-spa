import { heroes } from "../data/heroes"

export const getHeroesById = (id) => {
    return heroes.find((el) => el.id === id)
}
