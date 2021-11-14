import Head from "@/components/Head";
import Back from "@/components/Back";
import { authPage } from "@/middlewares/auth-page-user";
import { useState } from "react";
import { useRouter } from "next/router";

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

  return {
    props: {
      token,
    },
  };
}

export default function RequestSpace({ token }) {
  const router = useRouter();
  const [inputField, setInputField] = useState({
    nama_hewan: "",
    jenis_hewan: "",
    jenis_kelamin_hewan: "",
    umur: "",
    tanggal_penitipan: "",
    tanggal_pengembalian: "",
    info_tambahan: "",
  });

  const inputTextHandler = (e) => {
    const getNameInput = e.target.getAttribute("name");

    setInputField({
      ...inputField,
      [getNameInput]: e.target.value,
    });
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();

    console.log(inputField);

    const { id } = router.query;

    const req = await fetch(`../../api/transaction?id=${id}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputField),
    });

    const res = await req.json();
    console.log(res);
    if (res.succes) {
      document.getElementById("modal-acc").classList.remove("hidden");
      return;
    }

    document.getElementById("modal-failed").classList.remove("hidden");
  };

  const okButtonHandler = (e) => {
    e.preventDefault()
    location.href = inputField.jenis_hewan === "Anjing" ? "/status/dog" : "/status/cat";
  };

  const failButtonHandler = (e) => {
    e.preventDefault()
    document.getElementById("modal-failed").classList.add("hidden");
  };

  // Generating min and max date
  const dateNow = new Date(); //example "2021-11-02T02:59:16.644Z"
  const minDate = dateNow.toISOString().split("T")[0]; // "2021-11-02"
  dateNow.setDate(dateNow.getDate() + 1); // "2021-11-03T02:59:16.644Z"
  const maxDate = dateNow.toISOString().split("T")[0]; // "2021-11-03"

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
                  Isi Data Hewan
                </div>
                <p className="text-sm font-secondary text-gray-500 mt-3 w-11/12">
                  Data hewan digunakan untuk memvalidasi proses penitipan
                </p>

                <form
                  method="POST"
                  id="petForm"
                  className="mt-8 font-secondary text-sm text-search-font"
                >
                  <input
                    id="petName"
                    name="nama_hewan"
                    onChange={inputTextHandler}
                    type="text"
                    autoComplete="name"
                    placeholder="Nama Hewan"
                    className="px-4 py-3 mt-3 w-full border-opacity-100 border-2 rounded-lg border-blue-secondary"
                    required
                  />
                  <select
                    id="petType"
                    name="jenis_hewan"
                    onChange={inputTextHandler}
                    className="select select-bordered w-full bg-white font-normal border-blue-secondary border-2 mt-3 "
                    required
                  >
                    <option
                      value="Kucing"
                      disabled="disabled"
                      selected="selected"
                    >
                      Jenis Hewan
                    </option>
                    <option value="Anjing">Anjing</option>
                    <option value="Kucing">Kucing</option>
                  </select>

                  <select
                    id="petSex"
                    name="jenis_kelamin_hewan"
                    onChange={inputTextHandler}
                    className="select select-bordered w-full bg-white font-normal border-blue-secondary border-2 mt-3 "
                    required
                  >
                    <option
                      value="Jantan"
                      disabled="disabled"
                      selected="selected"
                    >
                      Jenis Kelamin Hewan
                    </option>
                    <option value="Jantan">Jantan</option>
                    <option value="Betina">Betina</option>
                  </select>

                  <div className="form-control mt-3">
                    <label className="input-group input-group-md">
                      <input
                        type="text"
                        name="umur"
                        onChange={inputTextHandler}
                        placeholder="Umur Hewan"
                        className="input input-bordered input-md bg-white text-search-font border-blue-secondary border-2 w-full"
                        required
                      />
                      <span className="bg-blue-secondary">tahun</span>
                    </label>
                  </div>
                  <input
                    id="dateIn"
                    name="tanggal_penitipan"
                    onChange={inputTextHandler}
                    type="text"
                    onFocus={(e) => (e.currentTarget.type = "date")}
                    onBlur={(e) => (e.currentTarget.type = "text")}
                    min={minDate}
                    placeholder="Tanggal Mulai Penitipan"
                    className="relative px-4 bg-white py-3 mt-3 placeholder-search-font w-full border-opacity-100 border-2 rounded-lg border-blue-secondary"
                    required
                  />
                  <input
                    id="dateOut"
                    name="tanggal_pengembalian"
                    onChange={inputTextHandler}
                    type="text"
                    onFocus={(e) => (e.currentTarget.type = "date")}
                    onBlur={(e) => (e.currentTarget.type = "text")}
                    min={maxDate}
                    placeholder="Tanggal Selesai Penitipan"
                    className="relative bg-white px-4 py-3 mt-3 placeholder-search-font w-full border-opacity-100 border-2 rounded-lg border-blue-secondary"
                    required
                  />

                  <textarea
                    name="info_tambahan"
                    onChange={inputTextHandler}
                    form="petForm"
                    placeholder="Informasi Tambahan"
                    className="px-4 py-3 mt-3  w-full text border-opacity-100 border-2 rounded-lg border-blue-secondary"
                  ></textarea>

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
                            Request Space telah berhasil!
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
                            Request Space gagal!
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

                  <div className="flex mt-10">
                    <img src="/infoIcon.svg" alt="" className="mr-3"></img>
                    <p>
                      Periksa kembali data hewan kamu terisi dengan benar
                      sebelum lanjut
                    </p>
                  </div>

                  <button
                    onClick={submitFormHandler}
                    className="mt-4 px-4 py-4 bg-blue-main text-white hover:bg-white hover:text-blue-main duration-200 active:text-blue-main active:bg-white font-medium w-full cursor-pointer border-2 border-blue-main rounded-lg "
                  >
                    Verifikasi
                  </button>
                </form>
              </div>
            </div>

            <div className="w-full h-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
