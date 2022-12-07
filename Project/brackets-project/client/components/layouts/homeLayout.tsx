import NavBar from "./navbar";
import {NextComponentType} from "next";
import Footer from "./footer";

const Layout = (component: any) => {
  return(
      <>
          <NavBar />
          {component.children}
          <Footer />

      </>
  )
}
export default Layout