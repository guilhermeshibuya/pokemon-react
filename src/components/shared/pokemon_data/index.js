import React, { Fragment } from "react";

const PokemonData = (props) => {
    return (
        <Fragment>
            <div className="pokemon__id-float">{props.id}</div>
            <span className="pokemon__name"> {props.name}</span>
        </Fragment>
    );
}

export default PokemonData;
