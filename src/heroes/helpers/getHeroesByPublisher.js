import { heroes } from "../data/heroes";

export const getHeroesByPublisher = (publisher) => {
    const validPublish = ['DC Comics','Marvel Comics'];
    if(!validPublish.includes(publisher)){
        throw new Error(`${publisher} no se encuentra disponible`);
    }
    return heroes.filter((el) => el.publisher === publisher)
}