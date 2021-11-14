import Head from "@/components/Head";
import Bar from "@/components/Bar";
import Back from "@/components/Back";
import StatusCard from "@/components/StatusCard";

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
                    Syarat dan Ketentuan
                  </h1>
                  {/* Description */}
                  <StatusCard pet="blank" user="user_penitipan" terms="about" />
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
