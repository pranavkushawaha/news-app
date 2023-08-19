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
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [formDisable, setFormDisable] = useState(false);
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
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=da8df51c1a2f49a68113ee7f70a9ccdc"
    );
  }, []);

  const fetchData = async (uri) => {
    if(user==null)return;
    const url = encodeURI(uri);
    const res = await fetch(url);
    const d = await res.json();
    setData(d.articles);
    // console.log(data);
  };

  const handleSubmit = async function (e) {
    e.preventDefault();
    setFormDisable(true);
    setLoading(true);
    if (search != "") {
      var uri = `https://newsapi.org/v2/everything?q=${search}&apiKey=da8df51c1a2f49a68113ee7f70a9ccdc`;
      await fetchData(uri);
      console.log(uri);
    }
    setSearch("");
    setFormDisable(false);
    setLoading(false);
  };
  return (
    <>
    {loading ? <LoadingSpinner/> : <div className="flex flex-wrap justify-center items-start gap-8 mt-8">
      <div className="w-3/4 sm:w-1/2 md:w-1/4  mt-3 drop-shadow-xl">
        <div className="bg-white shadow-xl hover:shadow-2xl max-w-sm p-3 mb-10 mx-auto rounded-xl">
          <div>
            <form className="flex" onSubmit={handleSubmit}>
              <input
                className="bg-gray-200 border-none focus:outline-none active:outline-none rounded-lg w-full h-10 text-xs text-gray-700 p-3"
                name="query"
                type="text"
                placeholder="Search for articles"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <button
                disabled={formDisable}
                className="bg-blue-500 w-[50px] rounded disabled:bg-blue-300"
                type="submit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="white"
                  className="mx-auto w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </form>
          </div>
          <div className="flex justify-between text-xs mt-4 text-gray-500 font-semibold">
            <p>Politics</p>
            <p>Science</p>
            <p>Movies</p>
            <p>Technology</p>
          </div>
        </div>
        <CTA />
      </div>
      {data.length != 0 &&
        data.map((data, index) => {
          return <Card key={index} data={data} />;
        })}
    </div>}
    </>
  );
};

export default Page;
