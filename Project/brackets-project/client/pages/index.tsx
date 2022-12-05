import Head from "next/head"
import Link from "next/link";

const Home = () => {
    return (
        <div>
            <Head>
                <title>DIM-Project</title>
            </Head>
            <h1>this is home page</h1>
            <Link href="./login">Go to Login</Link>
        </div>
    )
}
export default Home