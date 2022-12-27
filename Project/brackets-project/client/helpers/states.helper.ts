import {getLoggedInUser} from "./api/auth.helpers";

import {GetServerSidePropsContext} from "next";

export const refetchUserState = async (ctx: GetServerSidePropsContext) => {
    const token = ctx.req.cookies["token"]
    if (token){
        const res = await getLoggedInUser(token);
        if (res?.status === 200){
            const user = res.data.user;
            return {
                props: {
                    user
                }
            }
        }
    }
    return {
        props: {}
    }
}

