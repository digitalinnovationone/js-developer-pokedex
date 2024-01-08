'use client';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import Image from 'next/image';
import { ReactNode, useEffect, useState } from 'react';

interface IPokeInfo {
  name: string;
  image: string;
  weight: number;
}

export default function Home() {
  const [data, setData] = useState<any>();
  const [pokeInfo, setPokeInfo] = useState<IPokeInfo>({
    name: '',
    image: '',
    weight: 0,
  });
  const [pokeNumber, setPokeNumber] = useState<number>(1);
  const URL = `https://pokeapi.co/api/v2/pokemon/${pokeNumber}`;

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        setData(response.data);
        setPokeInfo({
          name: response.data.name,
          image: response.data.sprites.other.dream_world.front_default,
          weight: response.data.weight,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [URL]);

  return pokeInfo ? (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%',
      }}>
      <Input
        type='number'
        onChange={(e) => {
          setPokeNumber(parseInt(e.target.value));
        }}
        style={{
          maxWidth: 500,
        }}
      />
      <p style={{ marginTop: 20 }}>Name: {pokeInfo.name}</p>
      <p>Weight: {pokeInfo.weight}</p>
      <p>
        Types:{' '}
        {data &&
          data.types.map((value: any, key: string) => {
            return <div key={key}>{value.type.name}</div>;
          })}
      </p>
      <Image
        src={pokeInfo.image}
        alt={pokeInfo.name}
        width={130}
        height={130}
      />
      <p style={{ marginTop: 20 }}>Abilities: </p>
      {data &&
        data.abilities.map((value: any, key: string) => {
          return <div key={key}>{value.ability.name}</div>;
        })}
    </main>
  ) : (
    <h1>Loading...</h1>
  );
}
