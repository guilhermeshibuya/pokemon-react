import React, { Fragment, useState, useEffect } from "react";
import PokemonData from "../shared/pokemon_data";
import PokemonImg from "../shared/pokemon_img";
import PokemonStats from "../shared/pokemon_stats";
import PokemonTypes from "../shared/pokemon_types";
import SearchBar from "../shared/search_bar";
import "../shared/style.css";

const typeColor = {
    bug: "#26de81",
    dragon: "#ff2aa7",
    electric: "#fed330",
    fairy: "#ff0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#efb549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190ff",
    steel: "#b8b8d0"
}

const fetchPokemon = async (pokemon) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
    if (response.status === 200) {
        const data = await response.json();
        return data;
    }
}

const initialStats = [];
const initialTypes = [];
for (let i = 0; i < 6; i++) {
    initialStats.push(
        {
            base_stat: 0,
            // effort: 0,
            stat: {
                name: ""
            }
        }
    );
}

for (let i = 0; i < 2; i++) {
    initialTypes.push(
        {
            type: {
                name: ""
            }
        }
    )
}

const PokemonInfo = () => {
    const [pokemonData, setPokemonData] = useState({});
    const [pokemonNumber, setPokemonNumber] = useState(1);
    const [pokemonImg, setPokemonImg] = useState('');
    const [pokemonStats, setPokemonStats] = useState(initialStats);
    const [pokemonTypes, setPokemonTypes] = useState(initialTypes);
    const [themeColor, setThemeColor] = useState([]);

    useEffect(() => {
        renderPokemon(pokemonNumber);
    }, [pokemonNumber]);

    const renderPokemon = async (pokemon) => {
        await fetchPokemon(pokemon).then(data => {
            setPokemonData(data);
            setPokemonImg(data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']);
            setPokemonNumber(data['id']);
            setPokemonStats(data['stats']);
            setPokemonTypes(data['types']);

            let colors = [];
            data['types'].forEach(type => {
                colors.push(typeColor[type['type']['name']]);
            });

            setThemeColor(colors);

        }).catch(() => {
            setPokemonData({
                name: 'Not found :/'
            });
        });
    }

    const previousPokemon = () => {
        pokemonData['name'] = 'Loading...';
        if (pokemonNumber > 1) {
            setPokemonNumber(pokemonData['id'] - 1);
        }
    }

    const nextPokemon = () => {
        pokemonData['name'] = 'Loading...';
        setPokemonNumber(pokemonData['id'] + 1);
    }

    return (
        <Fragment>
            <SearchBar
                renderPokemon={renderPokemon}
            />
            <div className="container">
                <button className="btn btn-left" onClick={previousPokemon}>aa</button>
                <div className="pokemon__card" style={{ background: `radial-gradient(circle at 50% 0%, ${themeColor[0]} 43%, #ffffff 43%)` }}>
                    <PokemonStats
                        value={pokemonStats[0]['base_stat']}
                        stats={pokemonStats[0]['stat']['name']}
                        css="pokemon__stat-float"
                    />
                    <PokemonImg
                        img_url={pokemonImg}
                        img_alt={pokemonData['name']}
                    />
                    <PokemonData
                        id={pokemonNumber}
                        name={pokemonData['name']}
                    />
                    <PokemonTypes
                        types={pokemonTypes}
                        colors={themeColor}
                    />
                    <div className="pokemon__stats-container">
                        <PokemonStats
                            value={pokemonStats[1]['base_stat']}
                            stats={pokemonStats[1]['stat']['name']}
                            css="pokemon__stat-container"
                        />
                        <PokemonStats
                            value={pokemonStats[2]['base_stat']}
                            stats={pokemonStats[2]['stat']['name']}
                            css="pokemon__stat-container"
                        />
                        <PokemonStats
                            value={pokemonStats[5]['base_stat']}
                            stats={pokemonStats[5]['stat']['name']}
                            css="pokemon__stat-container"
                        />
                    </div>
                </div>
                <button className="btn btn-right" onClick={nextPokemon}></button>
            </div>
        </Fragment>
    );
}

export default PokemonInfo;