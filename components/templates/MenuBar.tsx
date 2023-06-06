'use client'

import { useState } from "react"

const MenuBar = () => {
    const [menubar, setMenubar] = useState(false)
    return(
        <>
        <div onClick={() => setMenubar(!menubar)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        </div>

        {menubar ? (
            <div className="fixed top-0 left-0 w-60 h-full z-10 bg-white md:hidden">
                <ul className="mt-12">
                    <li>ABC</li>
                    <li>ABC</li>
                    <li>ABC</li>
                    <li>ABC</li>
                    <li>ABC</li>
                    <li>ABC</li>
                    <li>ABC</li>
                    <li>ABC</li>
                    <li>ABC</li>
                    <li>ABC</li>
                </ul>
            </div>
        ):(<></>)}
        </>
    )
}

export default MenuBar