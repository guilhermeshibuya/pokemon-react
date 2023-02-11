import React, { useState } from "react";

const initialState = {
    search_pokemon: ""
}

const SearchBar = (props) => {
    const [fields, setFields] = useState(initialState);

    const handleFieldsChange = (e) => setFields({
        ...fields,
        [e.currentTarget.name]: e.currentTarget.value
    });

    const handleSubmit = (e) => {
        props.renderPokemon(fields.search_pokemon.toLowerCase());
        e.preventDefault();
        setFields(initialState);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                id="search_pokemon"
                name="search_pokemon"
                type="search"
                className="input__search"
                placeholder="Name or number"
                onChange={handleFieldsChange}
                value={fields.search_pokemon}
                required
            />
        </form>
    );
}

export default SearchBar;