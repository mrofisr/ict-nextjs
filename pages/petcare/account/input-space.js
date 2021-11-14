import Head from "@/components/Head";
import Back from "@/components/Back";
import { authPage } from "@/middlewares/auth-page-user";
import { useState, useEffect } from "react";
// import pkg from 'react';

// const { useState, useEffect } = pkg;


export async function getServerSideProps (ctx){
  const { token } = await authPage(ctx, "user_penitipan");

  // const res = await fetch('https://petspace.vercel.app/api/space/default-form', {
  //   headers: {
  //     "Authorization": "Bearer " + token
  //   }
  // });

  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: '/account/login',
      },
    }
  }
  return {
    props: {
      token
    }
  }
}

export default function InputSpace({token}) {

  const [field, setField] = useState({
    alamat: "",
    kota: "",
    harga: "",
    deskripsi: "",
    // foto_1: "",
    // foto_2: "",
    // foto_3: "",
    jenis_hewan: ""
  });

  const [checkbox, setCheckbox] = useState({
    hewan_1: false,
    hewan_2: false,

  });

  useEffect(() => {
    const hewan_1 = (checkbox.hewan_1) ? "Anjing" : "";
    const hewan_2 = (checkbox.hewan_2) ? "Kucing" : "";
    const pet = `${hewan_1} ${hewan_2}`;
    if(pet.startsWith('Anjing K')) {

      pet = pet.replace(' ', ',')
    } else {
      pet = pet.replace(' ', '')
    }
    setField({
      ...field,
      jenis_hewan: pet,
    })
  }, [checkbox])

  async function createHandler (e) {
    e.preventDefault();
    const formData = new FormData()
    Object.entries(field).forEach(([key, values]) => {
        formData.append(key, values)
    })

    const createReq = await fetch('/api/space', {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token
      },
      body: formData
    });
    const createRes = await createReq.json();
    if (createRes.succes) {
      document.getElementById("modal-acc").classList.remove("hidden");
      return;
    }
    document.getElementById("modal-failed").classList.remove("hidden");
  }

  const okButtonHandler = (e) => {
    e.preventDefault()
    location.href = "/petcare/account"
  };

  const failButtonHandler = (e) => {
    e.preventDefault()
    document.getElementById("modal-failed").classList.add("hidden")
  }

  function imageHandler (e) {
    const getName = e.target.getAttribute('name')
    setField ({
      ...field,
      [getName]: e.target.files[0]
    });
  }

  function fieldHandler (e) {
    const getName = e.target.getAttribute('name');
    setField({
      ...field,
      [getName]: e.target.value
    });
  }

  function checkHandler (e) {
    const getName = e.target.getAttribute('name');
    setCheckbox({
      ...checkbox,
      [getName]: e.target.checked,

    });
  }
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

                <div className="font-normal font-main text-gray-900 text-2xl mt-8">
                  Isi Data Space
                </div>
                <p className="text-sm font-secondary text-gray-500 mt-3 w-11/12">
                  Data Space akan ditampilkan kepada pencari tempat penitipan
                </p>

                <form
                  // action="POST"
                  method= "POST"
                  id="spaceForm"
                  className="mt-8 font-secondary text-sm text-search-font"
                >
                  <input
                    onChange = {fieldHandler}
                    id="spaceName"
                    name="nama_penitipan"
                    type="text"
                    autoComplete="name"
                    placeholder="Nama Space"
                    className="px-4 py-3 mt-3 w-full border-opacity-100 border-2 rounded-lg border-blue-secondary"
                    required
                  />

                  <input
                    onChange = {fieldHandler}
                    id="spaceRegion"
                    name="kota"
                    type="text"
                    autoComplete="address"
                    placeholder="Kota"
                    className="px-4 py-3 mt-3 w-full border-opacity-100 border-2 rounded-lg border-blue-secondary"
                    required
                  />

                  <input
                    onChange = {fieldHandler}
                    id="spaceName"
                    name="harga"
                    type="text"
                    autoComplete="harga"
                    placeholder="Harga Space"
                    className="px-4 py-3 mt-3 w-full border-opacity-100 border-2 rounded-lg border-blue-secondary"
                    required
                  />

                  <textarea
                    onChange = {fieldHandler}
                    name="alamat"
                    form="spaceForm"
                    placeholder="Alamat Lengkap Space"
                    className="px-4 py-3 mt-3 h-36 w-full text border-opacity-100 border-2 rounded-lg border-blue-secondary"
                  ></textarea>

                  {/* <label className="w-full mt-3 flex flex-col items-center px-4 py-6 border-2 bg-white rounded-md tracking-wide border-blue-secondary cursor-pointer hover:bg-blue-main hover:text-white  ease-linear transition-all duration-150">
                    <i className="fas fa-camera fa-2x"></i>
                    <span className="mt-1 text-xs leading-normal">
                      Upload Foto Space 1
                    </span>
                    <input
                      onChange={imageHandler}
                      type="file"
                      id="spaceImg1"
                      name="foto_1"
                      accept="image/png, image/gif, image/jpeg"
                      className=""
                      required
                    />
                  </label>

                  <label className="w-full mt-3 flex flex-col items-center px-4 py-6 border-2 bg-white rounded-md tracking-wide border-blue-secondary cursor-pointer hover:bg-blue-main hover:text-white  ease-linear transition-all duration-150">
                    <i className="fas fa-camera fa-2x"></i>
                    <span className="mt-1 text-xs leading-normal">
                      Upload Foto Space 2
                    </span>
                    <input
                      onChange={imageHandler}
                      type="file"
                      id="spaceImg2"
                      name="foto_2"
                      accept="image/png, image/gif, image/jpeg"
                      className=""
                      required
                    />
                  </label>

                  <label className="w-full mt-3 flex flex-col items-center px-4 py-6 border-2 bg-white rounded-md tracking-wide border-blue-secondary cursor-pointer hover:bg-blue-main hover:text-white  ease-linear transition-all duration-150">
                    <i className="fas fa-camera fa-2x"></i>
                    <span className="mt-1 text-xs leading-normal">
                      Upload Foto Space 3
                    </span>
                    <input
                      onChange={imageHandler}
                      type="file"
                      id="spaceImg"
                      name="foto_3"
                      accept="image/png, image/gif, image/jpeg"
                      className=""
                      required
                    />
                  </label> */}

                  <textarea
                    onChange = {fieldHandler}
                    name="deskripsi"
                    form="petForm"
                    placeholder="Informasi Tambahan"
                    className="px-4 py-3 mt-3 w-full text border-opacity-100 border-2 rounded-lg border-blue-secondary"
                  ></textarea>

                  <div className="mt-3">
                    <span className="text-gray-500">Menerima Penitipan:</span>
                    <div className="mt-2">
                      <div>
                        <label className="inline-flex items-center">
                          <input
                            onChange={checkHandler}
                            type="checkbox"
                            defaultChecked={false}
                            value="Anjing"
                            name="hewan_1"
                            className="form-checkbox text-indigo-600"
                          />
                          <span className="ml-2">Anjing</span>
                        </label>
                      </div>
                      <div>
                        <label className="inline-flex items-center">
                          <input
                            onChange={checkHandler}
                            defaultChecked={false}
                            value="Kucing"
                            type="checkbox"
                            name="hewan_2"
                            className="form-checkbox text-green-500"
                          />
                          <span className="ml-2">Kucing</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex mt-10">
                    <img src="/infoIcon.svg" className="mr-3"></img>
                    <p>
                      Periksa kembali data Space kamu terisi dengan benar
                      sebelum lanjut
                    </p>
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
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        </div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Successful!
                        </h3>
                        <div className="mt-2 px-7 py-3">
                          <p className="text-sm text-gray-500">
                            Adding Space succesfully!
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
                            Adding Space failed! 
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
                    onClick={createHandler}
                    type="submit"
                    value="Buat Space"
                    className="mt-4 px-4 py-4 bg-blue-main text-white font-medium w-full cursor-pointer border-2 border-blue-main rounded-lg ease-linear duration-150 hover:text-blue-main hover:border-2 hover:bg-white"
                  ></input>

                  <button
                    onClick={() => router.back()}
                    className="mt-3 px-4 py-4 bg-white text-blue-main font-medium w-full border-2 border-blue-main rounded-lg ease-linear duration-150 hover:text-white hover:border-2 hover:bg-blue-main"
                  >
                    Batal
                  </button>
                </form>
              </div>
            </div>

            <div className="w-full h-14"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
