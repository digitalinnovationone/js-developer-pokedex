class Pokemon {
  number;
  name;
  type;
  types = [];
  photo;
  constructor(number, name, type, types, photo) {
    this.number = number;
    this.name = name;
    this.type = type;
    this.types = types;
    this.photo = photo;
  }
}
