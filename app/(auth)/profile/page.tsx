import { headers } from 'next/headers'

async function getProfiles() {
    const headersInstance = headers()
    const authorization = headersInstance.get('authorization')
    console.log("authorization profile", authorization)
    const res = await fetch(`http://localhost:3000/api/data/profile`, {
        headers: {
            Authorization: `Bearer ${authorization}`
        }
    })
    const data = await res.json()
    console.log(data)
    return null
}

const Profile = async () => {
    const user = await getProfiles()
    console.log("user", user)
    return(
        <div>Profile</div>
    )
}
export default Profile