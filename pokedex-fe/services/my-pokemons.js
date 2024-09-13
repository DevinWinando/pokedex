export const list = async () => {
  const res = await fetch("http://localhost:8000/");
  const data = await res.json();
  const pokemons = await renderPicture(data);

  return {
    results: pokemons,
  };
};

export const show = async (id) => {
  const res = await fetch(`http://localhost:8000/${id}`);
  const data = await res.json();

  if (!data.success) {
    return null;
  }

  const pokemon = await getDetail(data.data.id);

  return {
    picture: pokemon.sprites.front_default,
    _id: data.data._id,
    nickName: data.data.name,
    ...pokemon,
  };
};

export const getDetail = async (id) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();

  return data;
};

export const releasePokemon = async (id) => {
  console.log(id);
  const res = await fetch(`http://localhost:8000/${id}/release`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  return data;
};

export const renamePokemon = async (id) => {
  const res = await fetch(`http://localhost:8000/${id}/rename`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  return data;
};

const renderPicture = (data) => {
  return Promise.all(
    data.data.pokemons.map(async (pokemon) => {
      const picture = await getDetail(pokemon.id);
      return {
        id: picture.id,
        name: pokemon.name,
        pokemonName: picture.name,
        picture: picture.sprites.front_default,
        _id: pokemon._id,
      };
    })
  );
};
