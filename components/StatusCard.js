import Link from "next/link";
import Head from "@/components/Head";
import router from "next/router";


export default function StatusCard(props) {

  const declineHandler = async (e) => {
    e.preventDefault();

    const req = await fetch(
      `http://localhost:3000/api/transaction?id_transaksi=${props.id}&action=decline`, {
        method: 'PUT',
        headers: {
          Authorization: "Bearer " + props.token,
        }
      }
    );
    const res = await req.json();
    console.log(res);
    router.reload();
  };

  const acceptHandler = async (e) => {
    e.preventDefault();

    const req = await fetch(
      `http://localhost:3000/api/transaction?id_transaksi=${props.id}&action=accepted`, {
        method: 'PUT',
        headers: {
          Authorization: "Bearer " + props.token,
        }
      }
    );
    const res = await req.json();
    console.log(res);
    router.reload();
  };

  if (props.pet === "blank") {
    return (
      <div className="flex flex-col justify-center rounded-xl items-center text-center px-4 py-7 mt-10 md:py-10">
        <img
          src="/status-card/dog-sleep.png"
          className="w-40 md:w-52"
          loading="lazy"
        ></img>
        <div className="flex flex-col w-11/12 justify-between mt-2">
          <h2 className="text-black text-2xl font-semibold text-center">
            Ups!
          </h2>
          <div className="text-medium text-center font-serif text-black w-full mb-4">
            <p>Data space masih kosong</p>
          </div>

          <Link href="/space">
            <button
              className={
                props.user === "user_penitipan"
                  ? "hidden"
                  : "py-2.5 w-36 text-white text-xs bg-blue-main rounded-lg mt-8 md:text-sm mx-auto"
              }
            >
              <a>Browse Space</a>
            </button>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col bg-card-status bg-auto justify-center rounded-xl items-center text-center px-4 py-7 mt-10 md:py-10">
        <Head />
        <img
          src={
            props.pet === "cat"
              ? "/status-card/cat-status.png"
              : "/status-card/dog-status.png"
          }
          className="w-40 md:w-52"
          loading="lazy"
        ></img>
        <div className="flex flex-col w-11/12 justify-between">
          <h2
            className="text-white font-medium md:font-semibold text-sm md:text-base text-center"
            style={{ fontSize: "25px" }}
          >
            {props.petName}
          </h2>
          <div className="text-sm md:text-base text-center font-serif text-white w-full my-6">
            <p>{props.personName}</p>
            <p>{`${props.dateIn} - ${props.dateOut}`}</p>
            <p>{`Status: ${props.status}`}</p>
          </div>

          {props.user === "user" ? (
            <div>
              {props.status === "Accepted" ? (
                <a
                  href={`https://api.whatsapp.com/send?phone=${props.phone}&text=Test`}
                  target="_blank"
                >
                  <button
                    className={
                      props.status === "Accepted"
                        ? "py-2.5 w-36 text-white font-medium bg-yellow-pet rounded-xl mt-3 md:text-sm mx-auto"
                        : "py-2.5 w-36 text-white font-medium bg-yellow-pet rounded-xl mt-3 md:text-sm mx-auto cursor-not-allowed"
                    }
                    style={{ fontSize: "15px", width: "180px" }}
                  >
                    Chat via WhatsApp
                  </button>
                </a>
              ) : (
                <button
                  className={
                    props.status === "Accepted"
                      ? "py-2.5 w-36 text-white font-medium bg-yellow-pet rounded-xl mt-3 md:text-sm mx-auto"
                      : "py-2.5 w-36 text-white font-medium bg-yellow-pet rounded-xl mt-3 md:text-sm mx-auto cursor-not-allowed"
                  }
                  style={{ fontSize: "15px", width: "180px" }}
                >
                  Chat via WhatsApp
                </button>
              )}
            </div>
          ) : (
            <div className="flex flex-row">
              {props.status === "Decline" ? (
                <button
                  className="py-2.5 w-36 text-white font-medium bg-red-700 rounded-xl mt-3 md:text-sm mx-auto duration-200"
                  style={{ fontSize: "15px", width: "180px" }}
                >
                  Declined
                </button>
              ) : props.status === "Accepted" ? (
                <button
                  className="py-2.5 w-36 text-white font-medium bg-yellow-600 rounded-xl cursor-default duration-200 mt-3 md:text-sm mx-auto"
                  style={{ fontSize: "15px", width: "180px" }}
                >
                  Accepted
                </button>
              ) : (
                <div className="flex w-full">
                  <button
                    onClick={declineHandler}
                    className="py-2.5 w-36 mr-3 text-white font-medium bg-red-500 rounded-xl mt-3 md:text-sm mx-auto hover:bg-red-700 duration-200"
                    style={{ fontSize: "15px", width: "180px" }}
                  >
                    Decline
                  </button>

                  <button
                    onClick={acceptHandler}
                    className="py-2.5 w-36 text-white font-medium bg-yellow-pet rounded-xl hover:bg-yellow-pet-hover duration-200 mt-3 md:text-sm mx-auto"
                    style={{ fontSize: "15px", width: "180px" }}
                  >
                    Accept
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
