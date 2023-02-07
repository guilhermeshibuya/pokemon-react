import React from "react";

const PokemonTypes = (props) => {
    return (
        <div className="pokemon__types-container">
            {
                props.types.map((type, index) => (
                    <span key={index} className="pokemon__type" style={{backgroundColor: props.colors[index]}}>{type['type']['name']}</span>
                ))
            }
        </div>
    );  
}  

export default PokemonTypes;