'use client'

import { useState } from "react"

const Test = () => {
    const [input, setInput] = useState("")

    const [p, setP] = useState("<p></p>")

    const handleP = () => {
        
    }

    const handleChange = (e: any) => {
        setInput(e.target.value)
    }
    return (
        <div>
            <div onClick={handleP}>H</div>
            <form className="flex mx-auto border-2">
                <textarea onChange={handleChange} name="" id="" cols={30} rows={10}></textarea>
            </form>
            <br />
            <div>{input}</div>
        </div>
    )
}

export default Test