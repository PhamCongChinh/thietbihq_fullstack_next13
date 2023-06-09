import { MetadataRoute } from "next";

async function abc() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
    return res.json()
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap>{
    //const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
    const data = await abc()
    console.log("sitemap", data)
    return [
        {
            url: 'http://localhost:3000/tin-tuc',
            lastModified: new Date(),
        },
        
    ]
}