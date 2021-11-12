import Link from "next/link";
import { useState } from "react";
import Head from "@/components/Head";
import Back from "@/components/Back";
import { unAuthPage } from "@/middlewares/auth-page-user";
import { Router } from "next/router";

export async function getServerSideProps(ctx) {
	const { token_user, token_user_penitipan } = await unAuthPage(ctx);
	if (token_user)
		return {
			redirect: {
				permanent: false,
				destination: "/",
			},
		};
	if (token_user_penitipan)
		return {
			redirect: {
				permanent: false,
				destination: "/petcare/space",
			},
		};

	return {
		props: {},
	};
}

export default function SignUp() {
	const [inputField, setInputField] = useState({
		nama: "",
		email: "",
		password: "",
		role: "",
		nik: "",
		alamat: "",
		tanggal_lahir: "",
		jenis_kelamin: "",
		foto_wajah: "",
		foto_wajah_ktp: "",
		no_hp: "",
	});

	const submitForm = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		Object.entries(inputField).forEach(([key, value]) => {
			formData.append(key, value);
		});

		const api =
			inputField.role === "user_penitipan"
				? "/api/user/auth/register?role=user_penitipan"
				: "/api/user/auth/register?role=user";

		const req = await fetch(api, {
			method: "POST",
			headers: {},
			body: formData,
		});

		const res = await req.json();
		console.log(res);

		if (res.succes) {
			document.getElementById("modal-acc").classList.remove("hidden");
			return;
		}

		document.getElementById("modal-failed").classList.remove("hidden");
	};

	const inputTextHandler = (e) => {
		const getInputText = e.target.getAttribute("name");

		setInputField({
			...inputField,
			[getInputText]: e.target.value,
		});
	};

	const inputImageHandler = (e) => {
		const getInputText = e.target.getAttribute("name");

		setInputField({
			...inputField,
			[getInputText]: e.target.files[0],
		});
	};

	const okButtonHandler = (e) => {
		location.href = "/petcare/space";
	};

	const failButtonHandler = (e) => {
		document.getElementById("modal-failed").classList.add("hidden");
	};

	return (
		<div className="flex flex-col">
			<Head />
			<div className="font-body">
				<div className="h-full bg-gray-100">
					<div className="block box-border bg-white max-w-md w-full mx-auto h-full">
						<div className="flex flex-col">
							<div className="mx-5 my-10">
								<Back />
								{/* Welcome */}
								<div className="mt-10">
									<h1 className="font-normal font-main text-gray-900 text-2xl">
										Registrasi Akun
									</h1>
									{/* Description */}
									<p
										style={{
											color: "rgba(124, 124, 128, 0.8)",
										}}
										className="text-sm font-secondary text-gray-500"
									>
										Isi dan verifikasi identitasmu untuk
										membuat akun
									</p>
								</div>
								{/* Form  */}
								<form
									action="javascript:void(0);"
									className="mt-10"
								>
									{/* Masukkan nama */}
									<div className="relative mt-5">
										<span className="absolute inset-y-0 left-0 flex items-center pl-2">
											<a
												type=""
												className="p-1 pl-1.5 focus:outline-none focus:shadow-outline"
											>
												<img
													src="/username.svg"
													className="my-6"
												></img>
											</a>
										</span>
										<input
											placeholder="Nama"
											type="text"
											name="nama"
											className="py-2 text-sm bg-background border-blue-secondary bg-opacity-40 text-form rounded-md pl-10  focus:outline-none focus:ring focus:border-blue-50 bg-abu h-md border-abu border-2 text-gray-500"
											autoComplete="off"
											onChange={inputTextHandler}
											style={{
												width: "100%",
												textIndent: "24px",
												height: "47px",
											}}
										></input>
									</div>
									{/* Masukkan Email */}
									<div className="relative mt-5">
										<span className="absolute inset-y-0 left-0 flex items-center pl-2">
											<a
												type=""
												className="p-1 pl-1 focus:outline-none focus:shadow-outline"
											>
												<img
													src="/email-icon.svg"
													className="my-6"
												></img>
											</a>
										</span>
										<input
											placeholder="Email"
											type="email"
											name="email"
											className="py-2 text-sm bg-background border-blue-secondary bg-opacity-40 text-form rounded-md pl-10  focus:outline-none focus:ring focus:border-blue-50 bg-abu h-md border-abu border-2 text-gray-500"
											autoComplete="off"
											onChange={inputTextHandler}
											style={{
												width: "100%",
												textIndent: "24px",
												height: "47px",
											}}
										></input>
									</div>
									{/* Masukkan password */}
									<div className="relative mt-5">
										<span className="absolute inset-y-0 left-0 flex items-center pl-2">
											<a
												type=""
												className="p-1 focus:outline-none focus:shadow-outline"
											>
												<img
													src="/password-icon.svg"
													className="my-6"
												></img>
											</a>
										</span>
										<input
											placeholder="Password"
											type="password"
											name="password"
											className="py-2 text-sm bg-background border-blue-secondary bg-opacity-40 text-form rounded-md pl-10  focus:outline-none focus:ring focus:border-blue-50 bg-abu h-md border-abu border-2 text-gray-500"
											autoComplete="off"
											onChange={inputTextHandler}
											style={{
												width: "100%",
												textIndent: "24px",
												height: "47px",
											}}
										></input>
									</div>

									{/* Masukkan Nik */}
									<div className="relative mt-5">
										<span className="absolute inset-y-0 left-0 flex items-center pl-2">
											<a
												type=""
												className="p-1 focus:outline-none focus:shadow-outline"
											>
												<img
													src="/nik.svg"
													className="my-6"
													style={{ width: "1.7em" }}
												></img>
											</a>
										</span>
										<input
											placeholder="NIK (Nomor Induk Kependudukan)"
											type="text"
											name="nik"
											className="py-2 text-sm bg-background border-blue-secondary bg-opacity-40 text-form rounded-md pl-10  focus:outline-none focus:ring focus:border-blue-50 bg-abu h-md border-abu border-2 text-gray-500"
											autoComplete="off"
											onChange={inputTextHandler}
											style={{
												width: "100%",
												textIndent: "24px",
												height: "47px",
											}}
										></input>
									</div>

									{/* Jenis Kelamin */}
									<div className="relative mt-5">
										<span className="absolute inset-y-0 left-0 flex items-center pl-2">
											<a
												type=""
												className="p-1 focus:outline-none focus:shadow-outline"
											>
												<img
													src="/username.svg"
													className="mx-1"
													style={{ width: "1.2em" }}
												></img>
											</a>
										</span>

										<select
											id="sex"
											name="jenis_kelamin"
											className="select select-bordered w-full font-normal border-blue-secondary border-2 py-2 text-sm text-form bg-background bg-opacity-40 rounded-md pl-16 text-search-font focus:outline-none focus:ring focus:border-blue-50 bg-abu h-md border-abu "
											onChange={inputTextHandler}
											required
										>
											<option
												value=""
												disabled="disabled"
												selected="selected"
											>
												Jenis Kelamin
											</option>
											<option value="laki_laki">
												Laki-Laki
											</option>
											<option value="perempuan">
												Perempuan
											</option>
										</select>
									</div>

									{/* Masukkan tanggal lahir */}
									<div className="relative mt-5">
										<span className="absolute inset-y-0 left-0 flex items-center pl-2">
											<a
												type=""
												className="p-1 focus:outline-none focus:shadow-outline"
											>
												<img
													src="/calendar.svg"
													className="my-6"
												></img>
											</a>
										</span>

										<input
											type="text"
											placeholder="Tanggal Lahir"
											onFocus={(e) =>
												(e.currentTarget.type = "date")
											}
											onBlur={(e) =>
												(e.currentTarget.type = "text")
											}
											onChange={inputTextHandler}
											id="birthDate"
											name="tanggal_lahir"
											className="py-2 text-sm bg-background text-search-font border-blue-secondary bg-opacity-40 text-form rounded-md pl-10 pr-3 focus:outline-none focus:ring focus:border-blue-50 bg-abu h-md border-abu border-2 "
											autoComplete="off"
											style={{
												width: "100%",
												textIndent: "24px",
												height: "47px",
											}}
										></input>
									</div>

									{/* Masukkan Alamat */}
									<div className="relative mt-5">
										<span className="absolute inset-y-0 left-0 flex items-center pl-2">
											<a
												type=""
												className="p-1 focus:outline-none focus:shadow-outline"
											>
												<img
													src="/address.svg"
													className="my-6"
													style={{ width: "1.7em" }}
												></img>
											</a>
										</span>
										<input
											placeholder="Alamat (Sesuai KTP)"
											type="text"
											name="alamat"
											className="py-2 text-sm text-form bg-background border-blue-secondary bg-opacity-40 rounded-md pl-10  focus:outline-none focus:ring focus:border-blue-50 bg-abu h-md border-abu border-2 text-gray-500"
											autoComplete="off"
											onChange={inputTextHandler}
											style={{
												width: "100%",
												textIndent: "24px",
												height: "47px",
											}}
										></input>
									</div>

									{/* Nomor HP */}
									<div className="relative mt-5">
										<span className="absolute inset-y-0 left-0 flex items-center pl-2">
											<a
												type=""
												className="p-1 focus:outline-none focus:shadow-outline"
											>
												<img
													src="/nik.svg"
													className="my-6"
													style={{ width: "1.7em" }}
												></img>
											</a>
										</span>
										<input
											placeholder="Nomor HP (WhatsApp)"
											type="text"
											name="no_hp"
											className="py-2 text-sm bg-background border-blue-secondary bg-opacity-40 text-form rounded-md pl-10  focus:outline-none focus:ring focus:border-blue-50 bg-abu h-md border-abu border-2 text-gray-500"
											autoComplete="off"
											onChange={inputTextHandler}
											style={{
												width: "100%",
												textIndent: "24px",
												height: "47px",
											}}
										></input>
									</div>

									{/* Role */}
									<div className="relative mt-5">
										<span className="absolute inset-y-0 left-0 flex items-center pl-2">
											<a
												type=""
												className="p-1 focus:outline-none focus:shadow-outline"
											>
												<img
													src="/username.svg"
													className="mx-1"
													style={{ width: "1.2em" }}
												></img>
											</a>
										</span>

										<select
											id="role"
											name="role"
											className="select select-bordered w-full font-normal border-blue-secondary border-2 py-2 text-sm text-form bg-background bg-opacity-40 rounded-md pl-16 text-search-font focus:outline-none focus:ring focus:border-blue-50 bg-abu h-md border-abu "
											onChange={inputTextHandler}
											required
										>
											<option
												value=""
												disabled="disabled"
												selected="selected"
											>
												Daftar Sebagai
											</option>
											<option value="user">
												Penitip
											</option>
											<option value="user_penitipan">
												Tempat Penitipan
											</option>
										</select>
									</div>

									{/* Upload foto wajah */}
									<label className="w-full mt-5 flex flex-col items-center bg-background bg-opacity-40 px-4 py-6 rounded-md tracking-wide border border-blue-secondary cursor-pointer hover:bg-blue-main hover:text-white  ease-linear transition-all duration-150">
										<i className="fas fa-camera fa-2x"></i>
										<span className="mt-1 text-xs leading-normal">
											Foto Wajah
										</span>
										<input
											type="file"
											id="picFace"
											name="foto_wajah"
											accept="image/png, image/gif, image/jpeg"
											className=""
											onChange={inputImageHandler}
											required
										/>
									</label>

									{/* Upload foto ktp */}
									<label className="w-full mt-5 flex flex-col items-center bg-background bg-opacity-40 px-4 py-6 rounded-md tracking-wide border border-blue-secondary cursor-pointer hover:bg-blue-main hover:text-white  ease-linear transition-all duration-150">
										<i className="fas fa-camera fa-2x"></i>
										<span className="mt-1 text-xs leading-normal">
											Foto KTP
										</span>
										<input
											type="file"
											id="picKTP"
											name="foto_wajah_ktp"
											accept="image/png, image/gif, image/jpeg"
											className=""
											onChange={inputImageHandler}
											required
										/>
									</label>

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
														Account has been
														successfully registered!
													</p>
												</div>
												<div className="items-center px-4 py-3">
													<button
														id="ok-btn"
														onClick={
															okButtonHandler
														}
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
														Account failed to
														registered!
													</p>
												</div>
												<div className="items-center px-4 py-3">
													<button
														id="fail-btn"
														onClick={
															failButtonHandler
														}
														className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-green-300"
													>
														OK
													</button>
												</div>
											</div>
										</div>
									</div>

									{/* Button Sign */}
									<input
										type="submit"
										value="Registrasi"
										onClick={submitForm}
										className="mt-10 px-4 py-3 bg-blue-main text-white font-medium w-full cursor-pointer border-2 border-blue-main rounded-lg ease-linear duration-150 hover:text-blue-main hover:border-2 hover:bg-white"
									></input>

									<div className="text-center mt-5 text-sm">
										{/*  */}
										<Link href="/account/login">
											<p
												className="mt-5 text-sm"
												style={{ color: "#7C7C80" }}
											>
												Sudah punya akun?{" "}
												<a>
													<span
														className="font-semibold text-md cursor-pointer hover:underline"
														style={{
															color: "#429FF2",
														}}
													>
														Login
													</span>
												</a>
											</p>
										</Link>
									</div>
								</form>
								<div className="w-full h-24"></div>
								{/* End Div */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
