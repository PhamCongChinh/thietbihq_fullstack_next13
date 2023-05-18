'use client'
import { useRouter } from "next/navigation"
import { useState } from "react"

const Create = () => {

    const router = useRouter()

    //const [slug, setSlug] = useState('')

    const handleCreate = async (event: any) => {
        event.preventDefault()
        const category_name = event.target.category_name.value
        const category_slug = event.target.category_slug.value
        //const category_name_regex = category_name.toLowerCase().replace(/ /g, '-')
        const data = {
            category_name: category_name,
            category_slug: category_slug
        }
        console.log(data)
        const res = await fetch('http://localhost:3000/api/categories', {
            method:'POST',
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        })
        console.log(res)
        if (res.ok) {
            router.push('/dashboard/categories')
        }
    }

    return (
        <div>
            <form onSubmit={handleCreate}>
                <label htmlFor="">Chuyen muc</label>
                <input type="text" name="category_name" required/>
                <label htmlFor="">Slug</label>
                <input type="text" name="category_slug" required/>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default Create