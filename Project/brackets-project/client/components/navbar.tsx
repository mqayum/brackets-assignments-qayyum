import Link from "next/link";
import {useRouter} from "next/router";

const NavBar = () => {
    const router = useRouter();
    const {user} = router.query;
    const isLoggedIn = (user:any) => {
        if(user)
            return (<li><Link href="#">Welcome, {user.firstName}</Link></li>)
        else
            return (
                <>
                    <li><Link href="./signup">Sign Up</Link></li>
                    <li><Link href="./login">login</Link></li>
                </>
            )
    }

  return (
      <div className="w-full h-[80px] border-2 flex justify-between items-center">
          <h1 className="text-sky-700 font-bold ml-6">DIM Logo</h1>
          <ul className="w-3/6 flex justify-around items-center">
              <li><Link href="/">Home</Link></li>
              <li><Link href="#">About</Link></li>
              {isLoggedIn(user)}
          </ul>
      </div>
  )
}
export default NavBar;