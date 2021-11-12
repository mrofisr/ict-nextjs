import Head from "@/components/Head";
import Back from "@/components/Back";
import Link from "next/link";
import { useState } from "react";
import Cookies from "js-cookie";
import { unAuthPage } from "@/middlewares/auth-page-user";
import Router  from "next/router";

export async function getServerSideProps (ctx) {
  const {token_user, token_user_penitipan} = await unAuthPage(ctx);
  if (token_user) 
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  if (token_user_penitipan)
    return {
      redirect: {
        permanent: false,
        destination: '/petcare/space',
      },
    }

  return {
    props: {}
  }
}

export default function Login() {
  const [fields, setFields] = useState({
    email: "",
    password: ""
  });

  async function loginUser (e) {
    e.preventDefault();
    const login = await fetch('/api/user/auth/login?role=user', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(fields)
    });
    const loginRes = await login.json();
    if (!login.ok) return console.log(`error ${loginRes.message}`);
    Cookies.set("user_cookie", loginRes.data.token);
    Router.push('/')
  }

  async function loginUserPenitipan (e) {
    e.preventDefault();
    const login = await fetch('/api/user/auth/login?role=user_penitipan', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(fields)
    });
    const loginRes = await login.json();
    if (!login.ok) return console.log(`error, ${loginRes.message}`);
    console.log(loginRes.data.token);
    Cookies.set("user_penitipan_cookie", loginRes.data.token);
    Router.push('/petcare/space');
  }

  function fieldHandler (e) {
    const getName = e.target.getAttribute('name');
    
    setFields({
      ...fields,
      [getName]: e.target.value
    })
  }
  return (
    <div className="flex flex-col">
      <Head />
      <div className="font-body">
        <div className="h-full bg-gray-100">
          <div className="block box-border bg-white max-w-md w-full mx-auto h-full">
            <div className="flex flex-col">
              <div className="mx-5 my-10">
                {/* Logo Header */}
                <Back />
                {/* Welcome */}
                <div className="mt-10">
                  <h4 className="font-normal font-main text-gray-900 text-2xl">
                    Selamat Datang!
                  </h4>
                  {/* Description */}
                  <p
                    style={{ color: "rgba(124, 124, 128, 0.8)" }}
                    className="text-sm font-secondary text-gray-500"
                  >
                    Silakan login menggunakan akunmu atau membuat akun baru
                  </p>
                </div>
                {/* Form  */}
                <form method="POST" className="mt-10">
                  {/* Masukkan Email */}
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                      <a
                        type=""
                        className="p-1 focus:outline-none focus:shadow-outline"
                      >
                        <img src="/email-icon.svg" className="my-6"></img>
                      </a>
                    </span>
                    <input
                      onChange={fieldHandler}
                      placeholder="Masukkan Email Kamu"
                      type="email"
                      name="email"
                      className="py-2 text-sm bg-background bg-opacity-40 text-search-font border-blue-secondary text-form rounded-md pl-10 focus:outline-none focus:ring focus:border-blue-50 bg-abu border-abu border-2"
                      autoComplete="off"
                      style={{ width: "100%", textIndent: "24px", height: "47px" }}
                    ></input>
                  </div>
                  {/* Masukkan Password */}
                  <div className="relative mt-3">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                      <a
                        type=""
                        className="p-1 focus:outline-none focus:shadow-outline"
                      >
                        <img src="/password-icon.svg" className="my-6"></img>
                      </a>
                    </span>
                    <input
                      onChange={fieldHandler}
                      placeholder="Masukkan Password Kamu"
                      type="password"
                      name="password"
                      className="py-2 text-sm text-form bg-background text-search-font border-blue-secondary bg-opacity-40 rounded-md pl-10 focus:outline-none focus:ring focus:border-blue-50 bg-abu h-md border-abu border-2"
                      autoComplete="off"
                      style={{ width: "100%", textIndent: "24px", height: "47px" }}
                    ></input>
                  </div>
                  
                  {/* Button Sign */}
                  <input
                    onClick={loginUser}
                    type="submit"
                    value="Login Sebagai Penitip"
                    className="mt-10 px-4 py-3 bg-blue-main text-white font-medium w-full cursor-pointer border-2 border-blue-main rounded-lg ease-linear duration-150 hover:text-blue-main hover:border-2 hover:bg-white"
                  ></input>
                  <input
                    onClick={loginUserPenitipan}
                    type="submit"
                    value="Login Sebagai Tempat Penitipan"
                    className="mt-2 px-4 py-3 bg-white text-blue-main font-medium w-full cursor-pointer border-2 border-blue-main rounded-lg ease-linear duration-150 hover:text-white hover:border-2 hover:bg-blue-main"
                  ></input>
                  {/*  */}
                  <div className="text-center mt-5 text-sm">
                    

                    {/*  */}
                    <Link href="/account/signup">
                    <p className="mt-5 text-sm" style={{ color: "#7C7C80" }}>
                      Belum punya akun?{" "}
                      <a>
                        <span
                          className="font-semibold text-md cursor-pointer hover:underline"
                          style={{ color: "#429FF2" }}
                        >
                          Daftar di sini
                        </span>
                      </a>
                    </p>
                    </Link>
                  </div>
                </form>
                <div className="w-full h-96"></div>
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
