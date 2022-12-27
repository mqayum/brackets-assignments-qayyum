import {useRouter} from "next/router";
import {useEffect} from "react";

const NotAuthorized = () => {
    const router = useRouter()

    useEffect(()=>{
        router.push("/");
    },[])

  return (
      <div className="hero min-h-screen bg-red-300">
          <div className="hero-content text-center">
              <div className="max-w-md">
                  <h1 className="text-5xl font-bold">Back Off</h1>
                  <p className="py-6">You Are Not Authorized To Be Here.</p>
              </div>
          </div>
      </div>
  )
}
export default NotAuthorized