import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "./HttpCall";

export const PokemonSlice = createSlice({
    name: "pokemon",
    initialState: {
        pokeData: [],
        pokeSet: []
    },
    reducers: {
        addPokeData: (state, { payload }) => {
            state.pokeData = [...state.pokeData, payload]
        },
        setPokeData: (state, { payload }) => {
            state.pokeSet = state.pokeData.find(x => x.id === payload).evoData
        }
    }
});

export const { addPokeData, setPokeData } = PokemonSlice.actions;

export function preparePokemonList(evoId, isPrev = false) {
    return async (dispatch) => {
        let pokemonList = []

        let evoData = await fetchData("https://pokeapi.co/api/v2/evolution-chain/" + evoId);
        let evoChain = []
        let pokeUrl = evoData.chain.species.url
        let speciesData = await fetchData(pokeUrl)
        pokeUrl = "https://pokeapi.co/api/v2/pokemon/" + pokeUrl.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", "")
        let pokeData = await fetchData(pokeUrl)

        evoChain.push({
            name: evoData.chain.species.name.toUpperCase(),
            image: pokeData.sprites.other.home.front_default ? pokeData.sprites.other.home.front_default : pokeData.sprites.other["official-artwork"].front_default,
            description: speciesData.flavor_text_entries[0].flavor_text
        })
        if (evoData.chain.evolves_to.length > 0) {
            pokeUrl = evoData.chain.evolves_to[0].species.url
            let speciesData = await fetchData(pokeUrl)
            pokeUrl = "https://pokeapi.co/api/v2/pokemon/" + pokeUrl.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", "")
            pokeData = await fetchData(pokeUrl)
            evoChain.push({
                name: evoData.chain.evolves_to[0].species.name.toUpperCase(),
                image: pokeData.sprites.other.home.front_default ? pokeData.sprites.other.home.front_default : pokeData.sprites.other["official-artwork"].front_default,
                description: speciesData.flavor_text_entries[0].flavor_text
            })

            if (evoData.chain.evolves_to[0].evolves_to.length > 0) {
                pokeUrl = evoData.chain.evolves_to[0].evolves_to[0].species.url
                let speciesData = await fetchData(pokeUrl)
                pokeUrl = "https://pokeapi.co/api/v2/pokemon/" + pokeUrl.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", "")
                pokeData = await fetchData(pokeUrl)
                evoChain.push({
                    name: evoData.chain.evolves_to[0].evolves_to[0].species.name.toUpperCase(),
                    image: pokeData.sprites.other.home.front_default ? pokeData.sprites.other.home.front_default : pokeData.sprites.other["official-artwork"].front_default,
                    description: speciesData.flavor_text_entries[0].flavor_text
                })

            }
        }
        if (!isPrev) {
            dispatch(addPokeData({ id: evoId, evoData: evoChain }));
        }

        dispatch(setPokeData(evoId));
    }
}

export default PokemonSlice.reducer

// let pokeUrl = pUrl.url
//         console.log(pokeUrl)
//         let pokeData = await fetchData(pokeUrl)
//         console.log(pokeData)
//         let speciesUrl = pokeData.species.url
//         console.log(speciesUrl)
//         let speciesData = await fetchData(speciesUrl)
//         console.log("AAAAAA")
//         console.log(speciesData)
//         console.log(speciesData.evolution_chain);