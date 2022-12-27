import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {ReactNode} from "react";
import NotAuthorized from "../NotAuthorized";
import {useGetUserQuery} from "../../api/userApi";
import {hasCookie} from "cookies-next";

const RouteProtector = ({children, requiredRole}: { children:ReactNode, requiredRole:string|null }) => {
    const {data, isSuccess} = useGetUserQuery(undefined, {skip: !hasCookie("token")});

    if (isSuccess){
        const user = data.user
        if (requiredRole){
            if (user.roles?.includes(requiredRole))
                return <> {children} </>
            else {
                return <NotAuthorized />
            }
        }
    }
    return <> {children} </>

}
export default RouteProtector