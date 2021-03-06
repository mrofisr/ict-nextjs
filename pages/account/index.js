import Link from "next/link";
import Head from "@/components/Head";
import Bar from "../../components/Bar";
import Cookies from "js-cookie";
import { authPage } from "@/middlewares/auth-page-user";
import Router from "next/router";

export async function getServerSideProps(context) {
  const { token } = await authPage(context, "user");
  console.log(token);
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: "/account/login",
      },
    };
  }
  const getUser = await fetch('https://petspace.vercel.app/api/user', {
    headers: {
      "Authorization": "Bearer " + token
    }
  });
  const resUser = await getUser.json();

  return {
    props: {
      token,
      nama: resUser.data.nama,
      email: resUser.data.email
    },
  };
}

export default function Account({nama, email}) {
  const logoutUser = (e) => {
    e.preventDefault();

    Cookies.remove("user_cookie");
    Router.push("/");
  };

  return (
    <div className="flex flex-col">
      <Head />

      <div className="font-body">
        <div className="h-full bg-gray-100">
          <div className="block box-border bg-white max-w-md w-full mx-auto h-full">
            <div className="flex flex-col">
              <div className="mx-5 my-10">
                {/* title */}
                <div className="font-normal font-main text-gray-900 text-2xl">
                  Akun
                </div>
                {/* Content */}
                <div className="mb-7 mt-10 flex flex-col text-center">
                  <img src="/logo-pabrik.png" className="w-28 mx-auto"></img>
                  {/* Name and Email  */}
                  <div className="mb-7 mt-3 mx-5">
                    <h3 className="text-xl font-semibold tracking-tight text-gray-900">
                      {nama}
                    </h3>
                    <p className="tracking-tight underline text-search-font truncate">
                      {email}
                    </p>
                  </div>
                </div>

                {/* Akun Setting */}
                <div className="setting-box mt-5">
                  <h4 className="text-lg tracking-tight font-medium text-gray-900">
                    Pengaturan Akun
                  </h4>
                  <div className="mt-2">
                    <hr />
                  </div>
                  {/* Button Icon Setting */}
                  <Link href="/account/change-password">
                    <div
                      className="mt-3 cursor-pointer"
                      style={{ display: "flex" }}
                    >
                      <img src="/setting.svg"></img>
                      <p
                        className="mx-5"
                        style={{ color: "rgba(124, 124, 128, 0.8)" }}
                      >
                        Ubah Password
                      </p>
                    </div>
                  </Link>
                </div>

                {/* Kontak Kami */}
                <div className="setting-box mt-8">
                  <h4 className="text-lg tracking-tight font-medium text-gray-900">
                    Kontak Kami
                  </h4>
                  <div className="mt-2">
                    <hr />
                  </div>
                  {/* Button Icon Kontak Kami */}
                  <Link href="/terms-and-conditions">
                    <div className="mt-3" style={{ display: "flex" }}>
                      <img src="/info.svg"></img>
                      <p
                        className="mx-5"
                        style={{ color: "rgba(124, 124, 128, 0.8)" }}
                      >
                        Syarat dan Ketentuan
                      </p>
                    </div>
                  </Link>
                  {/* Privacy policy */}
                  <Link href="/privacy-policy">
                    <div className="mt-3" style={{ display: "flex" }}>
                      <img src="/privacy.svg"></img>
                      <p
                        className="mx-5 mt-1"
                        style={{ color: "rgba(124, 124, 128, 0.8)" }}
                      >
                        Privacy Policy
                      </p>
                    </div>
                  </Link>
                  {/* Tentang Kami */}
                  <Link href="/about">
                    <div className="mt-3" style={{ display: "flex" }}>
                      <img className="text-gray-400" src="/username.svg"></img>
                      <p
                        className="mx-5 mt-1"
                        style={{ color: "rgba(124, 124, 128, 0.8)" }}
                      >
                        Tentang Kami
                      </p>
                    </div>
                  </Link>
                </div>
                
                {/* Log out */}
                <button className="w-full" onClick={logoutUser} href="account/login">
                  <div className=" w-full h-lg cursor-pointer text-white border-red-600 bg-red-600 border-2 rounded-md mt-10 transition-all duration-300 hover:border-red-600 hover:bg-white hover:text-red-600">
                    <div className="content">
                      <p
                        className="tracking-tight text-blue text-lg font-semibold  text-center leading-3 group-hover:text-white"
                        style={{ lineHeight: "2.6" }}
                      >
                        Log Out
                      </p>
                    </div>
                  </div>
                </button>
                {/* Version */}
                <div className="text-right mt-2">
                  <p>PetSpace v.1.0</p>
                </div>
              </div>
            </div>

            <Bar currentPage="account" />
            <div className="w-full h-96"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
