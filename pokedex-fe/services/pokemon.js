export const list = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon");
  const data = await res.json();
  const pokemons = await renderPicture(data);

  return {
    results: pokemons,
    prevUrl: data.previous,
    nextUrl: data.next,
  };
};

export const getPicture = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  const picture = data.sprites.front_default;
  const id = data.id;

  return {
    picture,
    id,
  };
};

export const getDetail = async (id) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();

  return data;
};

export const getListByUrl = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  const pokemons = await renderPicture(data);

  return {
    results: pokemons,
    prevUrl: data.previous,
    nextUrl: data.next,
  };
};

export const catchPokemon = async (id) => {
  const res = await fetch(`http://localhost:8000/catch`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  const data = await res.json();

  return data;
};

export const createPokemon = async (name, id) => {
  const res = await fetch(`http://localhost:8000/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, id }),
  });
  const data = await res.json();

  return data;
};

const renderPicture = (data) => {
  return Promise.all(
    data.results.map(async (pokemon) => {
      const picture = await getPicture(pokemon.url);
      return {
        id: picture.id,
        name: pokemon.name,
        picture: picture.picture,
        url: pokemon.url,
      };
    })
  );
};
