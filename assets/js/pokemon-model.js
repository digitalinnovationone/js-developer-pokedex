class Pokemon {
    constructor(id, name, types, img) {
        this.id = id;
        this.name = name;
        this.types = types.map(typeSlot => typeSlot.type.name[0].toUpperCase() + typeSlot.type.name.substring(1));
        this.type = this.types[0];
        this.img = img;
    }
}
