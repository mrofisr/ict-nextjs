import Head from "@/components/Head";
import Back from "@/components/Back";
import { useState } from "react";
import { authPage } from "@/middlewares/auth-page-user";

export async function getServerSideProps(context) {
  const { token } = await authPage(context, "user_penitipan");
  if (!token)
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };

  return {
    props: { token },
  };
}

export default function ChangePasswordPetCare({ token }) {
  const [inputField, setInputField] = useState({
    password: "",
    new_password: "",
    new_password_verif: "",
  });

  const textFieldHandler = (e) => {
    const getInputName = e.target.getAttribute("name");

    setInputField({
      ...inputField,
      [getInputName]: e.target.value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const req = await fetch(
      "http://localhost:3000/api/user/auth/change-password",
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputField),
      }
    );

    const res = await req.json();
    console.log(res);

    if (res.succes) {
      document.getElementById("modal-acc").classList.remove("hidden");
      return
    }

    document.getElementById("modal-failed").classList.remove("hidden");
  };

  const okButtonHandler = (e) => {
    location.href = "/petcare/account";
  };

  const failButtonHandler = (e) => {
    document.getElementById("modal-failed").classList.add("hidden");
  };

  return (
    <div className="flex flex-col">
      <Head />
      <div className="">
        <div className="h-full bg-gray-100">
          <div className="block box-border bg-white max-w-md w-full mx-auto h-full">
            <div className="flex flex-col">
              <div className="mx-5 my-10">
                {/* Mulai ngoding di sini */}
                <Back />
                <h4 className="font-normal font-main mt-8 text-gray-900 text-2xl">
                  Ubah Password
                </h4>

                <div className="relative mt-10 h-screen">
                  <form action="javascript:void(0);" className="text-right">
                    <div className="relative">
                      <span className="absolute inset-y-0 left-2 flex items-center pl-2">
                        <img
                          src="/password-icon.svg"
                          className="my-6 w-5"
                        ></img>
                      </span>
                      <input
                        placeholder="Masukkan password kamu"
                        type="text"
                        name="password"
                        onChange={textFieldHandler}
                        className="py-2 text-sm text-form rounded-md pl-12 w-full focus:outline-none focus:ring focus:border-blue-50 bg-abu h-md border-abu border-2"
                        autoComplete="off"
                      ></input>
                    </div>
                    <div className="mt-3 relative">
                      <span className="absolute inset-y-0 left-2 flex items-center pl-2">
                        <img
                          src="/password-icon.svg"
                          className="my-6 w-5"
                        ></img>
                      </span>
                      <input
                        placeholder="Masukkan password baru kamu"
                        type="password"
                        name="new_password"
                        onChange={textFieldHandler}
                        className="py-2 text-sm text-form rounded-md pl-12 w-full focus:outline-none focus:ring focus:border-blue-50 bg-abu h-md border-abu border-2"
                        autoComplete="off"
                      ></input>
                    </div>

                    <div className="relative mt-3">
                      <span className="absolute inset-y-0 left-2 flex items-center pl-2">
                        <img
                          src="/password-icon.svg"
                          className="my-6 w-5"
                        ></img>
                      </span>
                      <input
                        placeholder="Verifikasi password baru kamu"
                        type="password"
                        name="new_password_verif"
                        onChange={textFieldHandler}
                        className="py-2 text-sm text-form rounded-md pl-12 w-full focus:outline-none focus:ring focus:border-blue-50 bg-abu h-md border-abu border-2"
                        autoComplete="off"
                      ></input>
                    </div>

                    <div
                      id="modal-acc"
                      className="max-w-md -ml-5 w-full fixed bottom-40 hidden"
                    >
                      <div className="mx-auto p-5 border w-5/6 shadow-lg rounded-md bg-white">
                        <div className="mt-3 text-center">
                          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                            <svg
                              className="h-6 w-6 text-green-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                          </div>
                          <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Successful!
                          </h3>
                          <div className="mt-2 px-7 py-3">
                            <p className="text-sm text-gray-500">
                              Password berhasil diubah!
                            </p>
                          </div>
                          <div className="items-center px-4 py-3">
                            <button
                              id="ok-btn"
                              onClick={okButtonHandler}
                              className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                            >
                              OK
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* modal failed */}
                    <div
                      id="modal-failed"
                      className="max-w-md -ml-5 w-full fixed bottom-40 hidden"
                    >
                      <div className="mx-auto p-5 border w-5/6 shadow-lg rounded-md bg-white">
                        <div className="mt-3 text-center">
                          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="fas"
                              data-icon="times"
                              className="svg-inline--fa fa-times fa-w-11 h-6 w-6 "
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 352 512"
                            >
                              <path
                                fill="#FF0000"
                                d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                              ></path>
                            </svg>
                          </div>
                          <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Failed!
                          </h3>
                          <div className="mt-2 px-7 py-3">
                            <p className="text-sm text-gray-500">
                              Gagal mengubah password!
                            </p>
                          </div>
                          <div className="items-center px-4 py-3">
                            <button
                              id="fail-btn"
                              onClick={failButtonHandler}
                              className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                            >
                              OK
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <input
                      type="submit"
                      value="Ubah Password"
                      onClick={submitForm}
                      className="mt-3 py-1.5 px-3 bg-blue-main text-white text-sm cursor-pointer border-2 border-blue-main rounded-lg ease-linear duration-150 hover:text-blue-main hover:border-2 hover:bg-white"
                    ></input>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
