import Link from "next/link"

const Pagination = (data: any) => {
    console.log("pagination", data.data)
    const pagination = (count: number) => {
        let content = []
        for(let i=1;i<=count;i++){
            content.push(<li key={i} className={Number(data.data.page)== i ? "bg-blue-500 text-white" : ""}>
                <Link href={`/?page=${i}`} className="border-2 px-3 py-1 cursor-pointer">
                    <span>{i}</span>
                </Link>
            </li>)
        }
        return content
    }
    return (
        <div>
            {pagination(data.data.count)}
        </div>
        
    )
}
export default Pagination