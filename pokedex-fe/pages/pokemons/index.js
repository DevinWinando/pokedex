import { list, getListByUrl } from "@/services/pokemon";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function index() {
  const [pokemons, setPokemons] = useState({
    results: [],
    prevUrl: "",
    nextUrl: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await list();

      setPokemons(data);
    };

    fetchData();
  }, []);

  const moveHandler = (url) => {
    const fetchData = async () => {
      const data = await getListByUrl(url);

      setPokemons(data);
    };

    fetchData();
  };

  return (
    <div
      className={`bg-blue-500 font-bold rounded-lg border shadow-lg p-10 m-20`}
    >
      <Link href={"/my-pokemons"} className="mb-3 flex justify-end">
        <button
          className={`bg-slate-500 shadow-sm shadow-slate-600 text-white sm:text-xs rounded-lg py-4 px-20 mt-4`}
        >
          My Pokemons
        </button>
      </Link>

      <h1 className="text-3xl text-white text-center">
        Wild Pokemons! Catch it!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 justify-center gap-4 mt-8">
        {pokemons.results.map((pokemon) => (
          <Link href={`pokemons/${pokemon.id.toString()}`} key={pokemon.id}>
            <div
              key={pokemon.id}
              className={`bg-white rounded-lg p-4 shadow-md flex flex-col items-center justify-self-center`}
            >
              <img src={pokemon.picture} alt={pokemon.name} />
              <span className="mt-4">{pokemon.name}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-between mt-4 flex-col md:flex-row">
        <button
          onClick={() => moveHandler(pokemons.prevUrl)}
          disabled={!pokemons.prevUrl}
          className={`bg-amber-500 shadow-md shadow-slate-600 text-white sm:text-xs rounded-lg py-2 px-3 mt-4 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          ← Previous
        </button>
        <button
          onClick={() => moveHandler(pokemons.nextUrl)}
          disabled={!pokemons.nextUrl}
          className={`bg-amber-500 shadow-md shadow-slate-600 text-white sm:text-xs rounded-lg py-2 px-4 mt-4`}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
