import { use } from "react"
import SidebarItems from "../includes/SidebarItems"

async function getData() {
    const res = await fetch(`http:localhost:3000/api/categories`)
    return res.json()
}

export default function Sidebar (){
   
    const data = use(getData())
    return(
        <SidebarItems data={data}/>
    )
}

//export default Sidebar

 /*const {data, error, isLoading} = useSWR(`/api/categories`, fetcher)
    if (error) {return <div>Error</div>}
    if (isLoading) {return <div>Loading...</div>}*/