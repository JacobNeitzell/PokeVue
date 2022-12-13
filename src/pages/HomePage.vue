<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3">
        <ul class="pokelist elevation-5">
          <li v-for="p in pokemons" :key="p.name" >
            <button @click="getActivePokemon(p.url)" class="btn my-1 rounded poketag elevation-5">
              {{ p.name }}
            </button>
          </li>
        </ul>
        <button @click="changePage(previousPage)" :disabled="!previousPage" class="btn btn-danger me-2"
          :class="{ 'disabled': !previousPage }">Previous</button>
        <button @click="changePage(nextPage)" :disabled="!nextPage"
          :class="`btn btn-danger ${!nextPage ? 'btn-info' : ''}`">Next</button>
      </div>
      <!-- NOTE will not break page when trying to dig into a null property  use v-if or elvis (?) -->
      <div v-if="pokemon" class="col-9 activepoke ">
        <img :src="pokemon?.img" alt="" class="img-fluid">
        <div>{{ pokemon?.name }}</div>
        <div class="d-flex gap-3">
          <img v-for="t in pokemon?.types" :key="t"
            :src="`https://jakeoverall.github.io/who-is-that-pokemon/assets/img/types/${t.type?.name}.webp`" alt=""
            height="64" :title="t.type?.name">
        </div>
        <img v-for="s in pokemon?.sprites" :src="s" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { logger } from '../utils/Logger.js';
import { pokemonsService } from '../services/PokemonsService.js'
import Pop from '../utils/Pop.js';
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';

export default {
  setup() {
    async function getPokemons() {
      try {
        await pokemonsService.getPokemons()
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }
    getPokemons()
    return {
      // NOTE this is bad, don't do this
      pokemons: computed(() => AppState.pokemons),
      // NOTE this is bad, don't do this
      pokemon: computed(() => AppState.pokemon),
      nextPage: computed(() => AppState.nextPage),
      previousPage: computed(() => AppState.previousPage),
      async changePage(pageUrl) {
        try {
          await pokemonsService.getPokemons(pageUrl)
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },
      async getActivePokemon(url) {
        try {
          await pokemonsService.getActivePokemon(url)
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.pokelist {
  background-color: rgba(11, 81, 146, 0.737);
}

.activepoke {
  background-image: url("https://static.vecteezy.com/system/resources/thumbnails/003/520/597/original/abstract-background-with-various-beautiful-shapes-free-video.jpg");
}

.poketag {
  color: rgba(39, 39, 210, 0.799);
  text-shadow: 1px 1px rgb(21, 22, 30), 0px 0px 5px rgba(71, 0, 249, 0.74);
  border-style: solid;
  border-color: rgba(187, 30, 30, 0.77);
  border-radius: 20%;
  background-color: rgba(192, 189, 189, 0.352);
  font-weight: bold;
  letter-spacing: 0.08rem
}
</style>
