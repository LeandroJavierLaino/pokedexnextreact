import React, { FunctionComponent, useState } from 'react';

import { IconButton, InputAdornment, OutlinedInput } from '@material-ui/core';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import { getPokemons } from '../../lib/api';
import { PokemonFindContext } from '../../pages/_app';
// import { PokemonFindContext } from '../../App';

interface SearchInputInterface {}

type SearchInputProps = SearchInputInterface;

const SearchInput: FunctionComponent<SearchInputProps> = (props) => {
  const [search, setSearch] = useState<string>('');

  const handleClickSearch = async (
    loadPokemons: (pokeFounds: BasicPokemonResponse[]) => void
  ) => {
    if (search) {
      const fetchingPokemon = await getPokemons(search);
      loadPokemons(fetchingPokemon);
    } else {
      loadPokemons([]);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
  ) => {
    setSearch(event ? event.target.value : '');
  };

  return (
    <PokemonFindContext.Consumer>
      {({ pokemonsFound, loadPokemons }) => (
        <OutlinedInput
          id="outlined-adornment-search"
          type={'text'}
          value={search}
          onChange={handleChange}
          placeholder="Find pokemons by name . . . "
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="search pokemon"
                onClick={() => handleClickSearch(loadPokemons)}
                edge="end"
              >
                {<SearchRoundedIcon />}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={70}
        ></OutlinedInput>
      )}
    </PokemonFindContext.Consumer>
  );
};

export default SearchInput;
