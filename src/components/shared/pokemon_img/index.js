import React from "react";

const PokemonImg = (props) => {
    return (
        <img
            src={props.img_url}
            className="pokemon__img"
            alt={props.img_alt}
        />
    );
}

export default PokemonImg;