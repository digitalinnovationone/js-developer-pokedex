
class Pokemon {
    number;
    name;
    type;
    types = [];
    photo;
}

class PokemonDetails {
    constructor(name, order, height, weight, status = [], types = [], photo){
        this.name = name;
        this.order = order;
        this.height = height;
        this.weight = weight;
        this.status = status;
        this.types = types;
        this.photo = photo;
    }
}