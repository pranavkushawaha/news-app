"use client";
import CTA from "@/components/CTA";
import Card from "@/components/Card";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/Loading_Spinner";

const Page = function () {
  const { user } = useAuthContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    // console.log("1");
    if (user == null) {
      router.push("/");
    }
  }, [user]);

  useEffect(() => {
    (async function (uri) {
      // console.log("2");
      await fetchData(uri);
    })(
      "https://newsapi.org/v2/top-headlines?country=in&category=science&apiKey=da8df51c1a2f49a68113ee7f70a9ccdc"
    );
  }, []);

  const fetchData = async (uri) => {
    if (user == null) return;
    setLoading(true);
    const url = encodeURI(uri);
    const res = await fetch(url);
    const d = await res.json();
    setData(d.articles);
    setLoading(false);
  };
  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col items-center">
          <div className="bg-white w-1/2 mt-4  p-4 rounded-xl drop-shadow-xl flex justify-between items-center">
            <p className="text-3xl font-semibold text-gray-700">Science News</p>
            <a href="/home" className="bg-blue-500 rounded-md p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </a>
          </div>

          <div className="flex flex-wrap justify-center items-start gap-8 mt-4">
            {data.length != 0 &&
              data.map((data, index) => {
                return <Card key={index} data={data} />;
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
