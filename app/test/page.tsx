'use client'

export default function Test() {
    return(
        <div>
            <form action="http://localhost:3000/api/users" method="GET">
                <label htmlFor="">ABC</label>
                <input type="text" />
            </form>
        </div>
    )
}