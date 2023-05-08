'use client'
import useSWR from 'swr'


const Update = () => {

    const handleUpdate = (event: any) => {
        event.preventDefault()

    }

    return(
        <div>
            <form onSubmit={handleUpdate}>

            </form>
        </div>
    )
}

export default Update