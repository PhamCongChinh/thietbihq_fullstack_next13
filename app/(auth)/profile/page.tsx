import api from '@/config/axiosconfig'
import { headers } from 'next/headers'
import { cookies } from 'next/headers'
async function getProfiles() {
    //const headersInstance = headers()
    //const authorization = headersInstance.get('Authorization')
    //console.log("authorization profile", authorization)

    const cookieStore = cookies()
    const authorization = cookieStore.get('token')

    console.log("Auth Profile:", authorization?.value)

    /*const res = await fetch(`http://localhost:3000/api/data/profile`, {
        headers: {
            Authorization: `Bearer ${authorization?.value}`
        }
    })*/
    const res = await api.get(`http://localhost:3000/api/data/profile`,{
        headers: {
            'Authorization': `Bearer ${authorization?.value}`
          }
    })
    //const data = await res.json()
    //console.log(data)
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