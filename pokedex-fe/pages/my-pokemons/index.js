import { list, getPicture, getListByUrl } from "@/services/my-pokemons";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function index() {
  const [pokemons, setPokemons] = useState({
    results: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await list();

      setPokemons(data);
    };

    fetchData();
  }, []);

  return (
    <div
      className={`bg-blue-500 font-bold rounded-lg border shadow-lg p-10 m-20`}
    >
      <Link href={"/pokemons"} className="mb-3 flex justify-end">
        <button
          className={`bg-slate-500 shadow-sm shadow-slate-600 text-white sm:text-xs rounded-lg py-4 px-20 mt-4`}
        >
          Search for Pokemons
        </button>
      </Link>

      <h1 className="text-3xl text-white text-center">Pokemons</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 justify-center gap-4 mt-8">
        {pokemons.results.map((pokemon) => (
          <Link href={`/my-pokemons/${pokemon._id}`} key={pokemon.id}>
            <div
              key={pokemon.id}
              className={`bg-white rounded-lg p-4 shadow-md flex flex-col items-center justify-self-center`}
            >
              <img src={pokemon.picture} alt={pokemon.name} />
              <span className="mt-4">{pokemon.name}</span>
              <p className="text-sm text-slate-500">({pokemon.pokemonName})</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
