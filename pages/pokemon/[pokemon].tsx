import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  createStyles,
  Divider,
  makeStyles,
  Typography
} from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import { getPokemon } from '../../lib/api';

function Pokemon() {
  const router = useRouter();
  const { pokemon } = router.query;

  const [pokemonStats, setPokemon] = useState<PokemonCard>({
    id: 0,
    name: '',
    sprites: { front_default: '' }
  });

  const classes = useStyles();

  useEffect(() => {
    const retrievePokemon = async () => {
      const poke = await getPokemon(pokemon as string);
      setPokemon({
        id: poke.id,
        name: poke.name,
        sprites: poke.sprites,
        height: poke.height,
        weight: poke.weight,
        skills: poke.abilities.map((ability: AbilitySlot) => {
          return {
            name: ability.ability.name
          };
        }),
        types: poke.types
      });
    };

    retrievePokemon();
  }, [pokemon]);

  return (
    <Card className={classes.root}>
      <CardHeader
        title={pokemonStats.name}
        subheader={`#${pokemonStats.id}`}
        avatar={
          <Avatar>{pokemonStats.name[0] + pokemonStats.name.slice(-1)}</Avatar>
        }
      />
      <CardMedia style={{ height: 320 }}>
        <img
          className={classes.media}
          src={pokemonStats.sprites.front_default}
          alt="poke.sprite"
        ></img>
      </CardMedia>
      <CardContent>
        <Divider />
        <Divider />
        <Typography>{'Physical Characteristics'}</Typography>
        <Divider light />
        <Typography>{`Weight : ${pokemonStats.weight}`}</Typography>
        <Typography>{`Height : ${pokemonStats.height}`}</Typography>
        <Divider />
        <Divider />
        <Typography>{'Skills'}</Typography>
        <Divider light />
        {pokemonStats.skills?.map((skill: Skill, index: number) => (
          <Typography>{`[${index}] : ${skill.name}`}</Typography>
        ))}
        <Divider />
        <Divider />
        <Typography>{'Types'}</Typography>
        <Divider light />
        {pokemonStats.types?.map((type: TypeSlot, index: number) => (
          <Typography>{`[${index}] : ${type.type.name}`}</Typography>
        ))}
      </CardContent>
    </Card>
  );
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      maxWidth: 450,
      padding: theme.spacing(2),
      margin: theme.spacing(2)
    },
    media: {
      width: 320,
      height: 320
    }
  })
);

export default Pokemon;
