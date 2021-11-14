import Head from "next/head";
import Back from '@/components/Back';
import StatusCard from "@/components/StatusCard";
import { authPage } from "@/middlewares/auth-page-user";


export async function getServerSideProps(context) {
  const { token } = await authPage(context, "user")
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: '/account/login',
      },
    }
  }
                  
  const req = await fetch("https://petspace.vercel.app/api/transaction?jenis=anjing",{
      headers: {
        "Authorization": "Bearer " + token,
      },
  });
  const res = await req.json();
  return {
    props: {
      data: res.data,
    },
  };
}

export default function Dog({ data }) {

  return (
    <div className="flex flex-col">
      <Head>
        <title>PetSpace - Cariin Tempat Penitipan Hewan Buat Kamu</title>
        <link rel="icon" href="/petspace.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&family=Poppins:wght@600&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      
      <div className="">
        <div className="h-full bg-gray-100">
          <div className="block box-border bg-white max-w-md w-full mx-auto h-full">
            <div className="flex flex-col h-full">
              <div className="mx-5 my-10">
                <Back />

                <div className="mt-10">
                  <h1 className="font-normal font-main text-blue-main text-2xl">
                    Space Status
                  </h1>
                  <p className="text-sm font-serif text-gray-500 mt-2">
                    Kamu bisa melihat status penitipan hewanmu di sini
                  </p>
                </div>

                {data.map((transaction) => (
                  <StatusCard user="user" pet="dog" petName={transaction.nama_hewan} personName={transaction.nama_pemilik_penitipan} dateIn={transaction.tanggal_penitipan.split("T")[0]} dateOut={transaction.tanggal_pengembalian.split("T")[0]} status={transaction.status_penitipan} phone={transaction.no_telp_tempat_penitipan} />
                ))}

                <div className="h-24 w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
