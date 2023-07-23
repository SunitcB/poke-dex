import { configureStore } from "@reduxjs/toolkit";
import pokeReducer from "./PokemonSlice";

export default configureStore({
    reducer: {
        pokemon: pokeReducer
    }
})