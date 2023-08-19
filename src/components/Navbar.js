import LogOut from "@/firebase/auth/signout";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user } = useAuthContext();
  const router = useRouter();

  const handleButton = async function () {
    let result = await LogOut();
    // console.log(result);
  };
  return (
    <div className="bg-white outline-10 outline-gray-900 p-3  px-8 shadow-lg flex justify-between">
      <h1 className="text-slate-500 font-semibold text-2xl">News App</h1>
      {user!=null&&<button
        onClick={handleButton}
        className="text-sm text-white font-semibold p-2 rounded-md bg-blue-500"
      >
        Sign Out
      </button>}
    </div>
  );
}
