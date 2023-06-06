'use client'

const Cart = () => {
    const handleClick = () => {
        alert("Client")
    }
    return (
        <div>
            <button onClick={handleClick}>Day la nut button</button>
            <div>
                client
            </div>
        </div>
    )
}
export default Cart
