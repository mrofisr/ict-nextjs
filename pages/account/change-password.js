import Head from "@/components/Head";
import Back from "@/components/Back";
import { useState } from "react";
import { authPage } from "@/middlewares/auth-page-user";


export async function getServerSideProps(context) {
  const { token } = await authPage(context, "user");
  if (!token)
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }

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
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputField),
      }
    );

    const res = await req.json();
    console.log(res);
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
                  <form action="POST" className="text-right">
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
