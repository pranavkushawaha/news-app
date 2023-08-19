"use client";
import React from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from "next/navigation";

function Page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [disable, setDisable] = React.useState(false);
  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();
    setDisable(true);

    const { result, error } = await signIn(email, password);

    if (error) {
      setError("Error: " + error.code);
      //   console.log(error.code);
      //   return console.log(error);
    } else {
      router.push("/home");
    }
    setDisable(false);
  };

  React.useEffect(() => {
    setError("");
  }, [email, password]);
  return (
    <div className="container mx-auto">
      <div className="bg-white shadow-lg rounded-lg mx-auto w-full max-w-xs">
        <h1 className="mt-20 pt-8 mb-4 text-2xl font-semibold text-gray-700 text-center">Sign In</h1>
        <form
          onSubmit={handleForm}
          className=" rounded-lg  px-8  pb-8"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-md font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-md font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
            {error != "" && (
              <p className="text-sm my-2 text-red-500">{error}</p>
            )}
          </div>
          <div className="flex items-center justify-between my-7">
            <button
              disabled={disable}
              className="disabled:bg-blue-500 bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <a
              className="mr-2 inline-block align-baseline text-sm text-blue-500 font-semibold hover:text-blue-800"
              href="/"
            >
              Create account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
