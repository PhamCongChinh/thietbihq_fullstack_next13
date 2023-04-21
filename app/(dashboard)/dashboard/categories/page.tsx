import Link from "next/link"

const Categories = () => {
    return (
        <div className="">
            <button className="bg-blue-500 hover:bg-blue-400 py-2 px-4 rounded inline-flex items-center">
                <span className=" text-justify text-white font-bold">
                    <Link href={'/dashboard/categories/create'}>Create</Link>
                </span>
            </button>
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Name</td>
                    </tr>
                </thead>
                <tbody></tbody>
                <tfoot></tfoot>
            </table>
        </div>
    )
}

export default Categories