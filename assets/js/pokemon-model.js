class Pokemon {

    number;
    name;
    mainType;
    types = [];
    image;

    constructor(number, name, types, mainType, image) {
        this.number = number;
        this.name = name;
        this.types = types;
        this.mainType = mainType;
        this.image = image;
    }
}
