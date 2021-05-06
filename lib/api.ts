import axios from 'axios';
import { API_DOMAIN, POKEMON_URL } from '../config/constanst';

const api = axios.create({ baseURL: API_DOMAIN });

export const getPokemons = async (name: string) => {
  const response = await api.get(`${POKEMON_URL}?offset=0&limit=1118`);
  if (response.data)
    return response.data.results.filter((responseData: any) =>
      responseData.name.includes(name)
    );
};

export const getPokemon = async (name: string) => {
  const response = await api.get(`${POKEMON_URL}${name}`);
  return response.data;
};
