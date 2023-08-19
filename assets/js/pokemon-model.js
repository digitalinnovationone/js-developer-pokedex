/**
 * Pokemon model
 * @param {number} number
 * @param {string} name
 * @param {string} type
 * @param {string[]} types
 * @param {string} photo
 * @param {object[]} stats
 */
class Pokemon {
  number;
  name;
  type;
  types = [];
  photo;
  stats = [];

  constructor(number, name, type, types, photo ,stats) {
    this.number = number;
    this.name = name;
    this.type = type;
    this.types = types;
    this.photo = photo;
    this.stats = stats;
  }
}
