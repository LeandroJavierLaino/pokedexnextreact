import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  createStyles,
  IconButton,
  makeStyles
} from '@material-ui/core';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { getPokemon } from '../../lib/api';
import AssessmentRoundedIcon from '@material-ui/icons/AssessmentRounded';
import { useRouter } from 'next/dist/client/router';

interface PokecardInterface {
  pokeFound: BasicPokemonResponse;
}

type PokecardProps = PokecardInterface;

const Pokecard: FunctionComponent<PokecardProps> = (props) => {
  const [pokemon, setPokemon] = useState<PokemonCard>({
    id: 0,
    name: '',
    sprites: { front_default: '' }
  });
  const router = useRouter();
  const classes = useStyles();

  useEffect(() => {
    const retrievePokemon = async () => {
      const poke = await getPokemon(props.pokeFound.name);
      setPokemon({ id: poke.id, name: poke.name, sprites: poke.sprites });
    };

    retrievePokemon();
  }, [props.pokeFound.name]);

  const openPokestats = () => {
    router.push(`/pokemon/${pokemon.name}`);
    // setOpenStats(true);
  };

  return (
    <Card className={classes.root}>
      <CardHeader title={pokemon.name} subheader={`#${pokemon.id}`} />

      <CardMedia
        className={classes.media}
        image={pokemon?.sprites.front_default}
      />

      <CardActions>
        <IconButton onClick={openPokestats} color="secondary">
          <AssessmentRoundedIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: 450,
      padding: theme.spacing(2),
      margin: theme.spacing(2)
    },
    media: {
      height: 450
    }
  })
);

export default Pokecard;
