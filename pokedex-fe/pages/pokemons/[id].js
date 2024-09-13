import { getDetail, catchPokemon, createPokemon } from "@/services/pokemon";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Link from "next/link";
import FailedModal from "@/components/failedModal";

export default function index({ pokemons }) {
  const router = useRouter();
  const { id } = router.query;

  const [detail, setDetail] = useState({});
  const [open, setOpen] = useState(false);
  const [openFailed, setOpenFailed] = useState(false);

  useEffect(() => {
    if (id) {
      getDetail(id).then((data) => {
        setDetail(data);
      });
    }
  }, [id]);

  const catchHandler = () => {
    catchPokemon(id).then((data) => {
      const isCatched = data.data.catched;

      if (isCatched) {
        setOpen(true);
      } else {
        setOpenFailed(true);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const name = formData.get("name");

    createPokemon(name, id).then(() => {
      router.push("/my-pokemons");
    });
  };

  return (
    <div
      className={`bg-blue-500 font-bold rounded-lg border shadow-lg p-5 lg:p-10 m-20`}
    >
      <Link href={"/pokemons"} className="mb-3 flex justify-end">
        <button
          className={`bg-slate-500 shadow-sm shadow-slate-600 text-white sm:text-xs rounded-lg py-4 px-20 mt-4`}
        >
          Search Other Pokemons
        </button>
      </Link>

      <h1 className="text-3xl text-white text-center">Detail</h1>

      <div className="grid gap-4 mt-4">
        <div
          key={detail.id}
          className={`bg-white rounded-lg p-4 shadow-md flex flex-col items-center`}
        >
          <img
            src={detail.sprites?.front_default}
            width={"50%"}
            style={{
              width: "clamp(20%, 300px, 100%)",
            }}
            alt={detail.name}
          />
          <h3 className="mt-2 text-4xl">{detail.name}</h3>
          <span className="mt-4">Height: {detail.height}</span>
          <span className="mt-1">Weight: {detail.weight}</span>

          <div className="mt-4 flex justify-center">
            {detail.types?.map((type) => (
              <span
                key={type.type.name}
                className={`bg-gray-200 rounded-lg px-5 py-2 text-center me-2`}
              >
                {type.type.name}
              </span>
            ))}
          </div>

          <div className="w-full flex justify-center mt-3">
            <button
              className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 mt-4 w-full lg:w-2/4"
              onClick={catchHandler}
            >
              Catch!
            </button>
          </div>
        </div>
      </div>

      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <DialogTitle
                        as="h3"
                        className="text-lg font-semibold leading-6 text-gray-900"
                      >
                        Pokemon Catched! Give A Name For Pokemon!
                      </DialogTitle>
                    </div>
                  </div>

                  <div className="px-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900 mt-4"
                    >
                      Name
                    </label>
                    <div className="relative mt-2 rounded-md shadow-sm">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Name"
                        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
                  <button
                    type="submit"
                    data-autofocus
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      <FailedModal openFailed ={openFailed} setOpenFailed={setOpenFailed} title={'Failed to Catch Pokemon!'} />
    </div>
  );
}
