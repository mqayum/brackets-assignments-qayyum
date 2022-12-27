import Head from "next/head"
import HomeLayout from "../components/layouts/HomeLayout";
import {IUserObj} from "../types/types";
import {ReactElement} from "react";
import Carousel from "../components/Carousel";
import NewProductArrivals from "../components/NewProductArrivals";
import CategoriesSection from "../components/CategoriesSection";
import NewDesignsSection from "../components/NewDesignsSection";
import DesignersSection from "../components/DesignersSection";
import HighlightedServices from "../components/HighlightedServices";
import {useDispatch} from "react-redux";
import {GetServerSidePropsContext} from "next";
import {refetchUserState} from "../helpers/states.helper";


const Home = () => {

    // const dispatch = useDispatch();
    // if (user){
    //     dispatch(setLoggedInUser(user));
    // }

    return (
        <div>
            <Head>
                <title>DIM-Project</title>
            </Head>
            <Carousel />
            <HighlightedServices />
            <CategoriesSection type={"Product"} />
            <NewProductArrivals />
            <CategoriesSection type={"Design"} />
            <DesignersSection />
            <NewDesignsSection />
        </div>
    )
}
Home.getLayout = function (page:ReactElement){
    return (
        <HomeLayout>
            {page}
        </HomeLayout>
    )
}
// export const getServerSideProps = async (ctx:GetServerSidePropsContext) => {
//     return await refetchUserState(ctx)
// }
export default Home