'use client'

import { useState } from "react"

const ValidateLogin = () => {
    const [error, setError] = useState({
        message: 'Unsuccess'
    })
    return(
        <div>{error.message}</div>
    )
}

export default ValidateLogin