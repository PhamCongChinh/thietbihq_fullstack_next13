'use client'
import useSWR from 'swr'
import { useParams } from 'next/navigation'
import { fetcher } from '@/helpers/constants'

const Page = () => {
    const params = useParams()
    console.log(params.slug)

    const { data, error, isLoading } = useSWR(`http://localhost:3000/api/categories/${params.slug}`, fetcher)
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    const handleUpdate = async (event: any) => {
        event.preventDefault()
        let id = event.target.id.value
        let name = event.target.name.value
        let slug = event.target.slug.value

        const data = {
            id: id,
            name: name,
            slug: slug
        }
        const res = await fetch(`http://localhost:3000/api/categories/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        console.log(res)
    }


    return(
        <div>
            <h1>Update slug {params.slug}</h1>
            {data[0].id}
            {data[0].name}
            {data[0].slug}
            <form onSubmit={handleUpdate}>
                <div>
                    <label htmlFor="">Id</label>
                    <input type="text" defaultValue={data[0].id} name='id' disabled/>
                </div>
                <div>
                    <label htmlFor="">Name</label>
                    <input type="text" defaultValue={data[0].name} name='name'/>
                </div>
                <div>
                    <label htmlFor="">Slug</label>
                    <input type="text" defaultValue={data[0].slug} name='slug'/>
                </div>
                <div>
                    <button type='submit'>Send</button>
                </div>
            </form>
        </div>
    )
}

export default Page