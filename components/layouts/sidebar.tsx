import { use } from "react"
import SidebarItems from "../includes/SidebarItems"

async function getData() {
    const res = await fetch(`http:localhost:3000/api/data/categories`)
    return res.json()
}

/*export default async function Sidebar (){
   
    //const data = use(getData())
    const data = await getData()
    return(
        <SidebarItems data={data}/>
    )
}*/

const Sidebar = () => {
   
    const data = use(getData())
    //const data = await getData()
    return(
        <SidebarItems data={data}/>
    )
}

export default Sidebar