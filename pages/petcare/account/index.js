import Link from "next/link";
import Head from "@/components/Head";
import BarPetCare from "@/components/BarPetCare";
import { authPage } from "@/middlewares/auth-page-user";
import Cookies from "js-cookie";
import Router from "next/router";
import { useEffect, useState } from "react";

export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx, "user_penitipan");
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: '/account/login',
      },
    }
  }

  const getUser = await fetch('https://petspace.vercel.app/api/user', {
    headers: {
      "Authorization": "Bearer " + token
    }
  });
  const getValidation = await fetch ('https://petspace.vercel.app/api/space/validation-user', {
    headers: {
      "Authorization": "Bearer " + token
    }
  });
  const {data: {nama, email}} = await getUser.json();
  const resValidation = await getValidation.json();
  return {
    props: {
      token,
      user: {
        nama,
        email,
        validation: resValidation.data.validation,
      },
      id: resValidation.data.id_detail_tempat_penitipan
    }
  }
}

export default function AccountPetcare({token, user, id}) {
  const [validation, setValidation] = useState(user.validation);

  const deleteSpace = async (e) => {
    console.log(validation);
    const delReq = await fetch('/api/space?id=' + id, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + token
      }
    });
    const delRes = await delReq.json();
    if (!delReq.ok) return console.log("Error nih bos");
    setValidation(false);
  }

  const logoutUser = (e) => {
    e.preventDefault()

    Cookies.remove("user_penitipan_cookie");
    Router.push('/')
  }

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
                      {user.nama}
                    </h3>
                    <p
                      className="tracking-tight underline text-search-font truncate"
                    >
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* Akun Setting */}
                <div className="setting-box mt-5">
                  <h4 className="text-lg tracking-tight font-medium text-gray-900">Pengaturan Akun</h4>
                  <div className="mt-2">
                    <hr />
                  </div>

                  {/* Button Icon Setting */}
                  <Link href="/petcare/account/change-password">
                    <div className="mt-3 cursor-pointer" style={{ display: "flex" }}>
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

                {/* Setting khusus penitipan */}
                <div className="setting-box mt-5">
                  <h4 className="text-lg tracking-tight font-medium text-gray-900">Space</h4>
                  <div className="mt-2">
                    <hr />
                  </div>
                  
                  {/* Button Input Space */}
                  { !validation ?
                  <Link href="/petcare/account/input-space">
                    <div className="mt-3 cursor-pointer" style={{ display: "flex" }}>
                      <img src="/setting.svg"></img>
                      <p
                        className="mx-5"
                        style={{ color: "rgba(124, 124, 128, 0.8)" }}
                      >
                        Masukkan Data Tempat Penitipan
                      </p>
                    </div>
                  </Link>
                  :           
                  <div  onClick={deleteSpace} className="mt-3 cursor-pointer" style={{ display: "flex" }}>
                    <img className="w-5 opacity-40" src="/delete.svg"></img>
                    <p
                      className="mx-5"
                      style={{ color: "rgba(124, 124, 128, 0.8)" }}
                    >
                      Hapus Data Tempat Penitipan
                    </p>
                  </div>
                }

                </div>

                {/* Kontak Kami */}
                <div className="setting-box mt-5">
                  <h4 className="text-lg tracking-tight font-medium text-gray-900">
                    Kontak Kami
                  </h4>
                  <div className="mt-2">
                    <hr />
                  </div>

                  {/* Button Icon Kontak Kami */}
                  <a href="#">
                    <div className="mt-3" style={{ display: "flex" }}>
                      <img src="/info.svg"></img>
                      <p
                        className="mx-5"
                        style={{ color: "rgba(124, 124, 128, 0.8)" }}
                      >
                        Syarat dan Ketentuan
                      </p>
                    </div>
                  </a>
                  {/* Privacy policy */}
                  <a href="#">
                    <div className="mt-3" style={{ display: "flex" }}>
                      <img src="/privacy.svg"></img>
                      <p
                        className="mx-5 mt-1"
                        style={{ color: "rgba(124, 124, 128, 0.8)" }}
                      >
                        Privacy Policy
                      </p>
                    </div>
                  </a>
                </div>

                {/* Log out */}
                <button className="w-full" onClick={logoutUser}>
                  <div className=" w-full h-lg text-white border-red-600 cursor-pointer bg-red-600 border-2 rounded-md mt-10 transition-all duration-300 hover:border-red-600 hover:bg-white hover:text-red-600">
                    <div className="content">
                      <p
                        className="tracking-tight text-blue text-lg font-semibold text-center leading-3 group-hover:text-white"
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

            <BarPetCare currentPage="account" />
            <div className="w-full h-64"></div>
          </div>
        </div>
      </div>
    </div>
  );
}