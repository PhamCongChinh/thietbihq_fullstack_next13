import Link from "next/link"

const SidebarItems = ({data}: any) => {
    return (
        <>
            <div className="bg-white">
                <h3 className="font-bold py-2 text-black text-center bg-gray-400">Danh mục sản phẩm</h3>
            </div>
            <ul className="font-normal">
                {data?.map((item: any, index: any) => {
                    return (
                        <li className="y-1.5 px-3 border-b border-l border-r text-800 cursor-pointer hover:bg-gray-50" key={item.id}>
                            <Link href={`/${item.slug}`}>{item.name}</Link>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default SidebarItems