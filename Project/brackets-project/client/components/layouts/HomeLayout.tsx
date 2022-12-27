import Footer from "../Footer";
import {LayoutProp} from "../../types/types";
import TopNav from "../TopNav"
import Navbar from "../Navbar";



const HomeLayout = ({children} : LayoutProp) => {

  return(
      <div className="container m-auto">
          <TopNav />
          <Navbar />
            {children}
          <Footer />
      </div>
  )
}
export default HomeLayout