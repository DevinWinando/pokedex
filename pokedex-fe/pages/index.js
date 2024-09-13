import Link from "next/link";

export default function index() {
  return (
    <div className="h-screen p-10 flex justify-center align-middle">
      <div
        className={`bg-blue-500 text-white text-center font-bold rounded-lg border shadow-lg p-10 h-full w-full flex justify-center align-baseline flex-col`}
      >
        <h1 className={`text-4xl`}>Welcome to Pokedex!</h1>

        <div className={`flex flex-wrap justify-center mt-8 gap-4`}>
          <Link href={"/pokemons"}>
            <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                Search Pokemon!
              </h5>
            </div>
          </Link>
          <Link href={"my-pokemons"}>
            <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                My Pokemon!
              </h5>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
