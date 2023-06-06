import Link from "next/link"

const SidebarItems = (props: any) => {
    const data = props.data
    return (
        <>
            <div className="bg-white">
                <h3 className="font-bold p-2 text-black text-center">Danh mục sản phẩm</h3>
            </div>
            <ul className="font-normal">
                {data?.map((item: any, index: any) => {
                    return (
                        <li className="pl-4 pt-1 pb-1 border-t-2" key={item.id}>
                            <Link href={`/${item.slug}`}>{item.name}</Link>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default SidebarItems