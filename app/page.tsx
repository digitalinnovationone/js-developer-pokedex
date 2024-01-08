'use client';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState<any>();
  const [pokeName, setPokeName] = useState<string>('');
  const [pokeImage, setPokeImage] = useState<string>('');
  const [pokeWeight, setPokeWeight] = useState<string>('');
  const [pokeNumber, setPokeNumber] = useState<number>(1);
  const URL = `https://pokeapi.co/api/v2/pokemon/${pokeNumber}`;

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        setData(response.data);
        setPokeName(response.data.name);
        setPokeImage(response.data.sprites.other.dream_world.front_default);
        setPokeWeight(response.data.weight);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [URL]);

  console.log(data);

  return data ? (
    <main>
      <input
        type='number'
        onChange={(e) => {
          setPokeNumber(parseInt(e.target.value));
        }}
      />
      <h1>Pokemon</h1>
      {pokeName}
      <p>weight {pokeWeight}</p>
      <Image
        src={pokeImage}
        alt={pokeName}
        width={120}
        height={120}
      />
      <p>Abilities: </p>
      {data &&
        data.abilities.map((value: any, key: string) => {
          return <div key={key}>{value.ability.name}</div>;
        })}
    </main>
  ) : (
    <h1>Loading...</h1>
  );
}
