import {FaBars} from "react-icons/fa"
import AvatarDropdown from "../AvatarDropdown";
import {useGetUserQuery} from "../../api/userApi";
import {useRouter} from "next/router";
const DashNav = () => {
    const {data,error, isLoading,isSuccess,isError} = useGetUserQuery();
    const router = useRouter()

  return (
      <div className="navbar sticky top-0 z-50 h-16 border-b-2 bg-base-100 w-full px-5">
          <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                  <FaBars/>
              </label>
          </div>
          <div className="flex-1">
              <h1 className="font-bold normal-case ml-3 text-xl">Dashboard</h1>
          </div>
          {data && <AvatarDropdown user={data.user}/>}
      </div>

)
}
export default DashNav