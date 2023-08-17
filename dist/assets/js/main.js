import { GetPokemons } from "./util/GetPokemons.js";
const getPokemons = new GetPokemons();
getPokemons.action(0, 5).then(console.log);
