import '../styles/global.css';
import { AppProps } from 'next/app';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { blue, red } from '@material-ui/core/colors';
import React, { useState } from 'react';
import CustomAppBar from '../components/customAppBar/CustomAppBar';

const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: blue
  }
});

export const PokemonFindContext = React.createContext({
  pokemonsFound: [] as BasicPokemonResponse[],
  loadPokemons(pokeFounds: BasicPokemonResponse[]) {}
});

export default function App({ Component, pageProps }: AppProps) {
  const [pokemons, setPokemons] = useState<BasicPokemonResponse[]>([]);

  const loadPokemons = (pokeFounds: BasicPokemonResponse[]) => {
    setPokemons(pokeFounds);
  };

  return (
    <PokemonFindContext.Provider
      value={{ pokemonsFound: pokemons, loadPokemons }}
    >
      <ThemeProvider theme={theme}>
        <CustomAppBar></CustomAppBar>
        <Component {...pageProps} />
      </ThemeProvider>
    </PokemonFindContext.Provider>
  );
}
