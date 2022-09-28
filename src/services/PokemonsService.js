import { AppState } from "../AppState.js"
import { Pokemon } from "../models/Pokemon.js"
import { logger } from "../utils/Logger.js"
import { pokeServer } from "./AxiosService.js"

class PokemonsService {
  async getPokemons(pageUrl = '') {
    const res = await pokeServer.get(pageUrl)
    logger.log(res.data)
    AppState.pokemons = res.data.results
    AppState.nextPage = res.data.next
    AppState.previousPage = res.data.previous
  }

  async getActivePokemon(url) {
    const res = await pokeServer.get(url)
    logger.log(res.data)
    AppState.pokemon = new Pokemon(res.data)
  }

  // async changePage(pageUrl) {
  //   const res = await pokeServer.get(pageUrl)
  //   logger.log(res.data)
  //   AppState.pokemons = res.data.results
  //   AppState.nextPage = res.data.next
  //   AppState.previousPage = res.data.previous
  // }
}

export const pokemonsService = new PokemonsService()