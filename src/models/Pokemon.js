export class Pokemon {
  constructor (data) {
    this.name = data.name
    this.img = data.sprites.other.dream_world.front_default
    this.types = data.types
    this.sprites = {}
    for (const key in data.sprites) {
      let sprite = data.sprites[key]
      if (sprite && typeof sprite == 'string') {
        this.sprites[key] = sprite
      }
    }
  }
}