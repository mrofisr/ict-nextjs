import Head from "@/components/Head";
import BarPetCare from "@/components/BarPetCare";

export async function getServerSideProps (ctx) {
  const getFaq = await fetch('https://ict-nextjs.vercel.app/api/admin/faq');
  const getFaqRes = await getFaq.json();
  return {
    props: {
      data: getFaqRes.data
    }
  }
}

export default function Help({data}) {
  return (
    <div className="flex flex-col">
      <Head>
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
          integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
          crossOrigin="anonymous"
        />
      </Head>
      <div className="font-body">
        <div className="h-full bg-gray-100">
          <div className="block box-border bg-white max-w-md w-full mx-auto h-full">
            <div className="flex flex-col">
              <div className="mx-5 my-10 h-screen">
                {/* Mulai ngoding di sini */}
                {/* Title */}
                <div className="font-normal font-main text-gray-900 text-2xl">
                  Bantuan
                </div>

                <p className="text-sm font-secondary text-gray-500 mt-3">
                  Kamu butuh bantuan? Lihatlah beberapa daftar pertanyaan
                  berikut
                </p>

                <div className="pt-7"></div>
                {data.map((faq) =>              
                  <div key={faq.id_faq} className="collapse border-2 rounded-box border-blue-secondary collapse-arrow font-secondary w-full mt-4 py-0 text-gray-500">
                    <input type="checkbox" />
                    <div className="collapse-title">{faq.pertanyaan}</div>
                    <div className="collapse-content ">
                      <p className="text-sm">
                        {faq.jawaban}
                      </p>
                    </div>
                  </div>
                )}
                <div className="w-full h-64"></div>
              </div>
            </div>

            <BarPetCare currentPage="help" />
          </div>
        </div>
      </div>
    </div>
  );
}