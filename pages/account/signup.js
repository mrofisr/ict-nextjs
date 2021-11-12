import Link from "next/link";
import { useState } from "react";
import Head from "@/components/Head";
import Back from "@/components/Back";
import { unAuthPage } from "@/middlewares/auth-page-user";
import { useState } from "react";

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
		no_hp: "087578",
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
								<form className="mt-10">
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

<<<<<<< HEAD
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
									<label className="w-full mt-5 flex flex-col items-center bg-background  bg-opacity-40 px-4 py-6 rounded-md tracking-wide border border-blue-secondary cursor-pointer hover:bg-blue-main hover:text-white  ease-linear transition-all duration-150">
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

									{/* Button Sign */}
									<input
										type="submit"
										value="Registrasi"
										onClick={submitForm}
										className="mt-10 px-4 py-3 bg-blue-main text-white font-medium w-full cursor-pointer border-2 border-blue-main rounded-lg ease-linear duration-150 hover:text-blue-main hover:border-2 hover:bg-white"
									></input>
=======
                    <select
                      id="role"
                      name="role"
                      className="select select-bordered w-full font-normal border-blue-secondary border-2 py-2 text-sm text-form bg-background bg-opacity-40 rounded-md pl-16 text-search-font focus:outline-none focus:ring focus:border-blue-50 bg-abu h-md border-abu "
                      onChange={inputTextHandler}
                      required
                    >
                      <option value="" disabled="disabled" selected="selected">
                        Daftar Sebagai
                      </option>
                      <option value="user">Penitip</option>
                      <option value="user_penitipan">Tempat Penitipan</option>
                    </select>
                  </div>

                  {/* Upload foto wajah */}
                  <label className="w-full mt-5 flex flex-col items-center bg-background  bg-opacity-40 px-4 py-6 rounded-md tracking-wide border border-blue-secondary cursor-pointer hover:bg-blue-main hover:text-white  ease-linear transition-all duration-150">
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

                  {/* Button Sign */}
                  <input
                    type="submit"
                    value="Registrasi"
                    onClick={submitForm}
                    className="mt-10 px-4 py-3 bg-blue-main text-white font-medium w-full cursor-pointer border-2 border-blue-main rounded-lg ease-linear duration-150 hover:text-blue-main hover:border-2 hover:bg-white"
                  ></input>
>>>>>>> c755462a527ff09b3dcdcf7d5e7d4732e16dc6f6

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
														className="font-semibold text-md hover:underline"
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
