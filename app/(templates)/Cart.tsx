const Cart = (props: any) => {
    const cart = props.data
    if(!cart) return <div>Loi</div>
    return (
        <div>
            {cart ? (<div >
                asd
            </div>
            ):(<></>)}
        </div>
    )
}
export default Cart
