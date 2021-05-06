import { GetStaticProps } from 'next';
import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { PokemonFindContext } from './_app';
import Pokecard from '../components/pokecard/Pokecard';

export default function Home({
  allPostsData
}: {
  allPostsData: {
    date: string;
    title: string;
    id: string;
  }[];
}) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <PokemonFindContext.Consumer>
        {({ pokemonsFound, loadPokemons }) =>
          pokemonsFound.map((pokemonFound: BasicPokemonResponse) => (
            <Pokecard pokeFound={pokemonFound} />
          ))
        }
      </PokemonFindContext.Consumer>
    </Box>
  );
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  }
});
