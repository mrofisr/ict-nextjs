import Head from "@/components/Head";
import Bar from "@/components/Bar";
import Back from "@/components/Back";

export default function Template() {
  return (
    <div className="flex flex-col">
      <Head />
      <body className="">
        <div className="h-full bg-gray-100">
          <div className="block box-border bg-white max-w-md w-full mx-auto h-full">
            <div className="flex flex-col">
              <div className="mx-5 my-10">
                {/* Mulai ngoding di sini */}
                <Back />
                {/* Welcome */}
                <div className="mt-10">
                  <h1 className="font-normal font-main text-gray-900 text-2xl">
                    Tentang Kami
                  </h1>

                  <svg
                    className="w-full text-center -mb-14 mt-10"
                    width="100mm"
                    height="40mm"
                    version="1.1"
                    viewBox="0 0 210 210"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="#589bd5">
                      <circle cx="104.9" cy="120.97" r="7.9472" />
                      <circle cx="104.9" cy="57.986" r="7.9472" />
                      <circle cx="136.39" cy="89.479" r="7.9472" />
                      <circle cx="41.916" cy="89.479" r="7.9472" />
                      <circle cx="167.89" cy="89.479" r="7.9472" />
                      <circle cx="73.409" cy="89.479" r="7.9472" />
                      <circle cx="104.9" cy="26.494" r="7.9472" />
                      <circle cx="136.39" cy="57.986" r="7.9472" />
                      <circle cx="73.409" cy="57.986" r="7.9472" />
                    </g>
                  </svg>

                  <h3 className="text-sm font-semibold font-secondary text-gray-700 mt-10">
                    Seputar Nine Dots Labs
                  </h3>

                  <p className="text-xs font-secondary text-gray-500 mt-2">
                    Nine Dots Labs adalah komunitas mahasiswa pegiat pemrograman
                    di UIN Walisongo Semarang
                  </p>

                  <h3 className="text-sm font-semibold font-secondary text-gray-700 mt-10">
                    Anggota Tim
                  </h3>

                  <p className="text-xs font-secondary text-gray-500 mt-2">
                    - Abdur Rofi Maulidin <br />
                    - Ivan Rizky Saputra <br />
                    - Lintang Aji Yoga Pratama <br />- Wahyu Rizqy Saputra
                  </p>

                  <h3 className="text-sm font-semibold font-secondary text-gray-700 mt-10">
                    Dosen Pembimbing
                  </h3>

                  <p className="text-xs font-secondary text-gray-500 mt-2">
                    Hery Mustofa M.Kom.
                  </p>

                  <div className="text-xs font-secondary text-center text-gray-500 mt-14">
                    © 2021—Future Nine Dots Labs
                  </div>
                  {/* Description */}
                  {/* Description */}
                </div>
              </div>
            </div>

            <Bar />
            <div className="w-full h-14"></div>
          </div>
        </div>
      </body>
    </div>
  );
}
