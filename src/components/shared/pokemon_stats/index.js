import React, { Fragment } from "react";

const PokemonStats = (props) => {
    if (props.stats === "hp") {
        return (
            <Fragment>
                <div className={props.css}>
                    <div id={props.stats + "-stats"}>{props.stats}</div>
                    <div id={props.stats + "-value"}>{props.value}</div>
                </div> 
            </Fragment>
        );
        
    }
    return (
        <Fragment>
            <div className={props.css}>     
                <div id={props.stats + "-value"}>{props.value}</div>
                <div id={props.stats + "-stats"}>{props.stats}</div>
            </div> 
        </Fragment>
    ); 
}

export default PokemonStats;