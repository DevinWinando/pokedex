import { show, releasePokemon, renamePokemon } from "@/services/my-pokemons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import FailedModal from "@/components/failedModal";

export default function index() {
  const router = useRouter();
  const { id } = router.query;

  const [detail, setDetail] = useState({});
  const [openReleaseFailed, setOpenReleaseFailed] = useState(false);
  const [openRenameFailed, setOpenRenameFailed] = useState(false);

  useEffect(() => {
    if (id) {
      show(id).then((data) => {
        if (data) {
          setDetail(data);
        } else {
          alert("Pokemon not found!");
          router.push("/my-pokemons");
        }
      });
    }
  }, [id]);

  const releaseHandler = (id) => {
    releasePokemon(id).then((data) => {
      if (data.success) {
        alert("Pokemon released!");
        router.push("/my-pokemons");
      } else {
        setOpenReleaseFailed(true);
      }
    });
  };

  const renameHandler = (id) => {
    renamePokemon(id).then((data) => {
      if (data.success) {
        alert("Pokemon renamed!");
        show(id).then((data) => {
          if (data) {
            setDetail(data);
          } else {
            alert("Pokemon not found!");
            router.push("/my-pokemons");
          }
        });
      } else {
        setOpenRenameFailed(true);
      }
    });
  };

  return (
    <div
      className={`bg-blue-500 font-bold rounded-lg border shadow-lg p-5 lg:p-10 m-20`}
    >
      <Link href={"/my-pokemons"} className="mb-3 flex justify-end">
        <button
          className={`bg-slate-500 shadow-sm shadow-slate-600 text-white sm:text-xs rounded-lg py-4 px-20 mt-4`}
        >
          My Pokemons
        </button>
      </Link>

      <h1 className="text-3xl text-white text-center">Detail</h1>

      <div className="grid gap-4 mt-4">
        <div
          key={detail.id}
          className={`bg-white rounded-lg p-4 shadow-md flex flex-col items-center`}
        >
          <img
            src={detail.picture}
            width={"50%"}
            style={{
              width: "clamp(20%, 300px, 100%)",
            }}
            alt={detail.name}
          />
          <h3 className="mt-2 text-4xl">{detail.nickName}</h3>
          <h3 className="mt-2 text-xl text-slate-400">{detail.name}</h3>
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

          <div className="w-full flex-col flex lg:flex-row align-middle justify-center mt-3">
            <button
              className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 mt-4 w-full lg:w-2/4"
              onClick={() => renameHandler(detail._id)}
            >
              Rename
            </button>
            <button
              className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 mt-4 w-full lg:w-2/4"
              onClick={() => releaseHandler(detail._id)}
            >
              Release
            </button>
          </div>
        </div>
      </div>

      <FailedModal
        openFailed={openReleaseFailed}
        setOpenFailed={setOpenReleaseFailed}
        title={"Failed to Release Pokemons!"}
      />
      <FailedModal
        openFailed={openRenameFailed}
        setOpenFailed={setOpenRenameFailed}
        title={"Failed to Rename Pokemons!"}
      />
    </div>
  );
}
