import Head from "@/components/Head";
import BarPetCare from "@/components/BarPetCare";
import StatusCard from "@/components/StatusCard";
import { authPage } from "@/middlewares/auth-page-user";

export async function getServerSideProps(context) {
  const { token } = await authPage(context, "user_penitipan");

  const req = await fetch(
    "https://petspace.vercel.app/api/transaction",
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  const res = await req.json();
  console.log(res);

  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: "/account/login",
      },
    };
  }
  return {
    props: {
      res,
    },
  };
}

export default function SpacePetCare({ res }) {
  
  return (
    <div className="flex flex-col">
      <Head />

      <div className="h-full bg-gray-100">
        <div className="block box-border bg-white max-w-md w-full mx-auto h-full">
          <div className="flex flex-col">
            <div className="flex flex-col">
              <div className="mx-5 my-10">
                {/* Mulai ngoding di sini */}

                <div className="font-normal font-main text-gray-900 text-2xl">
                  Pet Request
                </div>

                <p className="text-sm font-secondary text-gray-500 mt-3">
                  Yuk lihat daftar hewan yang ingin dititipkan di tempatmu
                </p>

                {res.data.length === 0 ? (
                  <div>
                    <StatusCard pet="blank" user="user_penitipan" />
                    <div className="w-full h-52"></div>
                  </div>
                ) : (
                  <div></div>
                )}

                {res.data.map((status) => {
                  if (status.jenis_hewan === "Anjing") {
                    return (
                      <StatusCard
                        key={status.id_transaksi}
                        pet="dog"
                        petName={status.nama_hewan}
                        personName={status.nama_penitip}
                        dateIn="12 November 2021"
                        dateOut="16 November 2021"
                        status={status.status_penitipan}
                      />
                    );
                  } else if (status.jenis_hewan === "Kucing") {
                    return (
                      <StatusCard
                        key={status.id_transaksi}
                        pet="cat"
                        petName={status.nama_hewan}
                        personName={status.nama_penitip}
                        dateIn="12 November 2021"
                        dateOut="16 November 2021"
                        status={status.status_penitipan}
                      />
                    );
                  }
                })}
              </div>
            </div>
          </div>
          <BarPetCare currentPage="space" />
          <div className="w-full h-24"></div>
        </div>
      </div>
    </div>
  );
}
