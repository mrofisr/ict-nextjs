import Head from "@/components/Head";
import Bar from "@/components/Bar";

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
      <Head />
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
                  <div key={faq.id_faq} className="collapse border-2 border-blue-secondary rounded-box border-base-300 collapse-arrow font-secondary w-full mt-4 py-0 text-gray-600">
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

            <Bar currentPage="help" />
          </div>
        </div>
      </div>
    </div>
  );
}
