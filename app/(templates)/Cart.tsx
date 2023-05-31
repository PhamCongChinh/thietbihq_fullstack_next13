'use client'
const Cart = (props: any) => {
    const cart = props.data
    console.log("cart", cart)
    if(!cart) return <div>Loi</div>
    return (
        <div>
        </div>
    )
}

export default Cart