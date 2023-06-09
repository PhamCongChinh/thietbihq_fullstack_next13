import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap{
    return [
        {
            url: 'http://localhost:3000/tin-tuc',
            lastModified: new Date()
        }
    ]
}