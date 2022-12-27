import Link from "next/link";

const PagePath = ({url}:{url:string}) => {

    const ignoreSteps = ["customer","vendor","admin","designer"]
    const pages = url.split("/").filter((page)=>page && !ignoreSteps.includes(page))

    const pathByIndex = (url:string, index:number) => {
        let pathArray = url.split("/",index+3).filter(page=>page)
        return pathArray.toString().replaceAll(",", "/")
    }
    return (
        <div className="text-sm breadcrumbs">
            <ul>
                {pages.map((page, index)=> {
                    return (
                        <li key={index}>
                            <Link href={`/${pathByIndex(url,index)}`}>
                                {page[0].toUpperCase()+page.slice(1)}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
export default PagePath